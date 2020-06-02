import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import applicationsData from './ApplicationsData'

function ApplicationRow(props) {
  const application = props.application
  const applicationLink = `/manage-applications/${application.id}`

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }

  return (
    <tr key={application.id.toString()}>
      <th scope="row"><Link to={applicationLink}>{application.id}</Link></th>
      <td><Link to={applicationLink}>{application.name}</Link></td>
      <td>{application.registered}</td>
      <td>{application.role}</td>
      <td><Link to={applicationLink}><Badge color={getBadge(application.status)}>{application.status}</Badge></Link></td>
    </tr>
  )
}

class Applications extends Component {

  render() {

    const applicationList = applicationsData.filter((application) => application.id < 10)

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Applications <small className="text-muted">example</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">name</th>
                      <th scope="col">registered</th>
                      <th scope="col">role</th>
                      <th scope="col">status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicationList.map((application, index) =>
                      <ApplicationRow key={index} application={application}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Applications;
