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
    public Filter filters;

    public void database()
    {
        ArrayList<Place> test = new ArrayList<Place>();
        //Filter filters = new Filter();

        test = SqlConnect.getQ(query, filters);

        // '/query/ fix- comment this line out
        System.out.println("in database: Filters: " + filters.values + filters.attribute);

        this.places = test;
        //this.filters = filters;
    }

    public static void main (String[] args)
    {
        Query query = new Query();
        query.query = "aspen";

        ArrayList<Place> test = new ArrayList<Place>();
        Filter filter = new Filter();

        filter.attribute = "trip";
        filter.values.add("heliport");

        test = SqlConnect.getQ(query.query, filter);

    }

}
