package com.tripco.t12.planner;

import java.util.ArrayList;
import java.util.Arrays;

import com.tripco.t12.planner.SqlConnect;

public class Query
{
    public int version = 2;
    public String type = "query";
    public String query;
    public ArrayList<Place> places;

    public void database()
    {
        ArrayList<Place> test = new ArrayList<Place>();
        test = SqlConnect.getQ(query);
        this.places = test;
        System.out.println(test.toString());

    }
}
