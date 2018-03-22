package com.tripco.t12.planner;

import java.sql.*;

public class SqlConnect {
  // db configuration information
  private final static String myDriver  = "com.mysql.jdbc.Driver";
  private String myUrl                  = "";
  // SQL queries to count the number of records and to retrieve the data
  private final static String count     = "";
  private final static String search    = "";

  SqlConnect() {
    if(System.getenv("TRAVIS") != null) {
      //set db url to travis for testing
    }
    else {
      myUrl = "jbdc:mysql://faure.cs.colostate.edu/cs314";
    }
  }

  public String getMyUrl() {
    return myUrl;
  }

  private static void printJSON(ResultSet count, ResultSet query) throws SQLException {
    System.out.printf("\n{\n");
    System.out.printf("\"type\": \"find\",\n");
    System.out.printf("\"title\": \"%s\",\n",search);
    System.out.printf("\"places\": [\n");

    count.next();
    int results = count.getInt(1);

    while (query.next()) {
      System.out.printf(" \"%s\"", query.getString("code"));
      if(--results == 0)
        System.out.printf("\n");
      else
        System.out.printf(",\n");
    }
    System.out.printf(" ]\n}\n");
  }

  // Arguments contain the username and password for the database
  public static void main(String[] args){
    SqlConnect sqlConn = new SqlConnect();
    try {
      Class.forName(myDriver);
      // connect to the database and query
      try (Connection conn = DriverManager.getConnection(sqlConn.myUrl, args[0], args[1]);
          Statement stCount = conn.createStatement();
          Statement stQuery = conn.createStatement();
          ResultSet rsCount = stCount.executeQuery(count);
          ResultSet rsQuery = stQuery.executeQuery(search)
      ) {
        printJSON(rsCount, rsQuery);
      }
    } catch (Exception e) {
      System.err.println("Exception: " + e.getMessage());
    }
  }
}



