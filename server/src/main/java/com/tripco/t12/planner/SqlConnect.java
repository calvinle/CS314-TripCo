package com.tripco.t12.planner;

import java.sql.*;

public class SqlConnect {
  // db configuration information
  private String myDriver  = "com.mysql.jdbc.Driver";
  private String myUrl                  = "";
  private String search                 = "";
  // SQL queries to count the number of records and to retrieve the data
  private String count     = "";

  SqlConnect(String incomingSearch, String user, String pass) {
    if(System.getenv("TRAVIS") != null) {
      //set db url to travis for testing
    }
    else {
      myUrl = "jbdc:mysql://faure.cs.colostate.edu/cs314";
    }

    setSearch(incomingSearch);

    try {
      Class.forName(this.myDriver);
      // connect to the database and query
      try (Connection conn = DriverManager.getConnection(this.myUrl, user, pass);
          Statement stCount = conn.createStatement();
          Statement stQuery = conn.createStatement();
          ResultSet rsCount = stCount.executeQuery(this.count);
          ResultSet rsQuery = stQuery.executeQuery(this.search)
      ) {
        printJSON(rsCount, rsQuery);
      }
    } catch (Exception e) {
      System.err.println("Exception: " + e.getMessage());
    }
  }

  public void setSearch(String input){
    this.search = input;
  }

  private void printJSON(ResultSet count, ResultSet query) throws SQLException {
    System.out.printf("\n{\n");
    System.out.printf("\"type\": \"find\",\n");
    System.out.printf("\"title\": \"%s\",\n", this.search);
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
    SqlConnect sqlConn = new SqlConnect("");
  }
}



