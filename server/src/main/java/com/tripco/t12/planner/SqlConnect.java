package com.tripco.t12.planner;

import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;

public class SqlConnect {

    private static String getSqlQuery(String query, int limit, Filter[] filters) {

        StringBuilder stringBuilder = new StringBuilder();
        String attribute;
        String testStr;

            //find how many filter.values
            int size = filters[0].values.size() - 1;

            // Pull the attribute from the filter object
            attribute = filters[0].attribute;

            //Builds the values part of the SQL query string
            for (String s : filters[0].values) {
                stringBuilder.append("\"" + s + "\"");

                //if its not the last filter.value item, add an or
                if (filters[0].values.indexOf(s) != size) {
                    stringBuilder.append(" or airports." + attribute + " = ");
                }
            }

            // Set string builder of complete value query string part to testStr
            testStr = stringBuilder.toString();

        return String.format("SELECT * FROM airports WHERE (id LIKE '%%%1$s%%' or type like '%%%1$s%%'" 
                 + " or name like '%%%1$s%%' or municipality like '%%%1$s%%')" 
                 + " and (airports." + attribute + " = " + testStr + ")"
                 + "LIMIT %2$d;", query, limit);
    }

    private static String getSqlQueryNoFilters(String query, int limit) {

        return String.format("SELECT * FROM airports WHERE (id LIKE '%%%1$s%%' or type like '%%%1$s%%'" 
                  + " or name like '%%%1$s%%' or municipality like '%%%1$s%%')"
                  + "LIMIT %2$d;", query, limit);
    }
    
    // Arguments contain the username and password for the database
    // @returns ArrayList<Place>
    public static ArrayList <Place> getQ(String query, Filter[] filters, int limit) {

        String myUrl;
        String Regusername;
        String Regpassword;
        ArrayList<Place> placeList = new ArrayList<Place>();

        //limit set to max if limit is 0.
        if(limit == 0)
        {
            limit = 1000000;
        }

        if(!filters[0].attribute.equals("")) {
            query = getSqlQuery(query, limit, filters);
            System.out.println("filter length test:" + filters[0].attribute );
            System.out.println("query string filter: " + query);
        }
        else {
            query = getSqlQueryNoFilters(query, limit);
            System.out.println("query string no filter: " + query);
        }

        if (System.getenv("TRAVIS") != null)
        {
            //set db url, username and password to travis creds for testing
            Regusername = "travis";
            Regpassword = null;
            myUrl = "jdbc:mysql://localhost/testingDatabase";
            System.out.println("USING TRAVIS!!!!!!!!!!!!!!!!!!!");
        } else {
            //set db url, username and password to CS DB for running
            Regusername = "cs314-db";
            Regpassword = "eiK5liet1uej";
            myUrl = "jdbc:mysql://faure.cs.colostate.edu/cs314";
            System.out.println("NOT USING TRAVIS!!!!!!!!!!!!!!!!!!!");
        }

        try { // connect to the database
            Class.forName("com.mysql.jdbc.Driver").newInstance();

            Connection conn = DriverManager.getConnection(myUrl, Regusername, Regpassword);

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
        Filter[] filters = new Filter[1];

        filters[0].attribute = ("type");

        filters[0].values.add("small_airport");
        filters[0].values.add("balloonport");
        filters[0].values.add("heliport");

        //System.out.println("Filters value: " + filters[0].values);

        //filters.add("medium_airport");
        getQ("Aspen", filters, 3);
        //getQ("SELECT * FROM airports where name like 'fly%' or id like 'fly%' or municipality like 'fly%'");
    }
}
