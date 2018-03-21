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

public class Optimizer {
    private Trip trip;
    public ArrayList<Place> finArray;
    public ArrayList<Integer> finDist;
    public ArrayList<Place> workingArray;
    private Place working;
    private Place firstPlace;

    public Optimizer(Trip t){
        finArray = new ArrayList<Place>();
        finDist = new ArrayList<Integer>();
        trip = t;
        workingArray = t.places;
        working = workingArray.get(0);
        //System.out.println(working.name);
        workingArray.remove(0);
        //System.out.println("HEREIAM");
        //finArray.add(working);
        //finDist.add(0);
        firstPlace = working;
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

    public void twoOpt(){

    }

    public void threeOpt(){

    }
}
