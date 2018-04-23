import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardGroup, CardLink,
    CardTitle, CardSubtitle, Modal, Button, ModalHeader, ModalBody,
    ModalFooter, InputGroup, Input, Row, Col } from 'reactstrap';

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
        <div id="footer" className="jumbotron" style={{"backgroundColor": "#1E4D2B", "color":"white"}}>
          {<img src={"http://www.cs.colostate.edu/~cs314/images/CSU-Official-wrdmrk-357-617_Rev.png"}/> }
          <h5 align="middle">

            <Button align="middle" color="link" onClick={this.toggle}>
                About the developers
            </Button>
              Welcome to Our Trip Planner  © TripCo t{this.props.number}, {this.props.name}, 2018
          </h5>
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
                                    Tom is currently working on a personal project with his car- including sequential LEDs for brake lights an an in-car interface for controlling them.<br></br><br></br>
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
                                    <br/><br/>
                                    Calvin started dancing in middle school as a hobby, where he watched frame-by-frame recordings of live performances from Michael Jackson.
                                    He has performed in many public events in his home county before taking up freestyle popping.
                                    His early years of dancing built the foundation for his style in dancing today.
                                    <br/><br/>
                                    In 2016, Calvin decided to take up weightlifting in pursuit of a healthier lifestyle.
                                    Since then, he has taken it to higher levels and aspires to reach the 1000 lbs. club, where the Deadlift, Bench Press, and Squat lifts sum to 1000lbs.</CardText>
                                <CardLink href="#">Resume</CardLink>
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
                            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180" alt="Card image cap" />
                            <CardBody>
                                <CardTitle>Name</CardTitle>
                                <CardSubtitle>contact info?</CardSubtitle>
                                <CardText>blah blah blah</CardText>
                                <CardLink href="#">Resume</CardLink>
                            </CardBody>
                        </Card>
                    </CardGroup>


                    <hr />
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </Modal>

        </div>
    )
  }
}

export default Footer;