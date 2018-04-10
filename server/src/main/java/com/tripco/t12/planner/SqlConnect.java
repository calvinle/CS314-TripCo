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

    // Arguments contain the username and password for the database
    public static ArrayList <Place> getQ(String q, Filter filters) {

        String query = q;

        StringBuilder stringBuilder = new StringBuilder();

        // Pull all Values in filter object
        if(!filters.values.isEmpty()) {

            //find how many filter.values
            int size = filters.values.size() - 1;

            // Pull the attribute from the filter object
            String attribute = filters.attribute;

            //Builds the values part of the SQL query string
            for (String s : filters.values) {
                stringBuilder.append("\"" + s + "\"");

                //if its not the last filter.value item, add an or
                if (filters.values.indexOf(s) != size) {
                    stringBuilder.append(" or airports." + attribute + " = ");
                }
            }

            // Set string builder of complete value query string part to testStr
            String testStr = stringBuilder.toString();

            //debug
            System.out.println("Attribute: " + attribute);
            System.out.println("query string: " + query);
            System.out.println("filter list: " + testStr);

            //Build complete query string
            String modQuery = "SELECT * FROM airports WHERE (id LIKE \"%" + query + "%\" or type like \"%" + query +
                    "%\" or name like \"%" + query + "%\" or municipality like \"%" + query + "%\") and (airports." + attribute + " = " + testStr + ");";

            System.out.println("query string w/ filter: " + modQuery);

            //set built SQL string to final query string to be used
            query = modQuery;
        }
        else {

            String modQuery = "SELECT * FROM airports WHERE (id LIKE \"%" + query + "%\" or type like \"%" + query +
                    "%\" or name like \"%" + query + "%\" or municipality like \"%" + query + "%\");";

            System.out.println("query string no filter: " + modQuery);

            query = modQuery;
        }

        ArrayList<String> rQ= new ArrayList<String>();
        ArrayList<Place> placeList = new ArrayList<Place>();
        String Regusername;
        String Regpassword;
        String myDriver = "com.mysql.jdbc.Driver"; // add dependencies in pom.xml
        String myUrl = "jdbc:mysql://faure.cs.colostate.edu/cs314";
        //String myUrl1 = "jdbc:mysql://localhost/testingDatabase";


        if (System.getenv("TRAVIS") != null)
        {
            //set db url to travis for testing
            Regusername = "travis";
            Regpassword = null;
            myUrl = "jdbc:mysql://localhost/testingDatabase";
            System.out.println("USING TRAVIS!!!!!!!!!!!!!!!!!!!");
        } else {
            Regusername = "cs314-db";
            Regpassword = "eiK5liet1uej";
            myUrl = "jdbc:mysql://faure.cs.colostate.edu/cs314";
            System.out.println("NOT USING TRAVIS!!!!!!!!!!!!!!!!!!!");
        }

        try { // connect to the database
            Class.forName("com.mysql.jdbc.Driver").newInstance();

            Connection conn = DriverManager.getConnection(myUrl, Regusername, Regpassword);

            //Connection conn = DriverManager.getConnection(myUrl1, travisUser, travisPass);
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
        Filter filters = new Filter();

        filters.attribute = ("type");

        filters.values.add("small_airport");
        filters.values.add("balloonport");
        filters.values.add("heliport");

        System.out.println("Filters value: " + filters.values);

        //filters.add("medium_airport");
        getQ("Aspen", filters);
        //getQ("SELECT * FROM airports where name like 'fly%' or id like 'fly%' or municipality like 'fly%'");
    }
}
