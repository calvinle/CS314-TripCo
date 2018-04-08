package com.tripco.t12.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.*;
@RunWith(JUnit4.class)
public class TestOptimizer {
    Trip trip;
    Optimizer optimizer;

    @Before
    public void initialize(){
        trip = new Trip();
        trip.places = new ArrayList<>();
        Place place = new Place();
        trip.places.add(place);
        optimizer = new Optimizer(trip);
    }

    @Test
    public void testTrue(){
        assertTrue(true==true);
    }

    @Test
    public void testN(){
        Place place = new Place();
        Place place0 = new Place();
        optimizer.workingArray.add(place);
        optimizer.workingArray.add(place0);
        optimizer.nearNeighbor();
    }

    @Test
    public void testSum(){
        ArrayList<Integer> n = new ArrayList<Integer>();
        n.add(2);
        n.add(5);
        assertEquals(optimizer.distSum(n), 7, 0);
    }

//    @Test
//    public void testo2S(){
//        Place a = new Place();
//        Place b = new Place();
//        Place c = new Place();
//        Place d = new Place();
//        Place e = new Place();
//        Place f = new Place();
//        Place g = new Place();
//        Place h = new Place();
//        ArrayList<Place> w = new ArrayList<Place>();
//        w.add(a);
//        w.add(b);
//        w.add(c);
//        w.add(d);
//        w.add(e);
//        w.add(f);
//        w.add(g);
//        w.add(h);
//        w.add(a);
//        optimizer.TwoOptSwap(4, 7);
//    }
}
