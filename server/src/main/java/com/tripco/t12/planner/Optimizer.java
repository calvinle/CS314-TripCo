package com.tripco.t12.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t12.server.HTTP;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import spark.Request;

import java.sql.Array;
import java.util.ArrayList;
import java.util.Arrays;

public class Optimizer {
    private Trip trip;
    private int[][] nnTable;
    private boolean[] visited;
    private int tripDist = (int)Double.POSITIVE_INFINITY;
    public ArrayList<Place> workingArray;

    //Test if contain shortest distance. Will become finArray/finDist if they do
    private ArrayList<Place> tempArray;
    private ArrayList<Integer> tempDist;

    public ArrayList<Place> finArray;
    public ArrayList<Integer> finDist;

    public ArrayList<Place> twoOptTempArray;
    public ArrayList<Integer> twoOptTempDist;
    private int improve = 0;


    public Optimizer(Trip t){
        tempArray = new ArrayList<Place>();
        tempDist = new ArrayList<Integer>();
        finArray = new ArrayList<Place>();
        finDist = new ArrayList<Integer>();
        trip = t;
        workingArray = t.places;
        visited = new boolean[workingArray.size()-1];

        nnTable = new int[workingArray.size()-1][workingArray.size()-1];

        //Populate Table of distances
        for (int i=0; i < workingArray.size()-1; i++){
            for (int j=0; j < workingArray.size()-1; j++){
                int dist = NNhelper(workingArray.get(i), workingArray.get(j));
                nnTable[i][j] = dist;
            }
        }
    }

    private boolean allTrue(boolean[] array){
        for(boolean b: array) if(!b) return false;
        return true;
    }

    private int firstFalse(boolean[] array){
        for(int i = 0; i < array.length; i++) if(!array[i]){
            array[i] = true;
            return i;
        }
        return -1;
    }

    private ArrayList<Integer> sumList(ArrayList<Place> workingRoute){
        ArrayList<Integer> opt2dists = new ArrayList<Integer>();
        for (int i=0; i < workingRoute.size()-1; i++){
            opt2dists.add(NNhelper(workingRoute.get(i), workingRoute.get(i+1)));
        }
        return opt2dists;
    }

    private int distSum(ArrayList<Integer> distances){
        int sum = 0;
        for (int i=0; i < distances.size(); i++){
            sum+=distances.get(i);
        }
        return sum;
    }

    private int NNhelper(Place place0, Place place1){
        if(place0.latitude == null || place1.latitude == null){
            return 0;
        }
        double p0lat = trip.decCoord(place0.latitude);
        double p0long = trip.decCoord(place0.longitude);
        double p1lat = trip.decCoord(place1.latitude);
        double p1long = trip.decCoord(place1.longitude);
        return trip.calcDist(p0lat,p0long,p1lat,p1long);
    }

    private void oneTripNN(int i, int counter, boolean[] visCities){
        if(counter == visCities.length-1){
            tempArray.add(tempArray.get(0));
            tempDist.add(NNhelper(tempArray.get(tempArray.size()-1), tempArray.get(tempArray.size()-2)));
            //System.out.println("DISTS" +Arrays.toString(tempDist.toArray()));
            return;
        }
        int current = i;
        int working = 0;
        visCities[current] = true;
        int minDist = (int)Double.POSITIVE_INFINITY;
        for(int j = 0; j < nnTable[0].length; j++){
            if (nnTable[current][j] < minDist && nnTable[current][j] !=0)
                if(!visCities[j]){
                    minDist = nnTable[current][j];
                    working = j;
                }
        }
        tempDist.add(minDist);
        tempArray.add(workingArray.get(working));
        visCities[working] = true;
        current = working;
        counter++;
        oneTripNN(current, counter, visCities);
    }

    public void nearNeighbor(){
        if(allTrue(visited)) {
            System.out.println("done " + tripDist);
            //System.out.println("DISTS" +Arrays.toString(finDist.toArray()));
            finDist.add(0,0);
            return;
        }
        tempDist.clear();
        tempArray.clear();
        int starting = firstFalse(visited);
        tempArray.add(workingArray.get(starting));
        boolean[] visCities = new boolean[visited.length];
        oneTripNN(starting, 0,visCities);
        //Feed into 2Opt here. Use temp variables first
        if (Double.parseDouble(trip.options.optimization) > 0.5){ //@TODO: Change number to whatever
            System.out.println("TWO OPT");
            twoOptTempArray = new ArrayList<Place>(finArray.size());
            twoOptTempDist =  new ArrayList<Integer>();
            TwoOpt();
        }

        else{
            int temp = distSum(tempDist);
            System.out.println("trip " + temp + " " + starting);
            if (temp < tripDist){
                tripDist = temp;
                finArray = tempArray;
                finDist = tempDist;
            }

        }
        nearNeighbor();
    }

    private void TwoOpt(){
        //tempArray, temptDist, can get distSum
        int size = tempArray.size();
        for (int i=0; i < size; i++){
            twoOptTempArray.add(i, tempArray.get(i));
        }
        System.out.println("Test");
        while (improve < 20){
            for ( int i = 1; i < tempArray.size() - 1; i++ ) {
                for (int k = i + 1; k < tempArray.size(); k++) {
                    TwoOptSwap(i, k);             //modifies twoOptTempArray
                    twoOptTempDist = sumList(twoOptTempArray);    //creates list of distances from twoOptTempArray
                    int newDist = distSum(twoOptTempDist);              //creates total distance from twoOptTempDist
                    if (newDist < tripDist){
                        improve = 0;
                        for (int j=0; j < size; j++){
                            tempArray.set(j, twoOptTempArray.get(j));
                        }
                        tripDist = newDist;
                        finArray = twoOptTempArray;
                        finDist = twoOptTempDist;
                        System.out.println(tripDist);
                    }
                }
            }
            improve++;
        }
    }

/*    public void opt2Start(){
        nearNeighbor();
        improve = true;
        System.out.println("Starting Distance: " + tripDist);
        opt2R(); //start again
        return;
    }

    private void opt2R(){
        if (improve == false){
            return;
        }
        for (int i=1; i < finArray.size(); i++){
            for (int k=i+1; k < finArray.size(); k++){
                ArrayList<Place> workingRoute = opt2Swap(finArray, i, k);   //new placeArray w/ swaps
                ArrayList<Integer> workingDist = opt2DistSum(workingRoute);//create distArray from placeArray
                int workingSum = distSum(workingDist);                      //find sum of distArray
                if (workingSum < twoOptTripDist){                                 //compare to total
                    twoOptTripDist = workingSum;
                    System.out.println("New Trip Distance: " + twoOptTripDist);
                    twoOptFinArray = workingRoute;
                    twoOptfinDist = workingDist;
                    improve = true;
                }
                else{
                    improve = false;
                }
                workingRoute.clear();
                workingDist.clear();
                opt2R(); //go to start
            }
        }
    }*/





    public void TwoOptSwap(int i, int k){
        for ( int c = 0; c <= i - 1; ++c ) {
            twoOptTempArray.set( c, tempArray.get( c ) );
        }

        // 2. take route[i] to route[k] and add them in reverse order to new_route
        int dec = 0;
        for ( int c = i; c <= k; ++c ) {
            twoOptTempArray.set( c, tempArray.get( k - dec ) );
            dec++;
        }

        // 3. take route[k+1] to end and add them in order to new_route
        for ( int c = k + 1; c < tempArray.size(); ++c ) {
            twoOptTempArray.set( c, tempArray.get( c ) );
        }

    }

}
