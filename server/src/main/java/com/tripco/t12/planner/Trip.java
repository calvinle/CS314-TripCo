package com.tripco.t12.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t12.server.HTTP;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import spark.Request;
import java.util.ArrayList;
import java.util.Arrays;

/**
 *
 * The Trip class supports TFFI so it can easily be converted to/from Json by Gson.
 *
 */
public class Trip {
  // The variables in this class should reflect TFFI.
  public String type;
  public String title;
  public Option options;
  public ArrayList<Place> places;
  public ArrayList<Integer> distances;
  public String map;

  /** The top level method that does planning.
   * At this point it just adds the map and distances for the places in order.
   * It might need to reorder the places in the future.
   */
  public void plan() {
    this.map = svg();
    //System.out.println(this.options);
    //this.options.optimization = "0";
    checkOpt();
    //this.options = new Option();
    //this.places = new ArrayList<Place>();
  }

  /**
   * Plan method for testing without breaking things.
   */
  public void rePlan(){
    this.map = svg();
    this.distances = legDistances();
    this.options = new Option();
    this.places = new ArrayList<Place>();
  }

  /**
   * Returns an SVG containing the background and the legs of the trip.
   * @return
   */
  private String svg() {
    String map = "";
    String line;
    InputStream is = getClass().getResourceAsStream("/colorado.svg");
    BufferedReader br = new BufferedReader(new InputStreamReader(is));
    try {
      while( (line = br.readLine() ) != null) {
        map += line;
      }
    } catch (IOException e) {
      e.printStackTrace();
    }

    map = map.substring(0, map.length()-6);

    if (this.places == null){
      System.out.println("Null");
      return map;
    }
    map += path();
    return map;
  }

  public double longConv(double longitude){
    //svgWidthPix = 992;                            //Width of SVG in Pixels
    //maxLong = 7.0;                                //CO is 7 Longitudes wide
    //longOrigin = -109.293;                        //Origin (Top Left) coordinate.
    //double netLong = Math.abs(-109.293 - longitude);//Real Life Longitude distance from origin
    return (Math.abs(-109.293 - longitude) * 992) / 7.0;
  }

  public double latConv(double latitude) {
    //svgHeightPix = 707.0;                  //Height of SVG in Pixels
    //maxLat = 4.0;                            //CO is 4 Latitudes tall
    //latOrigin = 41.2;                      //Origin (Top Left) coordinate
    //double netLat = Math.abs(41.2 - latitude);     //Real Life Lat. distance from origin
    return (Math.abs(41.2 - latitude) * 707.0) / 4.0;
  }

  private String path(){
    String path = "<svg height=\"707\" width=\"992\"> <path d=\"";
    String end = "Z\" stroke=\"blue\" stroke-width=\"2\" fill=\"none\" /> </svg></svg>";

    //For loop to go thru each set of long/lat
    ArrayList<Place> data = this.places;
    for (int i=0; i < data.size(); i++){
      if (i == 0) { path+="M"; } //If first point, then add M
      else { path+="L"; }        //else, add L

      double newLat = decCoord(data.get(i).latitude);  //Convert lat
      double newLong = decCoord(data.get(i).longitude);//Convert long

      path += Double.toString(longConv(newLong)) + " ";//Add long to string with space
      path += Double.toString(latConv(newLat)) + " ";  //Add lat to string with space
    }

    path += end;
    return path;
  }

    /**
   * Returns the distances between consecutive places,
   * including the return to the starting point to make a round trip.
   * @return
   */
  private ArrayList<Integer> legDistances() {

    ArrayList<Integer> dist = new ArrayList<Integer>();
    ArrayList<Place> data = this.places;

    Place temp0;
    Place temp1;
    if(data == null) {
      System.out.println("NULL");
      dist.add(0);
      return dist;
    }
    dist.add(0);
    for(int i = 0; i <= data.size()-2; i++){
      temp0 = data.get(i);
      temp1 = data.get(i+1);
      dist.add(calcDist(decCoord(temp0.latitude),decCoord(temp0.longitude), decCoord(temp1.latitude), decCoord(temp1.longitude)));
    }
    System.out.println("places is not null");
    return dist;

  }

  public double decCoord(String s)
  {
    double calculated = 0;
    ArrayList<String> list = new ArrayList<String>();
    String in[] = s.split("['\" °″′]+");

    for(String key:in)
    {
      if(!(key.matches("[0-9.-]+")))
      {
        //Pulled regex from google (find link please)
        String temp[] = key.split("(?<=\\D)(?=\\d)|(?<=\\d)(?=\\D)");
        list.addAll(Arrays.asList(temp));
      }

      else
        list.add(key);
    }

    String newIn[] = new String[list.size()];

    for(int i = 0; i < list.size(); i++)
    {
      newIn[i] = list.get(i);
    }

    if(newIn.length == 4){
      calculated = Double.parseDouble(newIn[0])+Double.parseDouble(newIn[1])/60+Double.parseDouble(newIn[2])/3600;
    }
    else if(newIn.length == 3){
      calculated = Double.parseDouble(newIn[0])+Double.parseDouble(newIn[1])/60;
    }
    else if(newIn.length <= 2) {
      calculated = Double.parseDouble(newIn[0]);
    }
    if(newIn.length == 1){
      return calculated;
    }

    return validL(newIn,calculated);
  }
  
  private boolean outofrangen(double dist)
  {
      if(dist>=37 && dist<=41)
      {
          return true;
      }
      return false;
  }
  
  private boolean outofrangew(double dist)
  {
      if(dist>=-109 && dist<=-102)
      {
          return true; 
      }
      return false;
  }
  
  private double validL(String[] s, double d){
    String scheck = s[s.length-1].toLowerCase();

    if (scheck.equals("s")){
        d *= -1;
    }

    if (scheck.equals("w")){
        d *= -1;
    }

    if(scheck.equals("n") && outofrangen(d)){
        return d;
    }

    if(scheck.equals("w") && outofrangew(d)){
        return d;
    }
    
    else {
      return 0;
    }
  }

  public int calcDist(double lat1, double long1, double lat2, double long2){
    Option o = this.options;

    double wla1 = lat1*(Math.PI / 180);
    double wlo1 = long1*(Math.PI / 180);
    double wla2 = lat2*(Math.PI / 180);
    double wlo2 = long2*(Math.PI / 180);

    double difx = Math.cos(wla2)*Math.cos(wlo2) - Math.cos(wla1)*Math.cos(wlo1);
    double dify = Math.cos(wla2)*Math.sin(wlo2) - Math.cos(wla1)*Math.sin(wlo1);
    double difz = Math.sin(wla2) - Math.sin(wla1);

    double c = Math.sqrt(Math.pow(difx,2)+ Math.pow(dify,2)+Math.pow(difz,2));
    double work = 2*Math.asin(c/2);

    if(o==null || o.distance.equalsIgnoreCase("miles")){
      System.out.println("M or N");
      return (int)Math.round(mile(work));
    }
    else if(o.distance.equalsIgnoreCase("kilometers")){
      System.out.println("kilo");
      return (int)Math.round(kilo(work));
    }
    else
      System.out.println("invalid Unit");
      return 0;
  }

  public double mile(double d){
    //System.out.println(d*3958.7613);
    return d*3958.7613;
  }

  public double kilo(double d){
    //System.out.println(d*6371.0088);
    return d*6371.0088;
  }

  private void checkOpt(){

    if(this.options == null || this.options.optimization == null){
      this.distances = legDistances();
    }
    else if(Integer.parseInt(this.options.optimization) > 0){
      Optimizer opt = new Optimizer();
      opt.trip = this;
      opt.nearNeighbor();
      this.distances = opt.trip.distances;
      this.places = opt.trip.places;
    }
    else
      this.distances = legDistances();
  }

}
