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
import java.util.Collections;

public class Optimizer {
    private Trip trip;
    private int[][] nnTable;
    private boolean[] visited;
    private int tripDist = (int)Double.POSITIVE_INFINITY;
    public ArrayList<Place> workingArray;

    //Test if contain shortest distance. Will become finArray/finDist if they do
    public ArrayList<Place> tempArray;
    private ArrayList<Integer> tempDist;

    public ArrayList<Place> finArray;
    public ArrayList<Integer> finDist;

    public ArrayList<Place> twoOptTempArray;
    public ArrayList<Integer> twoOptTempDist;

    public ArrayList<Place> threeOptTempArray;
    public ArrayList<Place> tempSwap;
    public ArrayList<Integer> threeOptTempDist;

    private boolean improve;


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


    public ArrayList<Integer> sumList(ArrayList<Place> workingRoute){
        ArrayList<Integer> opt2dists = new ArrayList<Integer>();
        for (int i=0; i < workingRoute.size()-1; i++){
            opt2dists.add(NNhelper(workingRoute.get(i), workingRoute.get(i+1)));
        }

        return opt2dists;
    }

    public int distSum(ArrayList<Integer> distances){
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
            //System.out.println(finDist);
            return;
        }
        tempDist.clear();
        tempArray.clear();
        int starting = firstFalse(visited);
        tempArray.add(workingArray.get(starting));
        boolean[] visCities = new boolean[visited.length];
        oneTripNN(starting, 0,visCities);

        //Feed into 2Opt here. Use temp variables first

        //Feed NN to 2Opt
        if (Double.parseDouble(trip.options.optimization) == 2){ //@TODO: Change for 0-1 slider?
            //System.out.println("2opt");
            //twoOptTempArray = new Place[tempArray.size()];
            twoOptTempDist =  new ArrayList<Integer>();
            TwoOpt();
            //add final stuff here?

        }
        
        //Feed NN to 3Opt
        if (Double.parseDouble(trip.options.optimization) > 2){//@TODO: Change for 0-1 Slider
            System.out.println("3opt");
            threeOptTempDist = new ArrayList<Integer>();
            ThreeOpt();

        }
        
        //NN only
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
        twoOptTempArray = tempArray;
        improve = true;
        while (improve){
            improve = false;
            for ( int i = 0; i < tempArray.size()-3; i++) {
                for (int k =i+2; k < tempArray.size()-2; k++) {
                    int delta = (-1 * NNhelper(tempArray.get(i), tempArray.get(i+1)) )
                            - (NNhelper(tempArray.get(k), tempArray.get(k+1)))
                            + (NNhelper(tempArray.get(i), tempArray.get(k)))
                            + (NNhelper(tempArray.get(i+1), tempArray.get(k+1)));
                    if (delta < 0){ //If difference is negative, trip is shortened
                        TwoOptReverse(i+1, k);
                        ArrayList<Integer> newDists = sumList(twoOptTempArray);
                        int sum = distSum(newDists);
                        improve = true;
                        if (sum < tripDist){    //Set final variables
                            tripDist = sum;
                            finArray = twoOptTempArray;
                            finDist = newDists;
                        }
                    }
                }
            }
        }
        return;
    }
  
    public void TwoOptReverse(int i, int k){
        while (i < k){
            Place temp = twoOptTempArray.get(i);
            twoOptTempArray.set(i, twoOptTempArray.get(k));
            twoOptTempArray.set(k, temp);
            i++;
            k--;
        }
    }

    public void ThreeOptReverse(int i, int k){
      while (i < k){
        Place temp = threeOptTempArray.get(i);
        threeOptTempArray.set(i, threeOptTempArray.get(k));
        threeOptTempArray.set(k, temp);
        i++;
        k--;
      }
    }

    private void ThreeOpt() {
        threeOptTempArray = tempArray;
        improve = true;
        while (improve) {
            improve = false;
            for (int i = 0; i < tempArray.size() - 2; i++) {
                for (int j = i + 1; j < tempArray.size() - 1; j++) {
                    for (int k = j + 1; k < tempArray.size(); k++) {
                        //currentDistance with present i,j,k. Measures distance between all 3 edges
                        int currentDistance = NNhelper(tempArray.get(i), tempArray.get(i+1))
                                            + NNhelper(tempArray.get(j), tempArray.get(j+1))
                                            + NNhelper(tempArray.get(k), tempArray.get(k+1));

                        //Go backwards from slide diagram (most to least complex)
                        //Case 7
                        if (NNhelper(tempArray.get(i), tempArray.get(j+1))
                            + NNhelper(tempArray.get(i+1), tempArray.get(k))
                            + NNhelper(tempArray.get(j), tempArray.get(k+1)) < currentDistance){

                            //i+1 to j: Untouched
                            //j+1 to k: Untouched
                            ThreeOptExchange(i,j,k); //Swap above SubArrays
                            ThreeOptImprove();
                            continue;
                        }

                        //Case 6
                        if (NNhelper(tempArray.get(i), tempArray.get(k))
                            + NNhelper(tempArray.get(i+1), tempArray.get(j+1))
                            + NNhelper(tempArray.get(j), tempArray.get(k+1)) < currentDistance){

                            ThreeOptReverse(i+1, j);//i+1 to j: Reverse
                            //j+1 to k: Untouched
                            ThreeOptExchange(i,j,k); //Swap above Arrays
                            ThreeOptImprove();
                            continue;
                        }

                        //Case 5
                        if (NNhelper(tempArray.get(i), tempArray.get(j+1))
                            + NNhelper(tempArray.get(j), tempArray.get(k))
                            + NNhelper(tempArray.get(i+1), tempArray.get(k+1)) < currentDistance){

                            //i+1 to j: Untouched
                            ThreeOptReverse(j+1, k); //j+1 to k: Reverse
                            ThreeOptExchange(i,j,k); //Swap above SubArrays
                            ThreeOptImprove();
                            continue;
                        }

                        //Case 4
                        if (NNhelper(tempArray.get(i), tempArray.get(j+1))
                            + NNhelper(tempArray.get(i+1), tempArray.get(k))
                            + NNhelper(tempArray.get(j+1), tempArray.get(k+1)) < currentDistance){


                            ThreeOptReverse(i+1, j); //i+1 to j: Reverse
                            ThreeOptReverse(j+1, k); //j+1 to k: Reverse
                            //No swap
                            ThreeOptImprove();
                            continue;
                        }

                        //Case 3
                        if (NNhelper(tempArray.get(i), tempArray.get(k))
                            + NNhelper(tempArray.get(j), tempArray.get(j+1))
                            + NNhelper(tempArray.get(i+1), tempArray.get(k+1)) < currentDistance){


                            ThreeOptReverse(i+1, k); //i+1 to k: Reverse
                            //j+1 to k: Untouched
                            //No swap
                            ThreeOptImprove();
                            continue;
                        }

                        //Case 2
                        if (NNhelper(tempArray.get(i), tempArray.get(i+1))
                            + NNhelper(tempArray.get(j), tempArray.get(k))
                            + NNhelper(tempArray.get(j+1), tempArray.get(k+1)) < currentDistance){

                            //i+1 to j: Untouched
                            ThreeOptReverse(j+1, k);//j+1 to k: Reverse
                            //No swap
                            ThreeOptImprove();
                            continue;
                        }

                        //Case 1
                        if (NNhelper(tempArray.get(i), tempArray.get(j))
                            + NNhelper(tempArray.get(i+1), tempArray.get(j+1))
                            + NNhelper(tempArray.get(k+1), tempArray.get(k+1)) < currentDistance){

                            ThreeOptReverse(i+1, j); //i+1 to j: Reverse
                            // j+1 to k: Untouched
                            //No swap
                            ThreeOptImprove();
                            continue;
                        }
                    }
                }
            }
        }
    }

    public void ThreeOptExchange(int i, int j, int k){ //swaps portions of threeOptTempArray
        //i already refers to i+1
        //tempArray holds bigger subArray
        tempSwap.clear();
        int i2;
        if (k-j > j-i+1){   //Latter subArray size> former subArray size
            tempSwap = new ArrayList<Place>(k-j);   //size of tempSwap
            for (int b=j+1; b <= k; b++){   //copy bigger subArray to tempSwap
                tempSwap.add(tempArray.get(b));
            }

            i2=i;
            for (int c=k-(j+1)+2; c <= k; c++){
                threeOptTempArray.set(c, tempArray.get(i2));
                i2++;
            }

            i2=i;
            for (int d=0; d < tempSwap.size(); d++){
                threeOptTempArray.set(i2, tempSwap.get(d));
            }
        }

        else if (j-i+1 >= k-j){ //SubArray >= Latter subArray
            tempSwap = new ArrayList<Place>(j-i+1);
            for (int b=i; b <= j; b++){
                tempSwap.add(tempArray.get(b));
            }

            i2=i;
            for (int c=j+1; c <= k; c++){   //copy smaller portion into bigger
                threeOptTempArray.set(i2, tempArray.get(c));
                i2++;
            }

            for (int d=0; d < tempSwap.size(); d++){    //continue off
                threeOptTempArray.set(i2, tempSwap.get(d));
                i2++;
            }

        }


    }

    public void ThreeOptImprove(){
        improve = true;
        threeOptTempDist = sumList(threeOptTempArray);
        int sum = distSum(threeOptTempDist);
        if (sum < tripDist){
            tripDist = sum;
            finDist = threeOptTempDist;
            finArray = threeOptTempArray;
        }
    }
}
