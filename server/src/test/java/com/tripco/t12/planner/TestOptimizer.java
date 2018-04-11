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
    public void initialize() {
        trip = new Trip();
        trip.places = new ArrayList<>();
        Place place = new Place();
        trip.places.add(place);
        optimizer = new Optimizer(trip);
    }

    @Test
    public void testTrue() {
        assertTrue(true == true);
    }

    @Test
    public void testN() {
        Place place = new Place();
        Place place0 = new Place();
        optimizer.workingArray.add(place);
        optimizer.workingArray.add(place0);
        optimizer.nearNeighbor();
    }

    @Test
    public void testSum() {
        ArrayList<Integer> n = new ArrayList<Integer>();
        n.add(2);
        n.add(5);
        assertEquals(optimizer.distSum(n), 7, 0);
        n.add(7);
        assertEquals(optimizer.distSum(n), 14, 0);
    }

    @Test
    public void swapTest(){


        int i = 0;
        int k = 3;
        Place[] input = optimizer.TwoOptSwap(i, k);
        Place place0 = new Place();
        place0.id = "0";
        Place place1 = new Place();
        place0.id = "1";
        Place place2 = new Place();
        place0.id = "2";
        Place place3 = new Place();
        place0.id = "3";
        Place place4 = new Place();
        place0.id = "0";
        Place[] expected = {place0, place3, place2, place1, place0};
        assertArrayEquals(optimizer.TwoOptSwap(i, k), expected);
    }

}
