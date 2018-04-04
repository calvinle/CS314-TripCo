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
    //private int workingDest;    //The column of the table we are working on

    //Arrays to be tested if they contain shortest distance. Will become finArray/finDist if they do
    private ArrayList<Place> tempArray;
    private ArrayList<Integer> tempDist;

    //Arrays to be returned
    public ArrayList<Place> finArray;
    public ArrayList<Integer> finDist;
    private int tripDist = (int)Double.POSITIVE_INFINITY;

    public ArrayList<Place> workingArray;


    public Optimizer(Trip t){
        //System.out.println("constructor");
        tempArray = new ArrayList<Place>();
        tempDist = new ArrayList<Integer>();
        finArray = new ArrayList<Place>();
        finDist = new ArrayList<Integer>();
        trip = t;
        workingArray = t.places;
        visited = new boolean[workingArray.size()-1];
        System.out.println(Arrays.toString(visited));

        nnTable = new int[workingArray.size()-1][workingArray.size()-1];    //original table, untouched

        //Populate Table of distances
        for (int i=0; i < workingArray.size()-1; i++){
            for (int j=0; j < workingArray.size()-1; j++){
                int dist = NNhelper(workingArray.get(i), workingArray.get(j));
                nnTable[i][j] = dist;
                //System.out.println(workingArray.get(i).id + " " + workingArray.get(j).id + " " + dist);
            }
        }
        System.out.println(Arrays.deepToString(nnTable));
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

    public void nearNeighbor(){
        if(allTrue(visited)) {
            //System.out.println("done " + tripDist);
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
        int temp = distSum(tempDist);
        System.out.println("trip " + temp + " " + starting);
        if (temp < tripDist){
            tripDist = temp;
            finArray = tempArray;
            finDist = tempDist;
        }
        nearNeighbor();
    }

    private void oneTripNN(int i, int counter, boolean[] visCities){
        if(counter == visCities.length-1){
            tempArray.add(tempArray.get(0));
            /*System.out.println(tempArray.get(0).name);
            for(Place p: tempArray){
                System.out.println(p.name);
            }*/
            tempDist.add(NNhelper(tempArray.get(tempArray.size()-1), tempArray.get(tempArray.size()-2)));
            //System.out.println("PLACES" +Arrays.toString(tempArray.toArray()));
            System.out.println("DISTS" +Arrays.toString(tempDist.toArray()));
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

}
