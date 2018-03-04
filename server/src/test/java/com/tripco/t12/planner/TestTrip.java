package com.tripco.t12.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.*;

/*
  This class contains tests for the Trip class.
 */
@RunWith(JUnit4.class)
public class TestTrip {
  Trip trip;

  // Setup to be done before every test in TestPlan
  @Before
  public void initialize() {
    trip = new Trip();
  }

  @Test
  public void testTrue() {
    // assertTrue checks if a statement is true
    assertTrue(true == true);
  }

  @Test
  public void testDistances() {
    trip.plan();
    ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
    Collections.addAll(expectedDistances, 0);
    // Call the equals() method of the first object on the second object.
    assertEquals(expectedDistances, trip.distances);
    Place p = new Place();
    p.id = "01";
    p.name = "here";
    p.latitude = "40";
    p.longitude = "-107";
    trip.places.add(p);
    trip.rePlan();
    assertEquals(expectedDistances, trip.distances);
  }

  @Test
  public void testLatConv(){
    //Denver Lat
    assertEquals(trip.latConv(39.742043), 257.6938998, 0.02);
    //FoCo Lat
    assertEquals(trip.latConv(40.585258), 108.6556485, 0.02);
    //Loveland lat
    assertEquals(trip.latConv(40.398857), 141.6020253, 0.02);
  }

  @Test
  public void testLongConv(){
    //Denver Long
    assertEquals(trip.longConv(-104.991531), 609.5796069, 0.02);
    //FoCo Long
    assertEquals(trip.longConv(-105.084419), 596.4160503, 0.02);
    //Loveland long
    assertEquals(trip.longConv(-105.052643), 600.9191634, 0.02);
  }

  @Test
  public void testFormat() {
    //method returns
    assertEquals(trip.decCoord("0"),00.000,0);
    //Letter handling
    assertEquals(trip.decCoord("0° 0' 0\" N"), 00.000,0);
    assertEquals(trip.decCoord("0° 0' 0\" W"), 00.000,0);
    assertEquals(trip.decCoord("0° 0' 0\" E"), 00.000,0);
    assertEquals(trip.decCoord("0° 0' 0\" S"), 00.000,0);
    //Number inside range
    assertEquals(trip.decCoord("102° 32' 45\" W"), -102.546,0.001);
    assertEquals(trip.decCoord("40° 41' 41\" N"), 40.695,0.001);
    assertEquals(trip.decCoord("38° 01.383' N"), 38.023,0.001);
    assertEquals(trip.decCoord("106.988° W"), -106.988,0.001);
    assertEquals(-40.001, trip.decCoord("-40.001"),.001);
    //Numbers outside range
    assertEquals(trip.decCoord("100° 32' 45\" N"), 0,0.001);
  }


  @Test
  public void testFormula(){
    assertEquals(trip.calcDist(0,0,0,0),0);
    assertEquals(434,trip.calcDist(40.455, -79.982,39.559, -88.102));
    assertEquals(602, trip.calcDist(50.066, -5.715, 58.644, -3.07));
    trip.plan();
    trip.options.distance = "kilometers";
    assertEquals(140,trip.calcDist(40,-107,41,-106));
    trip.options.distance = "heckifiknow";
    assertEquals(0,trip.calcDist(40,-107,41,-106));
  }

  @Test
  public void testMile(){
    assertEquals(trip.mile(0),0,0);
    assertEquals(trip.mile(1),3958.7613,.001);
  }

  @Test
  public void testKilo(){
    assertEquals(trip.kilo(0),0,0);
    assertEquals(trip.kilo(1),6371.0088,.001);
  }
}
