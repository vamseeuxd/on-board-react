import React, {Component} from 'react';
import {Card, CardBody, Col, Row} from "reactstrap";
import GaugeChart from 'react-gauge-chart';
import "./Bureau.scss";

class Bureau extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {}
  }

  render() {
    return (
      <div className="animated fadeIn bureau">
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody className="card-body">
                <div className="col-md-6 offset-md-3">
                  <GaugeChart id="gauge-chart5"
                              nrOfLevels={420}
                              arcsLength={[0.4, 0.15, 0.15, 0.15, 0.15]}
                              colors={['#5BE12C', '#F5CD19', '#EA4228', '#5BE12C', '#F5CD19', '#EA4228']}
                              percent={0.812}
                              arcPadding={0.02}
                  />
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
