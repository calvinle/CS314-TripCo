package com.tripco.t12.planner;

import java.util.ArrayList;

public class TwoOpt {
  private ArrayList<Place> oldRoute;
  private ArrayList<Integer> oldDist;

  private ArrayList<Place> newRoute;
  private ArrayList<Integer> newDist;
  private int tripDist = (int)Double.POSITIVE_INFINITY;

  public void TwoOpt(Optimizer o){
    oldDist = o.finDist;
    oldRoute = o.finArray;
  }

  public void opt2(){
    for (int i=1; i < oldRoute.size(); i++){
      for (int k=i+1; k < oldRoute.size(); k++){
        ArrayList<Place> workingRoute = opt2Swap(oldRoute, i, k);
        //distance of workingRoute
        //if workingRoute dist < minDist
        //finalRoute = workingRoute
      }
    }
  }

  public ArrayList<Place> opt2Swap(ArrayList<Place> existingRoute, int start, int end){
    ArrayList<Place> testingRoute = new ArrayList<Place>();

    //@TODO: Check inclusive vs exclusive statements
    for (int i=0; i < start-1; i++){
      testingRoute.add(existingRoute.get(i));
    }

    for (int k=end; end > start; k--){
      testingRoute.add(existingRoute.get(k));
    }

    for (int k=end+1; end < existingRoute.size(); k++){
      testingRoute.add(existingRoute.get(k));
    }

    return testingRoute;
  }

}
