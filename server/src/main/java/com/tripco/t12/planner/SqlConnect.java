package com.tripco.t12.planner;

import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;

public class SqlConnect {
  // db configuration information
  private String myDriver = "com.mysql.jdbc.Driver";
  private String myUrl = "";
  private String search = "";
  // SQL queries to count the number of records and to retrieve the data
  private String count = "";
  private String username = "";
  private String password = "";

  SqlConnect(String incomingSearch) {
    if (System.getenv("TRAVIS") != null) {
      //set db url to travis for testing
      username = "TRAVIS";
      myUrl = "localhost";
    } else {
      myUrl = "jbdc:mysql://faure.cs.colostate.edu/cs314";
      username = "cs314-db";
      password = "eiK5liet1uej";
    }

    setSearch(incomingSearch);

    try {
      Class.forName(this.myDriver);
      // connect to the database and query
      try (Connection conn = DriverManager.getConnection(this.myUrl, this.username, this.password);
           Statement stCount = conn.createStatement();
           Statement stQuery = conn.createStatement();
           ResultSet rsCount = stCount.executeQuery(this.count);
           ResultSet rsQuery = stQuery.executeQuery(this.search)
      ) {
        printJSON(rsCount, rsQuery);
      }
    } catch (Exception e) {
      System.err.println("Exception: " + e.getMessage());
    }
  }

  public void setSearch(String input) {
    this.search = input;
  }

  private void printJSON(ResultSet count, ResultSet query) throws SQLException {
    System.out.printf("\n{\n");
    System.out.printf("\"type\": \"find\",\n");
    System.out.printf("\"title\": \"%s\",\n", this.search);
    System.out.printf("\"places\": [\n");

    count.next();
    int results = count.getInt(1);

    while (query.next()) {
      System.out.printf(" \"%s\"", query.getString("code"));
      if (--results == 0)
        System.out.printf("\n");
      else
        System.out.printf(",\n");
    }
    System.out.printf(" ]\n}\n");
  }


  // Arguments contain the username and password for the database
  public static ArrayList <Place> getQ(String q) {

    //SqlConnect sqlConn = new SqlConnect("select * from airports");
    String query = q;
    System.out.println("query string: " + query);


    //String modQuery = "SELECT * FROM airports WHERE (id LIKE \"" + query + "\" or type like \"" + query +
    //        "\" or name like \"" + query + "\" or municipality like \"" + query + "\")";

    //String modQuery = "SELECT * FROM airports WHERE (id LIKE \"" + query + "%\" or type like \"" + query +
    //        "%\" or name like \"" + query + "%\" or municipality like \"" + query + "%\")";
    
    String modQuery = "SELECT * FROM airports WHERE (id LIKE \"%" + query + "%\" or type like \"%" + query +
            "%\" or name like \"%" + query + "%\" or municipality like \"%" + query + "%\") and iso_region like \"US-CO\"";
    
    //String modQuery = "select * from airports where id like \"" + query + "\" or type like \"" + query + "\" or name like \"" + query + "\" or latitude like \"" + query +"\" or longitude like \"" + query + "\" or elevation like \"" + query + "\" or continent like \"" + query + "\" or iso_country like \"" + query + "\" or iso_region like \"" + query + "\" or municipality like \""  + query + "\" or scheduled_service like \""  + query + "\" or gps_code like \""  + query + "\" or iata_code like \""  + query + "\" or local_code like \""  + query + "\" or home_link like \""  + query + "\" or wikipedia_link like \""  + query + "\" or keywords like \""  + query +  "\"";
    System.out.println("query string: " + modQuery);

    query = modQuery;

    ArrayList<String> rQ= new ArrayList<String>();
    ArrayList<Place> placeList = new ArrayList<Place>();
    String myDriver = "com.mysql.jdbc.Driver"; // add dependencies in pom.xml
    String myUrl = "jdbc:mysql://faure.cs.colostate.edu/cs314";
    try { // connect to the database
      Class.forName(myDriver);
      Connection conn = DriverManager.getConnection(myUrl, "cs314-db", "eiK5liet1uej");
      try { // create a statement
        Statement st = conn.createStatement();
        try { // submit a query
          ResultSet rs = st.executeQuery(query);
          try { // iterate through the query results and print selected columns
            while (rs.next()) {
              String id = rs.getString("id");
              String name = rs.getString("name");
              System.out.printf("%s,%s\n", id, name);
              Place place = new Place();
              place.id = rs.getString("id");;
              place.name = rs.getString("name");
              place.latitude = rs.getString("latitude");
              place.longitude = rs.getString("longitude");

              placeList.add(place);

            }
          } finally {
            rs.close();
          }
        } finally {
          st.close();
        }
      } finally {
        conn.close();
      }
    } catch (Exception e) { // catches all exceptions in the nested try's
      System.err.printf("Exception: " + e.getMessage());

    }
    return placeList;
  }

    public static void main(String[] args)
    {
        getQ("SELECT * FROM airports");
        //getQ("SELECT * FROM airports where name like 'fly%' or id like 'fly%' or municipality like 'fly%'");
    }
}
