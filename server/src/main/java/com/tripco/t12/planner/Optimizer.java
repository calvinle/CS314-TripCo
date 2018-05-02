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

    public Place[] twoOptTempArray;
    public Integer[] twoOptTempDist;

    public Place[] threeOptTempArray;
    public Place[] tempSwap;
    public Integer[] threeOptTempDist;

    private boolean improve;


    public Optimizer(Trip t){
        trip = t;
        tempArray = new ArrayList<Place>();
        tempDist = new ArrayList<Integer>();
        finArray = new ArrayList<Place>();
        finDist = new ArrayList<Integer>();
        System.out.println(finDist);
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


    public Integer[] sumList(Place[] workingRoute){
        Integer[] opt2dists = new Integer[tempDist.size()];
        for (int i=0; i < workingRoute.length-1; i++){
            opt2dists[i] = NNhelper(workingRoute[i], workingRoute[i+1]);
        }
        return opt2dists;
    }

    public int distSum(ArrayList<Integer> distances, Integer[] dists){
        int sum = 0;
        if (dists == null){
            for (int i=0; i < distances.size(); i++){
                sum+=distances.get(i);
            }
        }

        else if (distances == null){
            for (int i=0; i < dists.length; i++){
                sum+=dists[i];
            }
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

        //Feed NN to 2Opt
        if (((Double.parseDouble(trip.options.optimization) >= .66 && Double.parseDouble(trip.options.optimization) < 1))){
            System.out.println("2opt");
            TwoOpt();
        }

        //Feed NN to 3Opt
        if (Double.parseDouble(trip.options.optimization) >= 1){
            System.out.println("3opt");
            ThreeOpt();
        }

        //NN only
        else{
            int temp = distSum(tempDist, null);
            System.out.println("trip " + temp + " " + starting);
            if (temp < tripDist){
                finArray.clear();
                for (int i=0; i < tempArray.size(); i++){
                    finArray.add(i, tempArray.get(i));
                }
                finDist.clear();
                for (int i=0; i < tempDist.size(); i++){
                    finDist.add(i, tempDist.get(i));
                }
                tripDist = temp;
            }
        }
        nearNeighbor();
    }

    private void TwoOpt(){
        //tempArray, temptDist, can get distSum
        twoOptTempArray = tempArray.toArray(new Place[tempArray.size()]);    //copies tempArray
        improve = true;
        while (improve){
            improve = false;
            for ( int i = 0; i < twoOptTempArray.length-2; i++) {
                for (int k =i+2; k < twoOptTempArray.length-1; k++) {
                    int delta = (-1 * NNhelper(twoOptTempArray[i], twoOptTempArray[i+1]) )
                            - (NNhelper(twoOptTempArray[k], twoOptTempArray[k+1]))
                            + (NNhelper(twoOptTempArray[i], twoOptTempArray[k]))
                            + (NNhelper(twoOptTempArray[i+1], twoOptTempArray[k+1]));
                    if (delta < 0){ //If difference is negative, trip is shortened
                        TwoOptReverse(i+1, k);
                        twoOptTempDist = sumList(twoOptTempArray);
                        int sum = distSum(null, twoOptTempDist);
                        improve = true;
                        if (sum < tripDist){    //Set final variables
                            tripDist = sum;
                            finArray.clear();
                            for (int b=0; b < twoOptTempArray.length; b++){
                                finArray.add(b, twoOptTempArray[b]);
                            }
                            finDist.clear();
                            for (int b=0; b < twoOptTempDist.length; b++){
                                finDist.add(b, twoOptTempDist[b]);
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
        threeOptTempArray = tempArray.toArray(new Place[tempArray.size()]);
        improve = true;
        while (improve) {
            improve = false;
            for (int i = 0; i < tempArray.size() - 3; i++) {
                for (int j = i + 1; j < tempArray.size() - 2; j++) {
                    for (int k = j + 1; k < tempArray.size()-1; k++) {
                        int newK = k+1;

                        //currentDistance with present i,j,k. Measures distance between all 3 edges
                        int currentDistance = NNhelper(threeOptTempArray[i], threeOptTempArray[i+1])
                            + NNhelper(threeOptTempArray[j], threeOptTempArray[j+1])
                            + NNhelper(threeOptTempArray[k], threeOptTempArray[newK]);

                        //Go backwards from slide diagram (most to least complex)

                        //Case 7: 3opt 3X
                        if (NNhelper(threeOptTempArray[i], threeOptTempArray[j+1])
                            + NNhelper(threeOptTempArray[i+1], threeOptTempArray[k])
                            + NNhelper(threeOptTempArray[j], threeOptTempArray[newK]) < currentDistance){

                            //i+1 to j: Untouched
                            //j+1 to k: Untouched
                            ThreeOptExchange(i+1,j,k); //Swap above SubArrays
                            ThreeOptImprove();
                            continue;
                        }

                        //Case 6: 3opt 2X
                        else if (NNhelper(threeOptTempArray[i], threeOptTempArray[j])
                            + NNhelper(threeOptTempArray[i+1], threeOptTempArray[k])
                            + NNhelper(threeOptTempArray[j+1], threeOptTempArray[newK]) < currentDistance){

                            ThreeOptReverse(i+1, j);//i+1 to j: Reverse
                            ThreeOptReverse(j+1, k);//j+1 to k: Reverse

                            ThreeOptImprove();
                            continue;
                        }

                        //Case 5: 3opt 2X
                        else if (NNhelper(threeOptTempArray[i], threeOptTempArray[j+1])
                            + NNhelper(threeOptTempArray[j], threeOptTempArray[k])
                            + NNhelper(threeOptTempArray[i+1], threeOptTempArray[newK]) < currentDistance){

                            //i+1 to j: Untouched
                            ThreeOptExchange(i+1,j,k); //Swap above SubArrays
                            ThreeOptReverse(j+1, k); //j+1 to k: Reverse

                            ThreeOptImprove();
                            continue;
                        }

                        //Case 4: 3opt 2X
                        else if (NNhelper(threeOptTempArray[i], threeOptTempArray[k])
                            + NNhelper(threeOptTempArray[i+1], threeOptTempArray[j+1])
                            + NNhelper(threeOptTempArray[j], threeOptTempArray[newK]) < currentDistance){

                            ThreeOptExchange(i+1,j,k);
                            ThreeOptReverse(i+1, j); //i+1 to j: Reverse
                            //No swap
                            ThreeOptImprove();
                            continue;
                        }

                        //Case 3: 2opt 1X
                        else if (NNhelper(threeOptTempArray[i], threeOptTempArray[i+1])
                            + NNhelper(threeOptTempArray[j], threeOptTempArray[k])
                            + NNhelper(threeOptTempArray[j+1], threeOptTempArray[newK]) < currentDistance){


                            ThreeOptReverse(j+1, k); //i+1 to k: Reverse
                            //No swap
                            ThreeOptImprove();
                            continue;
                        }

                        //Case 2: 2opt 1X
                        else if (NNhelper(threeOptTempArray[i], threeOptTempArray[j])
                            + NNhelper(threeOptTempArray[i+1], threeOptTempArray[j+1])
                            + NNhelper(threeOptTempArray[k], threeOptTempArray[newK]) < currentDistance){


                            ThreeOptReverse(i+1, k);//j+1 to k: Reverse
                            //No swap
                            ThreeOptImprove();
                            continue;
                        }

                        //Case 1
                        else if (NNhelper(threeOptTempArray[i], threeOptTempArray[k])
                            + NNhelper(threeOptTempArray[j], threeOptTempArray[j+1])
                            + NNhelper(threeOptTempArray[i+1], threeOptTempArray[newK]) < currentDistance){

                            ThreeOptReverse(i+1, k); //i+1 to j: Reverse
                            // j+1 to k: Untouched
                            //No swap
                            ThreeOptImprove();
                            continue;
                        }
                    }
                }
            }
        }
        return;
    }

    public void ThreeOptExchange(int i, int j, int k){ //swaps portions of threeOptTempArray
        int n = threeOptTempArray.length;
        int n1 = j - i + 1; //size of subArray1
        int n2 = k - (j+1) + 1; //size of subArray2

        if (n1 < n2){
            tempSwap = new Place[n1];
            //copy subArray1 to tempSwap
            System.arraycopy(threeOptTempArray, i, tempSwap, 0, n1);
            //Copy subArray2 at i
            System.arraycopy(threeOptTempArray, (j+1), threeOptTempArray, i, n2);
            //Copy tempSwap( of subArray1) at k-j+1
            System.arraycopy(tempSwap, 0, threeOptTempArray, k-j+1, n1);
        }
        else if (n2 <= n1){
            tempSwap = new Place[n2];
            //copy subArray2 to tempSwap
            System.arraycopy(threeOptTempArray, (j+1), tempSwap, 0, n2);
            //copy subArray1 at k - j + 1
            System.arraycopy(threeOptTempArray, i, threeOptTempArray, k-j+1, n1);
            //copy tempSwap (of subArray2) at i
            System.arraycopy(tempSwap, 0, threeOptTempArray, i, n2);
        }


        // Copy up until i

//        System.arraycopy(threeOptTempArray, 0, swappedPlaces, 0, i);
//        // Copy First subarray
//        System.arraycopy(threeOptTempArray, i, swappedPlaces, i + k - j, n1);
//        // Copy Between subarrays
//        System.arraycopy(threeOptTempArray, j + 1, swappedPlaces, i + n2, j+1 - j - 1);
//        // Copy Second subarray
//        System.arraycopy(threeOptTempArray, j+1, swappedPlaces, i, n2);
//        // Copy all after second subarray
//        System.arraycopy(threeOptTempArray, k + 1, swappedPlaces, k + 1, n - k - 1);

    }

    public void ThreeOptImprove(){
        improve = true;
        threeOptTempDist = sumList(threeOptTempArray);
        int sum = distSum(null, threeOptTempDist);
        if (sum < tripDist){
            System.out.println("3Opt Dist: " + sum);
            tripDist = sum;
            finArray.clear();
            for (int b=0; b < threeOptTempArray.length; b++){
                finArray.add(b, threeOptTempArray[b]);
            }
            finDist.clear();
            for (int b=0; b < threeOptTempDist.length; b++){
                finDist.add(b, threeOptTempDist[b]);
            }
        }
    }

}
