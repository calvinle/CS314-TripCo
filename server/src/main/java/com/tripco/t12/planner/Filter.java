package com.tripco.t12.planner;

import java.util.ArrayList;

/**
 * Describes the filter object to be used in the query tffi.
 * Allows users to be able to define filters for their query search.
 */
public class Filter {
  public String attribute;
  public ArrayList<String> values;

  public Filter() {
    ArrayList<String> value = new ArrayList<String>();
    String attributes = "";
    this.values = value;
    this.attribute = attributes;
  }

}
