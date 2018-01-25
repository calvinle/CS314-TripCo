class App extends React.Component {
  render() {
    return (
      <div>
        <div className="jumbotron">
          <Header />
        </div>
        
        <div className="card text-white bg-info mb-3">
          <Summary/>
        </div>
        
        <div className="card text-white bg-info mb-3">
          <Edu/>
        </div>
        
        <div className="card text-white bg-info mb-3">
          <Skills/>
        </div>
        
        <div className="card text-white bg-info mb-3">
          <History/>
        </div>
        
        <div className="card text-white bg-info mb-3">
          <Awards/>
        </div>
        
       </div>
         )
        }
      }

class Header extends React.Component{
  render() {
    return (
      <div>
        <h1><center>Calvin Michael Le</center></h1>
        <p><center>calvin.md.le@gmail.com | www.linkedin.com/in/calvinle2015</center></p>
        </div>

    )
  }
}

class Summary extends React.Component {
  render() {
    return (
        <center><div id="summary">
          <h2 className="card-header"><center>Summary</center></h2>
            <div className="card-body">
             <p>3rd Year Computer Science Major at Colorado State University, Fort Collins, presenting leadership and teamwork in various work environments.</p>
          </div>
        </div>
       </center>
        )
       }
      }
        
class Edu extends React.Component {
  render() {
    return (
        <center><div id="edu">
         <h2 className="card-header"><center>Education</center></h2>
          <div className="card-body">
     
          <p>2015 – Present: Colorado State University – Fort Collins, CO <br/>
				•Computer Science Major <br/>
        •Current GPA: 2.90
         </p>
         <p>2011 - 2015: Moorpark High School - Moorpark, CA <br/>
       	• Graduation Weighted GPA: 3.646 <br/>
      • AP Scholar – Scores of 3 on three Advance Placement Exams 
          </p>
        </div>
       </div>
      </center>
      )
     }
    }
 
class Skills extends React.Component {
  render() {
    return (
        <center><div id="skills">
          <h2 className="card-header"><center>Highlights & Skills</center></h2>
          <div className="card-body">
          • Windows & Microsoft Office Proficiency, Typing Speed of 100+ WPM <br/>
          • Computer Languages: Java, C, Python, C++, Assembly, & Lua. <br/>
          • Ongoing Project: Creating custom battles for the Indie game Undertale (Lua) <br/>
          • Project and team organization <br/>
          • Customer Service and Sale Transactions <br/>
          • Created application to calculate macronutrients.
        </div>
       </div>
      </center>
      )
  }
}
        
class History extends React.Component {
  render() {
    return (
        <center><div id="work">
          <h2 className="card-header"><center>Work History</center></h2>
          <div className="card-body">
          
   • 10/2015 - Present: Student Set Up
            Lory Student Center – Fort Collins, CO <br/>
            • 07/2012 - 07/2014	Desk Receptionist
Milan Nail Spa - Moorpark, CA 
        </div>
       </div>
      </center>
      )
  }
          }
 
class Awards extends React.Component {
  render() {
    return (
        <center><div id="award">
          <h2 className="card-header"><center>Accomplishments & Awards</center></h2>
          <div className="card-body">
• Eagle Scout: Successfully coordinated an $1,100 Eagle Project and earned 40 Merit Badges <br/>
• Graduate of the National Youth Leadership Training in Ventura County (2013) <br/>
• Medalist in Academic Decathlon for Economics, Essay, Music, and Math (2013-2015) <br/>
• CO Student Grant, CSU Tuition Assistance, and Federal Pell Grant - $12,600. <br/>
        </div>
       </div>
      </center>
    )
  }
}


ReactDOM.render(<App />, document.getElementById("root"));