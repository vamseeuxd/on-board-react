import React, {Component} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {verifyGoogleLogin} from "../../../store/authentication/acions";
import GoogleLogin from 'react-google-login';

class Register extends Component {
  render() {
    const props = this.props;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9"
                 lg="7"
                 xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>
                      Register
                      <Link to="/login">
                        <button className="btn btn-link float-right">Back To Login</button>
                        <div className="clearfix"></div>
                      </Link>
                    </h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                             placeholder="Username"
                             autoComplete="username"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                       <select>
                         <option>Select Role</option>
                         <option>RM</option>
                         <option>UnderWriter</option>
                         <option>BasicUser</option>
                         <option>Admin</option>
                       </select>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                             placeholder="Email"
                             autoComplete="email"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password"
                             placeholder="Password"
                             autoComplete="new-password"/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password"
                             placeholder="Repeat password"
                             autoComplete="new-password"/>
                    </InputGroup>
                    <Button color="success"
                            block>Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12"
                         sm="6">
                      <GoogleLogin
                        clientId="1020592783279-dib7nfhpbecp4gluf277pkj072shfqaj.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        theme="dark"
                        onSuccess={googleLoginResponse => props.verifyGoogleLogin(googleLoginResponse, props.history)}
                        cookiePolicy={'single_host_origin'}
                      />
                    </Col>
                    {/*<Col xs="12"
                         sm="6">
                      <Button className="btn-twitter mb-1"
                              block><span>TWITTER</span></Button>
                    </Col>*/}
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => ({
  verifyGoogleLogin: (googleLoginResponse, history) => dispatch(verifyGoogleLogin(googleLoginResponse, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
