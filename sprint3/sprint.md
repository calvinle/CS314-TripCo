# Sprint 3 - T12 - Dave Matthews' Beard @deprecated

## Goal

### Shorter trips and more places to go!
### Sprint Leader: Tom Cavey

## Definition of Done

* Web application deployed on the production server (kiwis.cs.colostate.edu).
* Sprint Review and Restrospectives completed (sprint.md).
* Product Increment release `v3.0` created on GitHub with appropriate version number and name, a description based on the Release Notes template, and the arhived files.
* Version in pom.xml should be `<version>3.0</version>`.
* Javadoc and unit tests for public methods.
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

* ## UX/UI changes
* ## Code Coverage
* ## Give the User the Option to View a Shorter Trip
* ## Build a Trip from Existing Information
* ## Clean Code

*Include a discussion of planning decisions made based on your velocity from previous sprints.*

## Metrics

Statistic | Planned | Completed
--- | ---: | ---:
Tasks |  23  | 18 
Story Points |  50 | 35 

## Daily Scrums

Date | Tasks done  | Tasks in progress | Impediments 
:--- | :--- | :--- | :--- 
*date* | *@task only* | *@task only* | none
 Feb. 27, 2018| N/A|Clean Code| change distance calc to chord formula
 Mar. 3, 2018 | Clean Code, Chord Formula | Code Coverage, Slider bar | None
 

## Review

#### Completed epics in Sprint Backlog 
* *Code Coverage*:  *Tests Passing as needed*
* *Shorter Trip*: *User is able to create shorter trip from TFFI*

#### Incomplete epics in Sprint Backlog 
* *Obtain the list from a database of places*: *Creating query statements*
* *Subset of database*: *Above must be completed first*
* *TFFI Reader*: *update for TFFI V2*

#### What went well
* Access to the database, 
* filesystem expanded and integrated

#### Problems encountered and resolutions
* Being vague about what would be worked on
* Assigning tasks and issues
* Punctual on deadlines


## Retrospective

Topic | Teamwork | Process | Tools
:--- | :--- | :--- | :---
What we will change this time | Communication(live) | Getting started sooner | work on intelliJ understanding and stability”
What we did well | Helping each other when possible | Workflow is good when all are onboard | Codeclimate and Travis are useful, as well as IntelliJ
What we need to work on | Being specific as to what would be worked on | Assigning tasks and being punctual with due dates | Being prepared for IntelliJ being moody
What we will change next time | communicating more specifically about what is happening | Better at PRs, working incrementally often, rather than large amounts of work sporadically | Make sure all intellij stuff is working, use zenhub more effectively for both planning and assessment
