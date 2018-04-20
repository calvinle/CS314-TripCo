package com.tripco.t12.planner;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.lang.*;
import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.*;

@RunWith(JUnit4.class)

public class TestDB {
    Query query;
    Filter filter;

    @Before
    public void initialize() {
        filter = new Filter();
        query = new Query();
    }

    @Test
    public void testTrue() {
        assertTrue(true == true);
    }

    @Test
    public void testQuery() {
        if(System.getenv("TRAVIS") != null) {

            Filter[] filters = new Filter[1];
            for (int i = 0; i < 1; i++)
            {
                filters[i] = new Filter();
                filters[i].attribute = "type";
            }
            //create test place
            Place p = new Place();
            p.name = "Aspen Test Heliport";
            p.latitude = "40.07080078125";
            p.longitude = "-74.93360137939453";
            p.id = "00A";

            //add filters for query
            //filters[0].attribute = ("type");
            //filter[0].values.add("heliport");

            Place res = new Place();
            ArrayList<Place> placeList = new ArrayList<Place>();

            placeList = (SqlConnect.getQ("aspen", filters, 0));

            res = placeList.get(0);

            System.out.println("size of placelist: " + placeList.size());

            System.out.println("DB query result test: " + res.name + " and " + p.name);
            System.out.println("DB query result test: " + res.longitude + " and " + p.longitude);
            System.out.println("DB query result test: " + res.latitude + " and " + p.latitude);

            assertEquals(res.name, p.name);
            assertEquals(res.id, p.id);
        }

    }

}
