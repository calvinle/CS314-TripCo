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
        //System.out.println("constructor");
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
