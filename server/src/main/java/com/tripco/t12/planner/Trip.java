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

    // hardcoded example
    dist.add(12);
    dist.add(23);
    dist.add(34);
    dist.add(45);
    dist.add(65);
    dist.add(19);

    return dist;
  }
  public double decCoord(String s){
    String in[] = s.split("['\" °″′]+");
    double calculated = 0;
    if(in.length == 4){
      calculated = Double.parseDouble(in[0])+Double.parseDouble(in[1])/60+Double.parseDouble(in[2])/3600;
      if (in[3].equalsIgnoreCase("s")|| in[3].equalsIgnoreCase("w"))
        calculated*=-1;
      //return calculated;
    }
    else if(in.length == 3){
      calculated = Double.parseDouble(in[0])+Double.parseDouble(in[1])/60;
      if (in[2].equalsIgnoreCase("s")|| in[2].equalsIgnoreCase("w"))
        calculated*=-1;
      //return calculated;
    }
    else if(in.length == 2){
      calculated = Double.parseDouble(in[0]);
      if (in[1].equalsIgnoreCase("s")|| in[1].equalsIgnoreCase("w"))
        calculated*=-1;
      //return calculated;
    }
    else if(in.length == 1){
      calculated = Double.parseDouble(in[0]);
    }

    if(Math.abs(calculated) <= 90)
      return calculated;
    else return 0;
  }

}
//extra bracket??
