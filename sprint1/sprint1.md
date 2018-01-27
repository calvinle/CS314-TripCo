# Sprint 1 - Epic 2 - Distance Calculator
## Updated 1/25.  See Optional section below.
## Updated 1/26.  Only 2 text input fields for geographic coordinates.

Trip planning requires accurate distances in the selected units, either miles or kilometers.
All distances in this course are rounded to the nearest whole number.
Use of conversion factors is not acceptable and will lead to errors.

### Technology
You will use CodePen, Bootstrap 4, ReactJS, and JavaScript to create your responsive, mobile Distance Calculator with a good user experience.

The [Great Circle Distance](https://en.wikipedia.org/wiki/Great-circle_distance) formulas determine the shortest distant between two points on a sphere as measured along the surface of the sphere.
There are several ways to compute this distance.
This semester we will use chord length to determine the central angle which is then multiplied by the radius to determine the distance.

The [Geographic Coordinate System](https://en.wikipedia.org/wiki/Geographic_coordinate_system) allows us to identify the points on the earth.
We will use Latitude and Longitude to identify the points for trip planning, _copying and pasting 2 strings like the examples below exactly as they are shown._
_You should only have 2 text input fields, one for the start coordinate and one for the end coordinate._
The coordinates must be converted to decimal values for the Great Circle Distance computation.
They may be specified in various formats which may need to be converted to a postive or negative floating point value from the various [formats](https://en.wikipedia.org/wiki/Decimal_degrees):
* degrees minutes seconds: __40° 26′ 46″ N 79° 58′ 56″ W__
* degrees decimal minutes: __40° 26.767′ N 79° 58.933′ W__
* decimal degrees: __40.446° N 79.982° W__
* floating point __40.445 -79.982__

The earth is not a perfect sphere.
The [radius of the earth](https://en.wikipedia.org/wiki/Earth_radius) has been studied for centuries.
Aristotle published the first reference around 350 BC.
Eratosthenes performed the first known scientific measurement and calculation around 240 BC.
For the purpose of this course we will use the mean radius of 6371.0088 km or 3958.7613 miles.

### Process
This will be your first single page web application.
Use the minimal HTML page template to load the style sheet and javascript files.
The Bootstrap 4 user experience should be implemented in JavaScript as done in the second stage of the previous assignment.
The application logic should be implemented in a separate JavaScript classes for the conversions and distance computations.

All work should be done on github.
Each team will demo their solution in class for a portion of the grade.

### Optional (added 1/25)
Remember those changing requirements?
This assignment may be easier than I intended and some of you might like more of a challege so I thought I'd add something optional.
Think of this as another Epic/User Story for this sprint - it's something like what you will do in the next sprint.
You don't have to do it in this sprint.
* Add a second button that let's the user choose a file in the local file system to process.
* The file will be in the same format as brews.json so that would be good test data.
* Treat the file as a round trip between consecutive locations that returns to the starting location.
* Compute the leg distance and cummulative distance for each consecutive pair to form an itinerary.
* Display the itinerary aa table with the from information, to information, leg distance, and cumulative distance.

### Submission
To complete this assignment, each team complete the following before the assignment is due.
* Create a **sprint1** directory at the top level of your repo.
* Copy the **sprint.md** file from the **sprint1/sprint.md** file in the tripco repo to your **sprint1** directory, updating the team number and name.
* Create and modify your HTML and JavaScript files in this directory during development.
* Choose a team member to demonstrate your distance calculator during class.
* Complete the **Review** and **Retrospective** portions of the **sprint.md** file as a team.

Check Canvas for due dates.
