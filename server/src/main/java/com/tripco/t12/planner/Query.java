package com.tripco.t12.planner;

import java.util.ArrayList;

public class Query
{
    public int version = 2;
    public String type = "query";
    public String query;
    public ArrayList<Place> places;

    public void database()
    {
        this.places = new ArrayList<Place>();
    }
}
