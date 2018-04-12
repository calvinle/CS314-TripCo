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
        optimizer.tempArray.add(place0);
        optimizer.tempArray.add(place1);
        optimizer.tempArray.add(place2);
        optimizer.tempArray.add(place3);
        optimizer.tempArray.add(place4);
        Place[] expected = {place3, place2, place1, place0, place4};
        assertArrayEquals(optimizer.TwoOptSwap(i, k), expected);
    }

    @Test
    public void distCalcTest(){
        Place p0 =  new Place();
        p0.latitude = "38.452431";
        p0.longitude = "-107.006570";
        Place p1 = new Place();
        p1.latitude = "38.452431";
        p1.longitude = "-107.380106";

        Place[] trip = {p0, p1};
        ArrayList<Integer> expected = new ArrayList<Integer>();
        expected.add(20);
        assertEquals(optimizer.sumList(trip), expected);
    }

}
