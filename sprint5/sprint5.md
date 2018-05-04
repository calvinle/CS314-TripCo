# Sprint 5 - *12* - *Dave Matthew's Beard @deprecated*

## Goal

### Worldwide and Extra User Customization!
### Sprint Leader: Calvin Le

## Definition of Done

* Web application deployed on the production server (kiwis.cs.colostate.edu).
* Sprint Review and Restrospectives completed (sprint.md).
* Product Increment release `v5.0` created on GitHub with appropriate version number and name, a description based on the Release Notes template, and the archived files.
* Version in pom.xml should be `<version>5.0</version>`.
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

* System Testing: #242
* TFFI Updates: #344
* Staff Page: #346, #347, #348, #363
* Interoperability: #352, 353
* View Trip in Other Tools: #359
* Save Options for Future Use: #361
* 3Opt : #356, #358
* Improve User Experience:  #249, #277, #280, #334, #343, #364



There will be an increase of discussions on ideas of executing parts of the sprint. The main benefit is to catch mistakes and hopefully find newer and better ideas. Since there is more of a focus on modifying and improving both the client and server side, members will be involved in more than one Epic.

## Metrics

Statistic | Planned | Completed
--- | ---: | ---:
Tasks |  39   | 31 
Story Points |  66  | 56 

## Daily Scrums

Date | Tasks done  | Tasks in progress | Impediments 
:--- | :--- | :--- | :--- 
4/19 | Map Markers, Query Count, Slider Step, Repo Clean | 3Opt | none
4/20 | About Section Section and Query Limit | 3Opt | Swap Algorithm Branching
4/24 | About Section | Interopt, 3Opt, Query Fix, Set Query Limit, cookies, footer size | Updated client for 3Opt, empty filter in Query TFFI
4/26 | Interopt, Query, Footer Size, Interopt | 3Opt, cookies | Types of copies for arraylists and NN wrong output
4/27 | CSS Clean up, Load/Save Modal, Calvin Resume, 2Opt Fixes | 3Opt, Drag and Drop | Off by 1 errors
5/1  | Query Fix, Cookies | 3Opt | Drag/Drop Destinations 
 

## Review

#### Completed epics in Sprint Backlog 
* *Staff Page*:  *comments*
* *Improved UI*:
* *Cookies*:
* *Inter-operability*:

#### Incomplete epics in Sprint Backlog 
* *3Opt*: *explanation...*
* *API Testing*: 
* *Drag and Drop*
* *Itinerary* 

#### What went well
* Branding and User Interface
* Query Search
* Mobile responsiveness
* Google Maps sizing
* Inter-operability
* Fixes to NN and 2Opt Algorithms
* Multiple Deploys

#### Problems encountered and resolutions
* *Handling 3Opt Alone*: Something of that magnitude should have multiple people involved, detailing diagrams
* *Interopt Error Code*: Found solution on piazza
* *Offline Server*: Website was not aligned with master even on deploy. Minor.

## Retrospective

Topic | Teamwork | Process | Tools
:--- | :--- | :--- | :---
What we will change this time | Discussing specific changes, elaborate GH/ZH Issues | Test everything along the way | Sending paper notes for hand-made calculations
What we did well | Informing of abscenses for planning | Prioritizing time and dedicating time to fix errors from previous sprint | Many, many deploys to avoid last minute panic
What we need to work on | Biting off more than can be chewed, always have 2+ people working on something. | Breaking down tasks and not undersetimating Product Backlog Items. | Adding more tests to JUnit prior to writing code on the go.
What we will change next time | When getting together, have several people work on something instead of aboslute division of issues | Frequent Scrum Meetings | Discuss with other teams 
