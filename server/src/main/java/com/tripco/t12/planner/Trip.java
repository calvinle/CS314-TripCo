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
    for(int i = 0; i <= data.size()-2; i++){
      temp0 = data.get(i);
      temp1 = data.get(i+1);
      dist.add(calcDist(decCoord(temp0.latitude),decCoord(temp0.longitude), decCoord(temp1.latitude), decCoord(temp1.longitude)));
    }
    temp0 = data.get(0);
    temp1 = data.get(data.size()-1);
    dist.add(calcDist(decCoord(temp0.latitude),decCoord(temp0.longitude), decCoord(temp1.latitude), decCoord(temp1.longitude)));
    return dist;
  }
  public double decCoord(String s){
    String in[] = s.split("['\" °″′]+");
    double calculated = 0;
    if(in.length == 4){
      calculated = Double.parseDouble(in[0])+Double.parseDouble(in[1])/60+Double.parseDouble(in[2])/3600;
      if (in[3].equalsIgnoreCase("s")|| in[3].equalsIgnoreCase("w"))
        calculated*=-1;
    }
    else if(in.length == 3){
      calculated = Double.parseDouble(in[0])+Double.parseDouble(in[1])/60;
      if (in[2].equalsIgnoreCase("s")|| in[2].equalsIgnoreCase("w"))
        calculated*=-1;
    }
    else if(in.length == 2){
      calculated = Double.parseDouble(in[0]);
      if (in[1].equalsIgnoreCase("s")|| in[1].equalsIgnoreCase("w"))
        calculated*=-1;
    }
    else if(in.length == 1){
      calculated = Double.parseDouble(in[0]);
      return calculated;
    }

    if(in[in.length-1].equalsIgnoreCase("n")&&(calculated >= 37 && calculated <= 41 ))
      return calculated;
    else if(in[in.length-1].equalsIgnoreCase("w")&&(calculated <=-102 && calculated >= -109 ))
      return calculated;
    else return 0;
  }

  public int calcDist(double lat1, double long1, double lat2, double long2){
    double work;
    Option o = this.options;

    double wla1 = lat1*(Math.PI / 180);
    double wlo1 = long1*(Math.PI / 180);
    double wla2 = lat2*(Math.PI / 180);
    double wlo2 = long2*(Math.PI / 180);

    double dify = Math.abs(wlo1-wlo2);

    double top1 = Math.pow(Math.cos(wla2) * Math.sin(dify), 2);
    double top2 = Math.pow( (Math.cos(wla1)*Math.sin(wla2) - Math.sin(wla1)*Math.cos(wla2)*Math.cos(dify)), 2);
    double finalTop = Math.sqrt(top1 + top2);

    double bottom1 = Math.sin(wla1)*Math.sin(wla2);
    double bottom2 = Math.cos(wla1)*Math.cos(wla2)*Math.cos(dify);
    double finalBottom = bottom1 + bottom2;

    work = Math.atan2(finalTop, finalBottom);
    //System.out.println(work);
    //TODO finish with option integration
    if(work == 0)
      return (int)work;
    else if(o==null){
      return (int)mile(work);
    }
    else if(o.distance.equalsIgnoreCase("miles")){
      return (int)mile(work);
    }
    else if(o.distance.equalsIgnoreCase("kilometers")){
      return (int)kilo(work);
    }
    else
      return 0;
  }

  public double mile(double d){
    System.out.println(d*3958.7613);
    return d*3958.7613;
  }

  public double kilo(double d){
    System.out.println(d*6371.0088);
    return d*6371.0088;
  }

}
