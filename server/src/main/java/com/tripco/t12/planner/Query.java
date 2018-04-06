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
    public Filter filters;

    public void database()
    {
        ArrayList<Place> test = new ArrayList<Place>();

        //ArrayList<Filter> filter = new ArrayList<Filter>();
        Filter filters = new Filter();
        test = SqlConnect.getQ(query, filters);

//        this.places = test;
//        this.filters = filter;

        //System.out.println(test.toString());
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
