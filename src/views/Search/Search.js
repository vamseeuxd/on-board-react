import React, { Component } from 'react';
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row, Table} from 'reactstrap';

class Search extends Component {

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <h4>Search By</h4>
                <Form className="row">
                  <FormGroup className="col-md-3 offset-md-1">
                      <Input autoComplete="off" type="select" name="searchBy" id="searchBy" placeholder="Search By">
                        <option>App ID</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                        <option>Option 4</option>
                        <option>Option 5</option>
                      </Input>
                  </FormGroup>
                  <FormGroup className="col-md-3">
                      <Input autoComplete="off" type="select" name="condition" id="condition" placeholder="Select Condition">
                        <option>Greater Than</option>
                        <option>Less Than</option>
                        <option>Equal to</option>
                      </Input>
                  </FormGroup>
                  <FormGroup className="col-md-3">
                      <Input autoComplete="off" type="text" name="Search Value" id="searchBy" placeholder="Value" />
                  </FormGroup>
                  <div className="col-md-2"><Button type="button">Search</Button></div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Search;
