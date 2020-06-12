import React, { Component } from 'react';
import { Card, CardBody, Col, Row } from "reactstrap";
import GaugeChart from 'react-gauge-chart';
import "./Bureau.scss";
import bureauReport from "../../assets/data/BureauReport.json";
import jsonSchemaGenerator from "json-schema-generator";
import * as jsonSchema from "json-schema-defaults";
import Instantiator from "json-schema-default-instance";
import JSONSchemaForm from "@rjsf/core";
import JSONTree from 'react-json-tree';

class Bureau extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {}
  }

  updateStyles() {
    Array.from(document.getElementById('json-report-view').getElementsByTagName('ul')).forEach(d => {
      d.classList.add('list-group');
      d.classList.add('m-3')
    });

    Array.from(document.getElementById('json-report-view').getElementsByTagName('li')).forEach(d => {
      d.classList.add('list-group-item');
      d.classList.add('mt-1');
    });

    Array.from(document.getElementById('json-report-view').getElementsByTagName('span')).forEach(d => {
      console.log(d.innerText);
    });

    Array.from(document.getElementById('json-report-view').getElementsByTagName('label')).forEach(d => {
      d.innerText = d.innerText.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")
    });
  }

  render() {

    const Form = JSONSchemaForm;
    const formSchema = jsonSchemaGenerator(bureauReport);
    setTimeout(this.updateStyles, 500);

    return (

      <div className="animated fadeIn bureau">
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody className="card-body">
                <div className="row">
                  <div className="col-6">
                    <GaugeChart id="gauge-chart5"
                      nrOfLevels={420}
                      arcsLength={[0.4, 0.15, 0.15, 0.15, 0.15]}
                      colors={['#5BE12C', '#F5CD19', '#EA4228', '#5BE12C', '#F5CD19', '#EA4228']}
                      percent={0.812}
                      arcPadding={0.02}
                    />
                  </div>

                  <div className="col-6">
                    <h6 className="ml-5 mt-5 text-success">5 pts</h6>
                    <h1 className="ml-5 mt-2 text-primary">812</h1>
                    <h5 className="ml-5 mt-2 text-success">Excellent</h5>
                    <h6 className="ml-5 mt-2 text-muted">TRANSUNION</h6>
                    <h6 className="ml-5 mt-2 text-muted">Updated dally</h6>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            <Card>
              <CardBody className="card-body" style={{ overflow: 'auto' }}>
                {/* <pre>{JSON.stringify(formSchema,null,2)}</pre>  */}
                {/* <Form schema={formSchema}/> */}
                <div className="json-report-view" id="json-report-view" onClick={()=>setTimeout(this.updateStyles, 0)}>
                  <JSONTree hideRoot={true} data={bureauReport} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>


      </div>
    )
  }
}

export default Bureau;
