import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import customersData from './CustomersData'

function CustomerRow(props) {
  const customer = props.customer
  const customerLink = `/customers/${customer.id}`

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }

  return (
    <tr key={customer.id.toString()}>
      <th scope="row"><Link to={customerLink}>{customer.id}</Link></th>
      <td><Link to={customerLink}>{customer.name}</Link></td>
      <td>{customer.registered}</td>
      <td>{customer.role}</td>
      <td><Link to={customerLink}><Badge color={getBadge(customer.status)}>{customer.status}</Badge></Link></td>
    </tr>
  )
}

class Customers extends Component {

  render() {

    const customerList = customersData.filter((customer) => customer.id < 10)

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Customers <small className="text-muted">example</small>
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
                    {customerList.map((customer, index) =>
                      <CustomerRow key={index} customer={customer}/>
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

export default Customers;
