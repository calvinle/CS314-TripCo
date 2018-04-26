package com.tripco.t12.planner;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;

// Trip class, supported by the TFFI format. Allows the use of JSON methods for parsing
public class Trip {
  public String type;
  public String title;
  public Option options;
  public ArrayList<Place> places;
  public ArrayList<Integer> distances;
  public String map;

  /** The top level method that does planning.
   * At this point it just adds the map and distances for the places in order. **/
  public void plan() {
    checkOpt();
    this.map = svg();
  }

    /**
     * rePlan doesn't break things.
     */
  public void rePlan(){
    this.map = svg();
    this.distances = legDistances();
    this.options = new Option();
    this.places = new ArrayList<Place>();
  }

  /**
   * Returns an SVG containing the background and the legs of the trip.
   * @return string
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
    return (Math.abs(-109.293 - longitude) * 992) / 7.0;
  }

  public double latConv(double latitude) {
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
   * @return ArrayList
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

      double t0Lat = decCoord(temp0.latitude);
      double t0Lon = decCoord(temp0.longitude);
      double t1Lat = decCoord(temp1.latitude);
      double t1Lon = decCoord(temp1.longitude);

      dist.add(calcDist(t0Lat, t0Lon, t1Lat, t1Lon));
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

        int coordLen = newIn.length;
        double second = Double.parseDouble(newIn[0]);

        if(coordLen == 4){
            double hour = (Double.parseDouble(newIn[2])/3600);
            double minute = (Double.parseDouble(newIn[1])/60);

            calculated = second + minute + hour ;
        }
        else if(coordLen == 3){
            double minute = (Double.parseDouble(newIn[1])/60);

            calculated = second + minute;
        }
        else if(coordLen <= 2) {
            calculated = second;
        }
        if(coordLen == 1){
            return calculated;
        }

        return validL(newIn,calculated);
    }

    /**
     * checks if the lat is out of range.
     * @param dist is coordinate
     * @return boolean
     */
  public boolean outofrangelat(double dist)
  {
      return (dist>=-85 && dist<=85);
  }

  /**
   * Checks if the long is out of range.
   * @param dist is coordinate
   * @return boolean
   */
  public boolean outofrangelong(double dist)
  {
      return (dist>=-180 && dist<=180);
  }

    /**
     * valid L checks if the lat/long is within the world coords.
     * @param s is
     * @param d is
     * @return double
     */
  public double validL(String[] s, double d){
    String scheck = s[s.length-1].toLowerCase();

    if (scheck.equals("s") || scheck.equals("w")){
        d *= -1;
    }

    if((scheck.equals("n")||scheck.equals("s")) && outofrangelat(d)){
        return d;
    }

    if((scheck.equals("w")||scheck.equals("e")) && outofrangelong(d)){
        return d;
    }
    
    else {
      return 0;
    }
  }

    /**
     * distance picker, in a switch statement.
     * @param distUnits string to switch on
     * @param work number to calc
     * @return int
     */
  public int distSwitcher(String distUnits, double work)
  {
      int roundedDist;

      switch (distUnits){
          case "miles":
              roundedDist = (int) Math.round(mile(work));
              break;

          case "kilometers":
              roundedDist = (int) Math.round(kilo(work));
              break;

          case "nautical miles":
              roundedDist = (int) Math.round(mile(work)* 0.868976);
              break;

          case "user defined":
              roundedDist = (int) Math.round(user(work));
              break;

          default: roundedDist = 0;
      }
      return roundedDist;
  }

  public int calcDist(double lat1, double long1, double lat2, double long2){
    Option o = this.options;

    int roundedDist = 0;
    double piCalc = (Math.PI / 180);
    double wla1 = lat1*piCalc;
    double wlo1 = long1*piCalc;
    double wla2 = lat2*piCalc;
    double wlo2 = long2*piCalc;

    double difx = Math.cos(wla2)*Math.cos(wlo2) - Math.cos(wla1)*Math.cos(wlo1);
    double dify = Math.cos(wla2)*Math.sin(wlo2) - Math.cos(wla1)*Math.sin(wlo1);
    double difz = Math.sin(wla2) - Math.sin(wla1);

    double c = Math.sqrt(Math.pow(difx,2)+ Math.pow(dify,2)+Math.pow(difz,2));
    double work = 2*Math.asin(c/2);



    if(o != null) {
        String distUnits = o.distance.toLowerCase();

        roundedDist = distSwitcher(distUnits, work);
    }
    else {
        roundedDist = (int) Math.round(mile(work));

    }
    return roundedDist;
  }

  public double mile(double d){
    //System.out.println(d*3958.7613);
    return d*3958.7613;
  }

  public double kilo(double d){
    //System.out.println(d*6371.0088);
    return d*6371.0088;
  }

  public double user(double dist){
      return dist*Double.parseDouble(this.options.userRadius);
  }

  private void checkOpt(){
    Trip testTrip = this;
    if(this.options == null || this.options.optimization == null){
      this.distances = legDistances();
    }
    else if(Double.parseDouble(this.options.optimization) > 0){
      System.out.println("OPTIMIZED:NN");
      Optimizer nn = new Optimizer(testTrip);
      nn.nearNeighbor();
      this.distances = nn.finDist;
      this.places = nn.finArray;
    }
    else
      this.distances = legDistances();
  }

}
