package com.tripco.t12.planner;

import java.util.ArrayList;
import java.util.Arrays;
import com.tripco.t12.planner.SqlConnect;

public class Query
{
    public int version = 3;
    public String type = "query";
    public String query;
    public ArrayList<Place> places;
    public Filter[] filters;
    public int limit;

    public void database()
    {
        ArrayList<Place> test = new ArrayList<Place>();
        //Filter filters = new Filter();

        test = SqlConnect.getQ(query, filters, limit);

        // '/query/ fix- comment this line out
        System.out.println("in database: Filters: " + filters[0].values + filters[0].attribute);

        this.places = test;
        //this.filters = filters;
    }

    public static void main (String[] args)
    {
        Query query = new Query();
        query.query = "aspen";

        ArrayList<Place> test = new ArrayList<Place>();
        Filter[] filter = new Filter[1];

        filter[0].attribute = "trip";
        filter[0].values.add("heliport");

        test = SqlConnect.getQ(query.query, filter, 3);

    }

}