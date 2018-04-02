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
    private int[][] tableCopy;
    private int workingDest;    //The column of the table we are working on

    //Arrays to be tested if they contain shortest distance. Will become finArray/finDist if they do
    private ArrayList<Place> tempArray;
    private ArrayList<Integer> tempDist;

    //Arrays to be returned
    public ArrayList<Place> finArray;
    public ArrayList<Integer> finDist;
    private int minDist = (int)Double.POSITIVE_INFINITY;

    public ArrayList<Place> workingArray;

    private Place working;
    private Place firstPlace;



    public Optimizer(Trip t){
        System.out.println("optimizer constructor");
        tempArray = new ArrayList<Place>();
        tempDist = new ArrayList<Integer>();
        finArray = new ArrayList<Place>();
        finDist = new ArrayList<Integer>();
        trip = t;
        workingArray = t.places;

        nnTable = new int[workingArray.size()-1][workingArray.size()-1];    //original table, untouched

        //Populate Table of distances
        for (int i=0; i < workingArray.size()-1; i++){
            for (int j=0; j < workingArray.size()-1; j++){
                int dist = NNhelper(workingArray.get(i), workingArray.get(j));
                nnTable[i][j] = dist;
                System.out.println(workingArray.get(i).id + " " + workingArray.get(j).id + " " + dist);
            }
        }
        tableCopy = nnTable;
        printTableCopy();
    }

    public void printTableCopy(){
        System.out.println("HELLO" + Arrays.deepToString(nnTable));
        System.out.println("Anything");
    }

    public void nearNeighborNew(){
        for (int i=0; i < workingArray.size(); i++) {    //use each dest. as a start
            workingDest=i;          //Use each destiation as a starter
            NNSearch();
            tableCopy = nnTable;    //@TODO: Resets tableCopy for next run?
            //@TODO: Reset stuff for next NN run with new starting dest.
        }
        return;
    }

    public void NNSearch(){
        if (tempArray.size() == workingArray.size()){    //All locations visited
            tempArray.add(finArray.get(0));  //Add startingDest to end of array
            tempDist.add(NNhelper(finArray.get(finArray.size()-1), finArray.get(finArray.size()-2)));

            int distanceTotal = distSum(finDist);
            if (distanceTotal < minDist){
                minDist = distanceTotal;
                finArray = tempArray;
                finDist = tempDist;
            }
            return;
        }
            int indexofNN = 0;
            double distofNN = Double.POSITIVE_INFINITY;

            for (int j=0; j < workingArray.size(); j++){    //column search
                if (j==workingDest){continue;}              //same location
                if (tableCopy[workingDest][j] < distofNN &&
                        tableCopy[workingDest][j] != Double.POSITIVE_INFINITY){ //Infinity mark means we already visited
                    distofNN = tableCopy[workingDest][j];
                    indexofNN = j;
                    tableCopy[workingDest][j] = (int)Double.POSITIVE_INFINITY;  //marked as visited
                    tableCopy[j][workingDest] = (int)Double.POSITIVE_INFINITY;  //marked as visited
                }
            }
            tempDist.add((int)distofNN);
            tempArray.add((workingArray.get(indexofNN)));
            workingDest = indexofNN;
            NNSearch();
        }


    public void nearNeighbor(){
        if(workingArray.isEmpty()){
            finDist.add(NNhelper(firstPlace, finArray.get(finArray.size()-1)));
            finArray.add(firstPlace);
            return;
        }
        int indexofNN = 0;
        int workingdist = 0;
        int distofNN = NNhelper(working, workingArray.get(0));
        for(int i=0;i<trip.places.size();i++){
            workingdist = NNhelper(working,workingArray.get(i));
            if(workingdist<distofNN){
                distofNN = workingdist;
                indexofNN = i;
            }
        }
        working = workingArray.get(indexofNN);
        workingArray.remove(indexofNN);
        finArray.add(working);
        finDist.add(distofNN);
        nearNeighbor();
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
