package com.tripco.t12.planner;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.lang.*;
import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.*;

@RunWith(JUnit4.class)

public class TestSQL {
    Query query;
    Filter filter;
    SqlConnect sqlCon;

    @Before
    public void initialize() {
        filter = new Filter();
        query = new Query();
        sqlCon = new SqlConnect();
    }

    @Test
    public void testTrue() {
        assertTrue(true == true);
    }

    @Test
    public void testQueryBuilder() {
        Filter[] filters = new Filter[1];

        for (int i = 0; i < 1; i++)
        {
            ArrayList<String> vals = new ArrayList<>();
            filters[i] = new Filter();
            vals.add("heliport");
            filters[i].attribute = "type";
            filters[i].values.add("heliport");
        }

        String queryString0 = sqlCon.getSqlQuery("aspen", 30, filters);

        String queryString1 = sqlCon.getSqlQueryNoFilters("aspen", 1000000);

        String filterS = "SELECT * FROM airports WHERE (id LIKE '%aspen%' or type like '%aspen%' or name like" +
                " '%aspen%' or municipality like '%aspen%') and (airports.type = \"heliport\")LIMIT 30;";

        String noFilterS = "SELECT * FROM airports WHERE (id LIKE '%aspen%' or type like '%aspen%' " +
                "or name like '%aspen%' or municipality like '%aspen%')LIMIT 1000000;";

        assertEquals(queryString0, filterS);
        assertEquals(queryString1, noFilterS);

    }

}
