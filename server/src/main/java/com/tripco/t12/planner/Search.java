package com.tripco.t12.planner;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t12.server.HTTP;
import spark.Request;

public class Search {

    private Query query;

    public Search (Request request) {
        // first print the request
        System.out.println(HTTP.echoRequest(request));

        // extract the information from the body of the request.
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());

        // convert the body of the request to a Java class.
        Gson gson = new Gson();
        query = gson.fromJson(requestBody, Query.class);

        // process the query.
        query.database();

       //SqlConnect.getQ(query.query, query.filters);

        // log something.
        System.out.println(query);
    }

    /** Handles the response for a Query object.
     * Does the conversion from a Java class to a Json string.*
     */
    public String getQuery() {
        Gson gson = new Gson();
        return gson.toJson(query);
    }

}
