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

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
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
    this.distances = legDistances();
    this.options = new Option();
    this.places = new ArrayList<Place>();
  }

  public void rePlan(){
    this.distances = legDistances();
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
    int insert = map.indexOf("</svg>");
    map = map.substring(0, map.length()-6);

    ArrayList<Place> yeah = this.places;
    if (yeah == null){
      System.out.println("Null");
      return map;
    }
    map += path();
    return map;
  }

  public double longConv(double longitude){
    double svgWidthPix = 992;                       //Width of SVG in Pixels
    double maxLong = 7.0;                                  //CO is 7 Longitudes wide
    double longOrigin = -109.293;                     //Origin (Top Left) coordinate.
    double netLong = Math.abs(longOrigin - longitude);//Real Life Longitude distance from origin
    double finalLong = (netLong * svgWidthPix) / maxLong; //convert to pixels
    return finalLong;
  }

  public double latConv(double latitude){
    double svgHeightPix = 707.0;                            //Height of SVG in Pixels
    double maxLat = 4;                                         //CO is 4 Latitudes tall
    double latOrigin = 41.2;                                //Origin (Top Left) coordinate
    double netLong = Math.abs(latOrigin - latitude);        //Real Life Lat. distance from origin
    double finalLat = ((netLong * svgHeightPix) / maxLat);//convert to pixels
    return finalLat;
  }

  private String path(){
    String path = "<svg height=\"707\" width=\"992\"> <path d=\"";
    String end = "Z\" stroke=\"blue\" stroke-width=\"2\" fill=\"none\" /> </svg></svg>";

    //For loop to go thru each set of long/lat
    ArrayList<Place> data = this.places;
    System.out.println(data.isEmpty());
    for (int i=0; i < data.size(); i++){
      if (i == 0) { path+="M"; } //If first point, then add M
      else { path+="L"; };       //else, add L

      double newLat = decCoord(data.get(i).latitude);//Convert lat
      double newLong = decCoord(data.get(i).longitude);//Convert long
      double latPx = latConv(newLat);
      double longPx = longConv(newLong);

      path += Double.toString(longPx) + " ";//Add long to string with space
      path += Double.toString(latPx) + " ";//Add lat to string with space
    }
    path += end; //indicate with Z to roundtrip, define visual props
    System.out.println(path);
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

  public double decCoord(String s){
    String in[] = s.split("['\" °″′]+");
    double calculated = 0;
    if(in.length == 4){
      calculated = Double.parseDouble(in[0])+Double.parseDouble(in[1])/60+Double.parseDouble(in[2])/3600;
    }
    else if(in.length == 3){
      calculated = Double.parseDouble(in[0])+Double.parseDouble(in[1])/60;
    }
    else if(in.length <= 2){
      calculated = Double.parseDouble(in[0]);
      if(in.length==1) return calculated;
    }

    return validL(in,calculated);
  }

  private boolean outOfRangeN (double d)
  {
      if(d>=37 && d<=41)
      {
          return true;
      }
      return false;
  }
  private boolean outOfRangeW (double d)
  {
      if(d>=-109 && d<=-102)
      {
          return true; 
      }
      return false;
    }
  private double validL(String[] s, double d){
    String scheck = s[s.length-1].toLowerCase();

    if (scheck.equals("s")) {
        d *= -1;
    }

    if (scheck.equals("w")) {
        d *= -1;
    }

    if(scheck.equals("n") && outOfRangeN(d)) {
        return d;
    }

    else if(scheck.equals("w") && outOfRangeW(d)) {
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

}
