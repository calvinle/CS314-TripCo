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
    public Place[] workingArray;

    //Test if contain shortest distance. Will become finArray/finDist if they do
    public Place[] tempArray;
    private int[] tempDist;

    public Place[] finArray;
    public int[] finDist;

    public Place[] twoOptTempArray;
    public int[] twoOptTempDist;

    public Place[] threeOptTempArray;
    public Place[] tempSwap;
    public int[] threeOptTempDist;

    private boolean improve;


    public Optimizer(Trip t){
        trip = t;
        tempArray = new Place[t.places.length];
        tempDist = new int[t.distances.length];
        finArray = new Place[t.places.length];
        finDist = new int[t.distances.length];
        workingArray = t.places;
        visited = new boolean[workingArray.length-1];

        nnTable = new int[workingArray.length-1][workingArray.length-1];

        //Populate Table of distances
        for (int i=0; i < workingArray.length-1; i++){
            for (int j=0; j < workingArray.length-1; j++){
                int dist = NNhelper(workingArray[i], workingArray[j]);
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


    public int[] sumList(Place[] workingRoute){
        int[] opt2dists = new int[trip.distances.length];
        for (int i=0; i < workingRoute.length-1; i++){
            opt2dists[i] = NNhelper(workingRoute[i], workingRoute[i+1]);
        }

        return opt2dists;
    }

    public int distSum(int[] distances){
        int sum = 0;
        for (int i=0; i < distances.length; i++){
            sum+=distances[i];
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
            tempArray.add(tempArray[0]);
            tempDist.add(NNhelper(tempArray[tempArray.length-1], tempArray[tempArray.length-2]));
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
        tempArray.add(workingArray[working]);
        visCities[working] = true;
        current = working;
        counter++;
        oneTripNN(current, counter, visCities);
    }

    public void nearNeighbor(){
        if(allTrue(visited)) {
            System.out.println("done " + tripDist);
            //System.out.println("DISTS" +Arrays.toString(finDist.toArray()));
            finDist[0] = 0;
            return;
        }

        int starting = firstFalse(visited);
        tempArray.add(workingArray[starting]));
        boolean[] visCities = new boolean[visited.length];
        oneTripNN(starting, 0,visCities);

        //Feed into 2Opt here. Use temp variables first

        //Feed NN to 2Opt
        if (((Double.parseDouble(trip.options.optimization) >= .66 && Double.parseDouble(trip.options.optimization) < 1))){
            //System.out.println("2opt");
            //twoOptTempArray = new Place[tempArray.size()];
            twoOptTempDist =  new int[trip.places.length];
            TwoOpt();
            //add final stuff here?

        }
        
        //Feed NN to 3Opt
        if (Double.parseDouble(trip.options.optimization) >= 1){
            threeOptTempDist = new int[trip.places.length-1];
            tempSwap = new Place[trip.places.length];
            ThreeOpt();
        }
        
        //NN only
        else{
            int temp = distSum(tempDist);
            System.out.println("trip " + temp + " " + starting);
            if (temp < tripDist){
                for (int i=0; i < tempArray.length; i++){
                    finArray[i] = tempArray[i];
                }
                for (int i=0; i < tempDist.length; i++){
                    finDist[i] = tempDist[i];
                }
                tripDist = temp;
            }
        }
        nearNeighbor();
    }

    private void TwoOpt(){
        //tempArray, temptDist, can get distSum
        twoOptTempArray = tempArray;    //copies tempArray
        improve = true;
        while (improve){
            improve = false;
            for ( int i = 0; i < twoOptTempArray.length-3; i++) {
                for (int k =i+2; k < twoOptTempArray.length-2; k++) {
                    int delta = (-1 * NNhelper(twoOptTempArray[i], twoOptTempArray[i+1]) )
                            - (NNhelper(twoOptTempArray[k], twoOptTempArray[k+1]))
                            + (NNhelper(twoOptTempArray[i], twoOptTempArray[k]))
                            + (NNhelper(twoOptTempArray[i+1], twoOptTempArray[k+1]));
                    if (delta < 0){ //If difference is negative, trip is shortened
                        TwoOptReverse(i+1, k);
                        int[] newDists = sumList(twoOptTempArray);
                        int sum = distSum(newDists);
                        improve = true;
                        if (sum < tripDist){    //Set final variables
                            tripDist = sum;
                            for (int b=0; b < twoOptTempArray.length; b++){
                                finArray[b] = twoOptTempArray[b];
                            }
                            for (int b=0; b < twoOptTempDist.length; b++){
                                finDist[b] = twoOptTempDist[b];
                            }
                        }
                    }
                }
            }
        }
        return;
    }
  
    public void TwoOptReverse(int i, int k){
        while (i < k){
            Place temp = twoOptTempArray[i];
            twoOptTempArray[i] = twoOptTempArray[k];
            twoOptTempArray[k] = temp;
            i++;
            k--;
        }
    }

    public void ThreeOptReverse(int a, int b){
        while (a < b){
            Place tempPlace = threeOptTempArray[a];
            threeOptTempArray[a] = threeOptTempArray[b];
            threeOptTempArray[b] = tempPlace;
            a++;
            b--;
        }
    }

    public void ThreeOpt() {
        threeOptTempArray = tempArray;
        improve = true;
        while (improve) {
            improve = false;
            for (int i = 0; i < tempArray.length - 3; i++) {
                for (int j = i + 1; j < tempArray.length - 2; j++) {
                    for (int k = j + 1; k < tempArray.length-1; k++) {
                        int newK = k+1;
                        if (newK == tempArray.length){
                            newK = 0;
                        }

                        //currentDistance with present i,j,k. Measures distance between all 3 edges
                        int currentDistance = NNhelper(threeOptTempArray[i], threeOptTempArray[i+1])
                            + NNhelper(threeOptTempArray[j], threeOptTempArray[j+1])
                            + NNhelper(threeOptTempArray[k], threeOptTempArray[newK]);

                        //Go backwards from slide diagram (most to least complex)
                        //Case 7
                        if (NNhelper(threeOptTempArray[i], threeOptTempArray[j+1])
                            + NNhelper(threeOptTempArray[i+1], threeOptTempArray[k])
                            + NNhelper(threeOptTempArray[j], threeOptTempArray[newK]) < currentDistance){

                            //i+1 to j: Untouched
                            //j+1 to k: Untouched
                            ThreeOptExchange(i,j,k); //Swap above SubArrays
                            ThreeOptImprove();
                            continue;
                        }

                        //Case 6
                        if (NNhelper(threeOptTempArray[i], threeOptTempArray[k])
                            + NNhelper(threeOptTempArray[i+1], threeOptTempArray[j+1])
                            + NNhelper(threeOptTempArray[j], threeOptTempArray[newK]) < currentDistance){

                            ThreeOptReverse(i+1, j);//i+1 to j: Reverse
                            //j+1 to k: Untouched
                            ThreeOptExchange(i,j,k); //Swap above Arrays
                            ThreeOptImprove();
                            continue;
                        }

                        //Case 5
                        if (NNhelper(threeOptTempArray[i], threeOptTempArray[j+1])
                            + NNhelper(threeOptTempArray[j], threeOptTempArray[k])
                            + NNhelper(threeOptTempArray[i+1], threeOptTempArray[newK]) < currentDistance){

                            //i+1 to j: Untouched
                            ThreeOptReverse(j+1, k); //j+1 to k: Reverse
                            ThreeOptExchange(i,j,k); //Swap above SubArrays
                            ThreeOptImprove();
                            continue;
                        }

                        //Case 4
                        if (NNhelper(threeOptTempArray[i], threeOptTempArray[j])
                            + NNhelper(threeOptTempArray[i+1], threeOptTempArray[k])
                            + NNhelper(threeOptTempArray[j+1], threeOptTempArray[newK]) < currentDistance){


                            ThreeOptReverse(i+1, j); //i+1 to j: Reverse
                            ThreeOptReverse(j+1, k); //j+1 to k: Reverse
                            //No swap
                            ThreeOptImprove();
                            continue;
                        }

                        //Case 3
                        if (NNhelper(threeOptTempArray[i], threeOptTempArray[k])
                            + NNhelper(threeOptTempArray[j], threeOptTempArray[j+1])
                            + NNhelper(threeOptTempArray[i+1], threeOptTempArray[newK]) < currentDistance){


                            ThreeOptReverse(i+1, k); //i+1 to k: Reverse
                            //j+1 to k: Untouched
                            //No swap
                            ThreeOptImprove();
                            continue;
                        }

                        //Case 2
                        if (NNhelper(threeOptTempArray[i], threeOptTempArray[i+1])
                            + NNhelper(threeOptTempArray[j], threeOptTempArray[k])
                            + NNhelper(threeOptTempArray[j+1], threeOptTempArray[newK]) < currentDistance){

                            //i+1 to j: Untouched
                            ThreeOptReverse(j+1, k);//j+1 to k: Reverse
                            //No swap
                            ThreeOptImprove();
                            continue;
                        }

                        //Case 1
                        if (NNhelper(threeOptTempArray[i], threeOptTempArray[j])
                            + NNhelper(threeOptTempArray[i+1], threeOptTempArray[j+1])
                            + NNhelper(threeOptTempArray[k], threeOptTempArray[newK]) < currentDistance){

                            ThreeOptReverse(i+1, j); //i+1 to j: Reverse
                            // j+1 to k: Untouched
                            //No swap
                            ThreeOptImprove();
                            continue;
                        }
                        else{
                            improve = false;
                        }
                    }
                }
            }
        }
    }

    public Place[] ThreeOptExchange(int i, int j, int k){ //swaps portions of threeOptTempArray
        //i already refers to i+1
        //int start1, int end1, int start2, int end2
        int n = threeOptTempArray.length;
        int n1 = j - i + 1;
        int n2 = k - (j+1) + 1;

        Place[] swappedPlaces = new Place[n];
        // Copy up until i
        System.arraycopy(threeOptTempArray, 0, swappedPlaces, 0, i);
        // Copy First subarray
        System.arraycopy(threeOptTempArray, i, swappedPlaces, i + k - j, n1);
        // Copy Between subarrays
        System.arraycopy(threeOptTempArray, j + 1, swappedPlaces, i + n2, j+1 - j - 1);
        // Copy Second subarray
        System.arraycopy(threeOptTempArray, j+1, swappedPlaces, i, n2);
        // After second subarray
        System.arraycopy(threeOptTempArray, k + 1, swappedPlaces, k + 1, n - k - 1);

        return swappedPlaces;

    }

    public void ThreeOptImprove(){
        improve = true;
        threeOptTempDist = sumList(threeOptTempArray);
        int sum = distSum(threeOptTempDist);
        if (sum < tripDist){
            System.out.println("3Opt Dist: " + sum);
            tripDist = sum;
            for (int b=0; b < threeOptTempArray.length; b++){
                finArray[b] = threeOptTempArray[b];
            }
            for (int b=0; b < threeOptTempDist.length; b++){
                finDist[b] = threeOptTempDist[b];
            }
        }
    }

}
