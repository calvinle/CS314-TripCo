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
    Collections.addAll(expectedDistances, 12, 23, 34, 45, 65, 19);
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
    assertEquals(trip.decCoord("12° 32' 45\" N"), 12.546,0.001);
    assertEquals(trip.decCoord("41° 41' 41\" E"), 41.695,0.001);
    assertEquals(trip.decCoord("32° 01.383' S"), -32.023,0.001);
    assertEquals(trip.decCoord("58.988° W"), -58.988,0.001);
    assertEquals(trip.decCoord("-40.001"), -40.001,.001);
    //Numbers outside range
    assertEquals(trip.decCoord("100° 32' 45\" N"), 0,0.001);
  }
}
