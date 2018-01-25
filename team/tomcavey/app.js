class App extends React.Component {
  render() {
    return (
      <div>
        <div className="jumbotron-fluid bg-dark">
          <Header/>
        </div>
        
        <div className="card-fluid">
          <Education/>
        </div>
      
        <div className="card-fluid">
          <Experience/>
        </div>
      
        <div className="card-fluid">
          <Club/>
        </div>      
      </div>
    )
  }
}

class Header extends React.Component {
  render() {
    return(
    <div>
      <div className="jumbotron-fluid bg-dark text-white"><button className="btn-fluid btn-dark" data-toggle="collapse" data-target="#collapseZero" aria-expanded="true" aria-controls="collapseZero">
  <h1>Tom Cavey</h1>
    </button>
    <div id="collapseZero" className="collapse show" aria-labelledby="headingZero" data-parent="#accordion">
      <div className="card-body">
      <p>tcavey@me.com<br></br>
      (408) 482-3398<br></br> 422 E. Pitkin St.<br></br> Fort Collins, CO</p>
      </div>
        </div>
      </div>
    </div>
      );
  }
}

class Education extends React.Component {
  render() {
    return (
        <div className="accordion-fluid">
    <div className="card border-light">
      <div className="card-header">
        <button className="btn-fluid btn-success" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          <h2><b> Education</b></h2>
        </button>
        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div className="card-body">
        <p><b>Colorado State University</b> – <i>Bachelors in Computer Science 
          (2014 – Present)</i>
        </p>
          <p>
            Programming Foundations: Algorithms Theory and
            Practice, Operating Systems, Problem Solving with
            C++, Algorithms and Data Structures, Computer
            Architecture, Object Oriented Problem Solving,
              Introduction to Unix, and Introduction to C
          </p>
            
          <p>
            Skills: Python, C++, C, Java, Git Hub, Assembly 
            (LC3), Algorithms
          </p>

          <p>
            Development Environments: Eclipse, Xcode, PyCharm, 
            Terminal command line
          </p>
          <p>
            Personal Project: Transformed a Raspberry Pi into a 
            programmable Apple HomeKit hub for IoT connectivity 
            and Home Automation utilizing NodeJS and Python.
          </p>
      </div>
    </div>
        </div>
      </div>
        </div>
    )
  }
}

class Experience extends React.Component {
  render() {
    return (
     
<div className="accordion-fluid">
    <div className="card border-light">
      <div className="card-header">
        <button className="btn-fluid btn-primary" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <h2><b>Experience</b></h2>
        </button>
        <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
        <div className="card-body">
            <p><b>Technology Consultant</b> – <i>Independent;
              Fort Collins, Colorado  (2015 – present)</i>
            </p>
            <p>-Provided solutions to individuals and 
              businesses looking to improve their technology
            </p>
            <p>-Implemented networking and backup solutions for
              local small businesses
            </p>
            <p>-Facilitated the selection, purchase and setup 
              of all necessary products
            </p>
          <br></br>
          <p><b>Apple Inc.</b> – <i>Genius; Broomfield, 
            Colorado (2013 – 2014)</i></p>
              <p>-Apple Certified Macintosh Technician</p>
          <p>-Provided friendly, hands-on technical support to 
            customers</p>
          <p>-Formally trained in troubleshooting theory and 
            hardware repairs for all Apple product lines</p>
          <p>-Repaired customer relationships using strong 
            people skills and problem solving abilities</p>
          <p>-Strived to foster a team culture focused on 
            development, teamwork, and enthusiasm for learning</p>
          <p>-Completed all requirements for the Apple Product 
            Professional Certificate from 2008-2014</p>
          <p>-Recognized for outstanding performance and
            awarded the 2013 Enriching Lives Certificate</p>
            <br></br>
          <p><b>Apple Inc.</b> – <i>Family Room Specialist; 
            Broomfield, Colorado  (2011 – 2013)</i></p>

          <p>-Provided exceptional customer service to users in 
            need of mobile device technical support</p>
          <p>-Conducted personal training sessions focused on 
            sharing extensive product knowledge </p>
          <p>-Facilitated group education workshops to teach 
            customers about the power of OS X and iOS</p>
            <br></br>
        <p><b>Apple Inc.</b> – <i>Retail Specialist; Santa 
          Clara, California  (2008 – 2011)</i></p>
        <p>-Specialized in selling the latest versions of all 
          Apple hardware and software</p>
        <p>-Presented product solutions to meet customer needs 
          and exceed expectations</p>
        <p>-Worked to create a positive and exciting experience 
          for both customers and peers</p>
        <p>-Selected as a Store Mentor to to train a team of 
          sales specialists in company culture, creating 
          customer experiences, and individual competency 
          development </p>
        <p>-Recognized as an All-Star and awarded the 2009 
          Essence of Apple Culture Certificate</p>
          </div>
          </div>
          </div>
          </div>
          </div>
          
          );
          }
          }
          
class Club extends React.Component {
  render() {
    return (
        <div className="accordion-fluid">
          <div className="card border-light">
            <div className="card-header">
             <button className="btn-fluid btn-danger" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
          <h2><b>Volvo Car Club Organization</b></h2>
        </button>
        <div id="collapseThree" className="collapse show" aria-labelledby="headingThree" data-parent="#accordion">
              <div className="card-body">
                <b> P1 Nation Volvo Club </b>
                <p>-Founder of National Volvo Car Club, P1 Nation</p>
                <p>
                  -Chief Organizer for the Annual Volvo Automotive Enthusiast
                  Event
                </p>
                <p>
                  -Designed apparel, event material, and sourced promotional
                  products from sponsors
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
    )
  }
}

class Main extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <Header />
        <hr />
        <Body />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));


