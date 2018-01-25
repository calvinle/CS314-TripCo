class Main extends React.Component {
  render() {
    return (
      <div>
        <div className="jumbotron">
          <Header/>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12, col-sm-12, col-md-12, col-lg-12, col-xl-12">
              <Objective/>
            </div>
          </div>
          <div className="row">
            <div className = "col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
              <div className="card">
                <WorkExperience/>
             </div>
            </div>
            <div className = "col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
              <div className="card">
                <Skills/>
             </div>
            </div>
            <div className = "col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
              <div className="card">
                <Education/>
             </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

class Header extends React.Component{
  render() {
    return (
      <div>  
      <h1>Joshua Henry<small> CS Student</small></h1>
        <p className="lead">507 S Grant Ave <br/>Fort Collins, CO 80521<br/>720-290-8167</p>
      </div>
    )
  }
}
class Objective extends React.Component {
  render() {
    return (
      <div>
        <h1>Objective</h1>
        <p className="lead">To become a competent programmer in order to secure a job in the gaming or achitectural industry in the future</p>
      </div>
    )
  }
}

class WorkExperience extends React.Component{
  render(){
    return(
      <div>
        <div className="card-header bg-dark text-white">
                  Work Experience
                </div>
                <div className="card-body bg-secondary">
                  <ul>
                    <li>Orange Leaf Frozen Yogurt Team Member, 2012-2013</li>
                    <li>Noodles & Company Shift Manager, 2013-Present</li>
                    <ul>
                      <li>Lead and manage a team</li>
                      <li>Safe Food Preparation</li>
                      <li>Customer Service, Handling Money, etc.</li>
                      <li>Primary trainer for new team members</li>
                      <li>Trained outside hire management at an accelerated rate</li>
                    </ul>
                    <li>Managed a kitchen team for a summer camp, 2016</li>
                    <ul><li>Feeding 200 people a week, 16 meals</li></ul>
                  </ul>
                </div>
      </div>
    )
  }
}
class Skills extends React.Component{
  render(){
    return(
      <div>
        <div className="card-header bg-dark text-white">
                  Skills
                </div>
                <div className="card-body bg-secondary">
                  <ul>
              <li>Programming</li>
              <ul>
                <li>Java</li>
                <li>Python</li>
                <li>C</li>
                <li>C++</li>
              </ul>
              <li>Management and Delegation (see work exp.)</li>
              <li>3D Modeling</li>
              <li>Unreal Engine</li>
              <li>Substance Painter</li>
              <li>Architectural Visualization</li>
            </ul>
                </div>
      </div>
    )
  }
}
class Education extends React.Component{
  render(){
    return(
      <div>
        <div className="card-header bg-dark text-white">
                  Education
                </div>
                <div className="card-body bg-secondary">
                  <ul>
              <li>Graduated Chaparral High School 2015, 34 ACT, 3.26 GPA</li>
              <li>Currently Enrolled CSU Student, Computer Science, 3.08 GPA</li>
            </ul>
                </div>
      </div>
    )
  }
}

ReactDOM.render(<Main/>, document.getElementById("root"));
