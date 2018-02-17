package com.tripco.t12.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t12.server.HTTP;
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

    // hardcoded example
    return "<svg width=\"1920\" height=\"960\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><!-- Created with SVG-edit - http://svg-edit.googlecode.com/ --> <g> <g id=\"svg_4\"> <svg id=\"svg_1\" height=\"960\" width=\"1920\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_2\"> <title>Layer 1</title> <rect fill=\"rgb(119, 204, 119)\" stroke=\"black\" x=\"0\" y=\"0\" width=\"1920\" height=\"960\" id=\"svg_3\"/> </g> </svg> </g> <g id=\"svg_9\"> <svg id=\"svg_5\" height=\"480\" width=\"960\" y=\"240\" x=\"480\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_6\"> <title>Layer 2</title> <polygon points=\"0,0 960,0 960,480 0,480\" stroke-width=\"12\" stroke=\"brown\" fill=\"none\" id=\"svg_8\"/> <polyline points=\"0,0 960,480 480,0 0,480 960,0 480,480 0,0\" fill=\"none\" stroke-width=\"4\" stroke=\"blue\" id=\"svg_7\"/> </g> </svg> </g> </g> </svg>";
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