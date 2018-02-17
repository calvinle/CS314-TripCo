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
    return map;
  }

    /**
   * Returns the distances between consecutive places,
   * including the return to the starting point to make a round trip.
   * @return
   */
  private ArrayList<Integer> legDistances() {

    ArrayList<Integer> dist = new ArrayList<Integer>();
    ArrayList<Place> data = this.places;
    dist.add(1);
    return dist;
    //TODO finish so that it populates the distances field correctly in tffi
    /*Place temp0;
    Place temp1;
    for(int i = 0; i < data.size()-2; i++){
      temp0 = data.get(i);
      temp1 = data.get(i+1);
      dist.add(calcDist(decCoord(temp0.latitude),decCoord(temp0.longitude), decCoord(temp1.latitude), decCoord(temp1.longitude)));
    }
    temp0 = data.get(0);
    temp1 = data.get(data.size()-1);
    dist.add(calcDist(decCoord(temp0.latitude),decCoord(temp0.longitude), decCoord(temp1.latitude), decCoord(temp1.longitude)));*/
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
    return (int)kilo(work);
    //TODO finish with option integration
    /*if(o.distance.equalsIgnoreCase("m")){
      return (int)mile(work);
    }
    else if(o.distance.equalsIgnoreCase("k")){
      return (int)kilo(work);
    }
    else
      return 0;*/
  }

  public double mile(double d){
    return d*3958.7613;
  }

  public double kilo(double d){
    return d*6371.0088;
  }

}
