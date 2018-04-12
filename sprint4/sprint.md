# Sprint 4 - *12* - *Dave Matthew's Beard @deprecated*

## Goal

### Worldwide!
### Sprint Leader: *Calvin Le*

## Definition of Done

* Web application deployed on the production server (kiwis.cs.colostate.edu).
* Sprint Review and Restrospectives completed (sprint.md).
* Product Increment release `v4.0` created on GitHub with appropriate version number and name, a description based on the Release Notes template, and the archived files.
* Version in pom.xml should be `<version>4.0</version>`.
* Javadoc and unit tests for public methods.
* Tests for database and REST APIs.
* Coverage at least 50% overall and for each class.

## Policies

* Code adheres to Google style guides for Java and JavaScript.
* Tests and Javadoc are written before/with code.
* All pull requests include tests for the added or modified code.
* Master is never broken.  If broken, it is fixed immediately.
* Always check for new changes in master to resolve merge conflicts locally before committing them.
* All changes are built and tested before they are committed.
* Continuous integration successfully builds and tests pull requests for master branch always.
* All commits with more than 1 line of change include a task/issue number.
* All Java dependencies in pom.xml.

## Plan

Epics planned for this release.

* Branding
* Shorter Trips
* Worldwide Destination
* Filtered Search
* New Map Format
* Custom Distance Units

*Include a discussion of planning decisions made based on your velocity from previous sprints.*

## Metrics

Statistic | Planned | Completed
--- | ---: | ---:
Tasks |  47   | 41
Story Points |  86 | 76

## Daily Scrums

Date | Tasks done  | Tasks in progress | Impediments
:--- | :--- | :--- | :---
Mar. 27, 2018| DB Search | NN Fix | Miscalcuations
Mar. 29, 2018| Basic Branding| 2Opt | None
Apr. 3, 2018 | SQL Query | New DB searches, API Testing | None
Apr. 10, 2018 | 2Opt Improvements | UI finalization | npm and packages

## Review

#### Completed epics in Sprint Backlog
* *Distance Unit Configuration*:  *comments*
* *Shorter Trips* : On top of Nearest Neighbor
* *Filtered Searches* :
* *Zoom and Pan Map* :

#### Incomplete epics in Sprint Backlog
* *Improve User Experience*: *explanation...*
* *System Testing*:

#### What went well
* Simplifying trip algorithms
* System Testing
* Time Communication
* Creating a more functional user interface to improve experience
* Creating test cases that were easy to compute by

#### Problems encountered and resolutions
* Initial understanding of 2-Opt, though quickly resolved by asking Dave Mathews
* Utilizing ReactStrap to change the majority of the user interface, resolved by studying
* Debugging individual steps for 2-Opt. Small sized test cases (including round trip) were created and calculated by hand to have a real answer to compare to. In turn, this made implementing the improved-2Opt from the lectures easier than expected.
* Confusion on decisions and changes made. Part of the reason is most communication coming across Slack. Obviously, explaining in person is more clear.
* In terms of technicalities,

## Retrospective

Topic | Teamwork | Process | Tools
:--- | :--- | :--- | :---
What we will change this time |  |  |
What we did well |  |  |
What we need to work on |  |  |
What we will change next time |  |  |
