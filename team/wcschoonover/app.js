class Body extends React.Component {
	render() {
		return (
			<div className="container">
				<div className="jumbotron">
					<h1 className="display-4">William "Charlie" Schoonover</h1>
					<hr className="my-4" />
					<div className="row">
						<div className="col-sm-12 col-md-6 col-lg-6">
							github.com/wcschoonover
						</div>
						<div className="col-sm-12 col-md-6 col-lg-6">
							wcschoonover@gmail.com
						</div>
					</div>
				</div>
				<h2 className="text-center">Attributes</h2>
				<div className="row">
					<div className="col-sm-12 col-md-4 col-lg-4">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title text-center">Programming Languages</h5>
								<p className="card-text">Java, C, C++, Python, Javascript, Node.js, MySQL</p>
							</div>
						</div>
					</div>
					<div className="col-sm-12 col-md-4 col-lg-4">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title text-center">Software and Frameworks</h5>
								<p className="card-text">Git, Subversion, Jira, VSTS, FogBugz, TestTrack Pro, ESRI Web App Builder, Django</p>
							</div>
						</div>
					</div>
					<div className="col-sm-12 col-md-4 col-lg-4">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title text-center">Personal Strengths</h5>
								<p className="card-text">Communication, peer development,</p>
							</div>
						</div>
					</div>
				</div>
				<br />
				<h2 className="text-center">Work Experience</h2>
				<h5>Quality Assurance Analyst, New Century Software; Apr. 2017 - Present</h5>
				Fort Collins, CO
				<p>
					<ul>
						<li>Test data management software for the Oil and Gas Pipeline industry.</li>
						<li>Refine, add, and implement macros using VBA in Excel spreadsheet test plans.</li>
						<li>Research, implement, and document various automated testing methods.</li>
						<li>Develop web widgets using Esri's Web AppBuilder.</li>
						<li>Test coworker contributions to web widgets.</li>
					</ul>
				</p>
				<br />
				<h5>Project Coordinator, Bounce Software; Jan. 2017 - Apr. 2017</h5>
				Fort Collins, CO
				<p>
					<ul>
						<li>Manage day-to-day client priorities, requests, and timelines across multiple projects.</li>
						<li>Coordinate with the team to ensure projects are completed on time and to our clients' satisfaction.</li>
						<li>Implement and monitor project controls to ensure improved communication with customers.</li>
						<li>Develop Standard Operating Procedures governing the software development cycle.</li>
						<li>Create and implement risk analysis procedures.</li>
						<li>Point of contact for third party companies regarding project management systems, software security auditing, and support systems.</li>
					</ul>
				</p>
				<br />
				<h5>Software Engineer, Bounce Software; Oct. 2016 - Apr. 2017</h5>
				Fort Collins, CO
				<p>
					<ul>
						<li>Work directly with clients to develop new features to existing software, or expand project scope to meet their unique challenges.</li>
						<li>Develop along the full life cycle, including design, development, and testing, to translate clients' tasks into functional, reliable, and scalable software.</li>
						<li>Collaborate regularly with clients to review, test, discuss, support, and adjust solutions for product launches.</li>
						<li>Create and implement security auditing procedures for software development ensuring compliance with client requirements.</li>
					</ul>
				</p>
				<br />
				<h5>Sales / Warehouse Associate, Best Buy; May 2015 - Oct. 2016</h5>
				Loveland, CO
				<p>
					<ul>
						<li>Research and sell Apple and Windows computers, software, and accessories to customers.</li>
						<li>Awarded MVP in July 2916 for producing over $130K in sales, exceeding revenue goals by 22.65%.</li>
						<li>Kept consistent pace and growth from second month onward, exceeding individual monthly revenue goal by 34.44% for the month of August.</li>
						<li>Ensured compliance with corporate guidelines regarding look, feel, and security of warehouse.</li>
						<li>Assisted customers with product questions and sales.</li>
						<li>Awarded MVP for November 2015.</li>
					</ul>
				</p>
				<br />
				<h5>Operator, Solix Algredients; Sept. 2013 - Feb. 2015</h5>
				Fort Collins, CO
				<p>
					<ul>
						<li>Built and maintained algae growth systems for research and development teams.</li>
						<li>Assisted Biologists and Engineers with the operation and record keeping of developmental algal growth systems.</li>
						<li>Performed on-call duties every weekend to ensure continuous function of algal systems and integrity of facility security.</li>
					</ul>
				</p>
				<br />
				<h5>PC and Systems Pod Lead, 2K Games; Mar. 2013 - July 2013</h5>
				Las Vegas, NV
				<p>
					<ul>
						<li>Performed database management to catalog software bugs in AAA title video games.</li>
						<li>Relayed critical information regarding game performance and bugs to management, developers, and producers.</li>
						<li>Led a team of testers specializing in PC and System functionality and security.</li>
						<li>Assisted in leading a team of 12 testers, focusing on communication and collaboration.</li>
						<li>Served as point of contact for internal and external support teams regarding PC testing and performance.</li>
						<li>Streamlined the project testing plan to ensure timely and complete testing.</li>
					</ul>
				</p>
				<br />
				<h5>Temporary Quality Assurance Tester, 2K Games; Nov. 2011 - Nov. 2012</h5>
				Los Angeles, CA
				<p>
					<ul>
						<li>Tested and accurately reported software bugs in AAA title video games including Bioshock Infinite (2013 Game of the Year and winner of 71 awards) and Borderlands 2 (D.I.C.E. Action Game of the Year 2013).</li>
						<li>Relayed critical information regarding game performance and bugs to management, developers, and producers.</li>
						<li>Top bug reporter for Bioshock Infinite, and in the Top 5 for number and quality of bug reports for Borderlands 2.</li>
					</ul>
				</p>
				<br />
				<h2 className="text-center">Education</h2>
				<h5 className="text-center">Colorado State University, Fort Collins, Colorado</h5>
				<p className="text-center">Bachelor of Science in Computer Science, August 2018</p>
			</div>
		)
	}
}
			
class Main extends React.Component {
	render () {
		return (
			<Body />
		);
	}
}
			
ReactDOM.render(<Main />, document.getElementById("root"));