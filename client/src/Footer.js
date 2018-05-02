import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardGroup, CardLink,
    CardTitle, CardSubtitle, Modal, Button, ModalHeader, ModalBody,
    ModalFooter, InputGroup, Input, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';

/* Renders a text footer below the application with copyright
 * and other useful information.
 */
class Footer extends Component {
  constructor(props) {
    super(props);
      this.state = {
          settingsModalOpen: false
      };
      this.toggle = this.toggle.bind(this);
  }

    toggle() {
        this.setState({
            settingsModalOpen: !this.state.settingsModalOpen
        });
    }

  render() {
    return (
        <div className="footer-wrapper mk-grid">
            <div className="mk-padding-wrapper">
                <div id="footer">
                    <div className=" mk-grid">
                        <span className="mk-footer-copyright">
                            <div className="flexbox-footer">
                                <div className="flexbox-footer-left">
                                    <div className="flexbox-footer-left-top">
                                        <BreadcrumbItem id={"bColor"} onClick={this.toggle}>
                                            About the developers
                                        </BreadcrumbItem>
                                        <Modal id ="myModal" isOpen={this.state.settingsModalOpen} toggle={this.toggle}>
                                            <ModalHeader toggle={this.toggle}>About the developers</ModalHeader>
                                            <ModalBody>
                                                <CardGroup>
                                                    <Card>
                                                        <CardImg top width="100%" src="http://www.cs.colostate.edu/~tomcavey/tom1.jpeg" alt="Card image cap" />
                                                        <CardBody>
                                                            <CardTitle>Tom Cavey</CardTitle>
                                                            <CardSubtitle>tcavey@me.com</CardSubtitle><br></br>
                                                            <CardText size="small">Tom strives to foster a team culture focused on development, teamwork, and enthusiasm for learning.<br></br><br></br>
                                                                After working at the Genius Bar in numerous Apple Retail locations, he decided to further his education by studying Computer Science at Colorado State University.<br></br><br></br>
                                                                Tom is currently working on a personal project with his car- including sequential LEDs for brake lights with an in-car interface for controlling them.<br></br><br></br>
                                                                Check it out on GitHub below.
                                                            </CardText>
                                                            <CardLink href="http://www.cs.colostate.edu/~tomcavey/">Resume</CardLink>
                                                            <CardLink href="https://github.com/tc30/Volvo-C30-Sequential-LEDs">GitHub</CardLink>
                                                        </CardBody>
                                                    </Card>
                                                    <Card>
                                                        <CardImg top width="100%" src="http://www.cs.colostate.edu/~calvinle/calvin.jpg" alt="Card image cap" />
                                                        <CardBody>
                                                            <CardTitle>Calvin Michael Le</CardTitle>
                                                            <CardSubtitle>calvin.md.le@gmail.com</CardSubtitle><br/>
                                                            <CardText size={"small"}>Calvin lived in Los Angeles, California for most of his life before moving to Fort Collins for school, studying Computer Science.
                                                                His main interests in the field include Virtual Reality, machine learning, and big data.
                                                                His other hobbies include competitive weightlifting, dancing, and video games every now and then.
                                                            </CardText>
                                                            <CardLink href="http://www.cs.colostate.edu/~calvinle/index.html">Resume</CardLink>
                                                        </CardBody>
                                                    </Card>
                                                    <Card>
                                                        <CardImg top width="100%" src="http://www.cs.colostate.edu/~wschoon/me.JPG" alt="Card image cap" />
                                                        <CardBody>
                                                            <CardTitle>Charlie Schoonover</CardTitle>
                                                            <CardSubtitle>wcschoonover@gmail.com</CardSubtitle>
                                                            <CardText>Charlie is a software engineer at New Century Software. He enjoys movies, video games, snowboarding, and solving problems with a team.</CardText>
                                                            <CardLink href="http://www.cs.colostate.edu/~wschoon/">Resume</CardLink>
                                                        </CardBody>
                                                    </Card>
                                                    <Card>
                                                        <CardImg top width="100%" src="http://www.cs.colostate.edu/~henryjb9/html.jpg" alt="Card image cap" />
                                                        <CardBody>
                                                            <CardTitle>Josh Henry</CardTitle>
                                                            <CardSubtitle>josh.b.henry@gmail.com</CardSubtitle>
                                                            <CardText>Josh is a 3rd year Computer Science Student at Colorado
                                                                State. He has been learning code since high school.
                                                                He likes music, movies, and biking. CS314 has created an interest
                                                                for him in both web development and software development
                                                                <br/><br/>
                                                                Josh has always been fascinated by games and games development. His dream job has always been to work at Valve Software in Seattle, which he toured Winter of 2018.
                                                                However, during that time he became interested in both VR development and Architectural Visualization. He is exploring these hobbies all the time.</CardText>
                                                            <CardLink href="http://www.cs.colostate.edu/~henryjb9/">Resume</CardLink>
                                                        </CardBody>
                                                    </Card>
                                                </CardGroup>
                                                <hr />
                                            </ModalBody>
                                            <ModalFooter>
                                            </ModalFooter>
                                        </Modal>

                                    </div>
                                    <div className="flexbox-footer-left-bottom">
                                        <p>Welcome to Our Trip Planner  © TripCo t{this.props.number}, {this.props.name}, 2018</p>
                                    </div>
                                </div>
                                <div className="flexbox-footer-right">
                                    <a href="http://www.colostate.edu/">
                                        <img src="http://www.cs.colostate.edu/~cs314/images/CSU-Official-wrdmrk-357-617_Rev.png" alt="Colorado State University" id={"footerIMG"}/>
                                    </a>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>








        // <div id="footer" style={{"backgroundColor": "#1E4D2B", "color":"white"}}>
        //   {<img src={"http://www.cs.colostate.edu/~cs314/images/CSU-Official-wrdmrk-357-617_Rev.png"}/> }
        //     <p />
        //     <Button align="middle" color="link" onClick={this.toggle}>
        //         About the developers
        //     </Button>
        //       Welcome to Our Trip Planner  © TripCo t{this.props.number}, {this.props.name}, 2018
        //     <Modal id ="myModal" isOpen={this.state.settingsModalOpen} toggle={this.toggle}>
        //         <ModalHeader toggle={this.toggle}>About the developers</ModalHeader>
        //         <ModalBody>
        //
        //
        //             <CardGroup>
        //                 <Card>
        //                     <CardImg top width="100%" src="http://www.cs.colostate.edu/~tomcavey/tom1.jpeg" alt="Card image cap" />
        //                     <CardBody>
        //                         <CardTitle>Tom Cavey</CardTitle>
        //                         <CardSubtitle>tcavey@me.com</CardSubtitle><br></br>
        //                         <CardText size="small">Tom strives to foster a team culture focused on development, teamwork, and enthusiasm for learning.<br></br><br></br>
        //                             After working at the Genius Bar in numerous Apple Retail locations, he decided to further his education by studying Computer Science at Colorado State University.<br></br><br></br>
        //                             Tom is currently working on a personal project with his car- including sequential LEDs for brake lights with an in-car interface for controlling them.<br></br><br></br>
        //                             Check it out on GitHub below.
        //                         </CardText>
        //                         <CardLink href="http://www.cs.colostate.edu/~tomcavey/">Resume</CardLink>
        //                         <CardLink href="https://github.com/tc30/Volvo-C30-Sequential-LEDs">GitHub</CardLink>
        //                     </CardBody>
        //                 </Card>
        //                 <Card>
        //                     <CardImg top width="100%" src="http://www.cs.colostate.edu/~calvinle/calvin.jpg" alt="Card image cap" />
        //                     <CardBody>
        //                         <CardTitle>Calvin Michael Le</CardTitle>
        //                         <CardSubtitle>calvin.md.le@gmail.com</CardSubtitle><br/>
        //                         <CardText size={"small"}>Calvin lived in Los Angeles, California for most of his life before moving to Fort Collins for school, studying Computer Science.
        //                             His main interests in the field include Virtual Reality, machine learning, and big data.
        //                             His other hobbies include competitive weightlifting, dancing, and video games every now and then.
        //                            </CardText>
        //                         <CardLink href="http://www.cs.colostate.edu/~calvinle/index.html">Resume</CardLink>
        //                     </CardBody>
        //                 </Card>
        //                 <Card>
        //                     <CardImg top width="100%" src="http://www.cs.colostate.edu/~wschoon/me.JPG" alt="Card image cap" />
        //                     <CardBody>
        //                         <CardTitle>Charlie Schoonover</CardTitle>
        //                         <CardSubtitle>wcschoonover@gmail.com</CardSubtitle>
        //                         <CardText>Charlie is a software engineer at New Century Software. He enjoys movies, video games, snowboarding, and solving problems with a team.</CardText>
        //                         <CardLink href="http://www.cs.colostate.edu/~wschoon/">Resume</CardLink>
        //                     </CardBody>
        //                 </Card>
        //                 <Card>
        //                     <CardImg top width="100%" src="http://www.cs.colostate.edu/~henryjb9/html.jpg" alt="Card image cap" />
        //                     <CardBody>
        //                         <CardTitle>Josh Henry</CardTitle>
        //                         <CardSubtitle>josh.b.henry@gmail.com</CardSubtitle>
        //                         <CardText>Josh is a 3rd year Computer Science Student at Colorado
        //                             State. He has been learning code since high school.
        //                             He likes music, movies, and biking. CS314 has created an interest
        //                             for him in both web development and software development
        //                         <br/><br/>
        //                         Josh has always been fascinated by games and games development. His dream job has always been to work at Valve Software in Seattle, which he toured Winter of 2018.
        //                         However, during that time he became interested in both VR development and Architectural Visualization. He is exploring these hobbies all the time.</CardText>
        //                         <CardLink href="http://www.cs.colostate.edu/~henryjb9/">Resume</CardLink>
        //                     </CardBody>
        //                 </Card>
        //             </CardGroup>
        //
        //
        //             <hr />
        //         </ModalBody>
        //         <ModalFooter>
        //         </ModalFooter>
        //     </Modal>
        //
        // </div>
    )
  }
}

export default Footer;
