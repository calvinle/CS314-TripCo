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
    Collections.addAll(expectedDistances, 1);
    System.out.println(trip.latConv(38.846127));
    System.out.println(trip.longConv(-104.800644));
    // Call the equals() method of the first object on the second object.
    assertEquals(expectedDistances, trip.distances);
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
    assertEquals(trip.decCoord("-40.001"), -40.001,.001);
    //Numbers outside range
    assertEquals(trip.decCoord("100° 32' 45\" N"), 0,0.001);
  }


  @Test
  public void testFormula(){
    assertEquals(trip.calcDist(0,0,0,0),0);
    assertEquals(698,trip.calcDist(40.455, -79.982,39.559, -88.102));
    assertEquals(968, trip.calcDist(50.066, -5.715, 58.644, -3.07));
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
