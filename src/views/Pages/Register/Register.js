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

  constructor(props, context) {
    super(props, context);
    this.state = {
      form: {
        username: '123ASD',
        role: 'RM',
        email: '',
        password: '',
        repeatPassword: '',
      }
    }
    this.updateFormValue = this.updateFormValue.bind(this);
    this.getRolesOptions = this.getRolesOptions.bind(this);
  }

  getRolesOptions() {
    return this.props.rolesList.map(role => <option value={Object.keys(role)[0]}
                                                    key={Object.keys(role)[0]}>{Object.keys(role)[0]}</option>)
  }

  updateFormValue(controlName, controlValue) {
    const form = this.state.form;
    form[controlName] = controlValue;
    this.setState({form});
  }

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
                             onChange={(event) => this.updateFormValue(event.target.id, event.target.value)}
                             id="username"
                             defaultValue={this.state.form.username}
                             placeholder="Username"
                             autoComplete="off"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-shield"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="select"
                             onChange={(event) => this.updateFormValue(event.target.id, event.target.value)}
                             id="role"
                             defaultValue={this.state.form.role}
                             autoComplete="off"
                             name="select">
                        <option value="">Select Role</option>
                        {this.getRolesOptions()}
                      </Input>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                             onChange={(event) => this.updateFormValue(event.target.id, event.target.value)}
                             id="email"
                             defaultValue={this.state.form.email}
                             placeholder="Email"
                             autoComplete="off"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password"
                             onChange={(event) => this.updateFormValue(event.target.id, event.target.value)}
                             id="password"
                             defaultValue={this.state.form.password}
                             placeholder="Password"
                             autoComplete="off"/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password"
                             onChange={(event) => this.updateFormValue(event.target.id, event.target.value)}
                             id="repeatPassword"
                             defaultValue={this.state.form.repeatPassword}
                             placeholder="Repeat password"
                             autoComplete="off"/>
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
    isAuthenticated: state.authentication.isAuthenticated,
    rolesList: state.role.rolesList,
  };
}

const mapDispatchToProps = dispatch => ({
  verifyGoogleLogin: (googleLoginResponse, history) => dispatch(verifyGoogleLogin(googleLoginResponse, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
