import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';


const resptable ={
    width: '80%',
    display: 'table'
}
 const resptableheader={
    display: 'table-header-group',
    backgroundColor: 'gray',
    fontWeight: 'bold',
    fontize: 25
}
const tableheadercell = {
    display: 'table-cell',
    padding: 10,
    textAlign: 'center',
    borderBottom: '1 solid black'
}
const resptablebody = {
    display: 'table-row-group'
}
  const resptablerow = {
    display: 'table-row'
}
const tablebodycell = {
    display: 'table-cell',
    textAlign: 'center'
}

const customStyles = {
    content : {
      top                   : '5%',
      left                  : '5%',
      right                 : 'auto',
      bottom                : 'auto',
      width: '90%',
      height: '90%'
    }
  };

class CreateTable extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        appId : 0,
        setIsOpen: false
      };     
    }
    renderHeader =(columnLabels)=>{    
        let items = [];
       

        items.push(<td><strong>App Id</strong></td>);
        Object.keys(columnLabels).map((columnIndex, index) => {
            items.push(<td><strong>{columnLabels[index]}</strong></td>);
        });   
        return items;
    }
    
    renderBody=(columnIds, data)=>{  
        let arr = [];
        Object.keys(data).map((dataIndex, index) => {
            let row = JSON.parse(data[index]);           
                arr.push(<tr key={index}>
                   <td> <a style={{cursor: 'pointer'}} href="#" onClick={()=>this.openDialog(row['appId'])}>
                        {row['appId']}
                    </a></td>
                    {this.getCells(columnIds,row)}
                </tr> );
          });
        return arr;
    }
    
    getCells=(columnIds,row)=>{
        let arr = [];
        Object.keys(columnIds).map((columnIndex, index) => {
            arr.push(<td>{row[columnIds[index]]}</td>);
        });
        return arr;
    } 
   

    render() {  
        let tableHeader = this.renderHeader (this.props.columnLabels);
        let tableBody = this.renderBody (this.props.columnIds, this.props.data);

        return (         
        <div className="animated fadeIn">
        <Row>
          <Col >
            <Card>
              <CardHeader>
              <strong><i className="icon-info pr-1"></i>Search Results</strong>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                  <thead><tr>{tableHeader}</tr> </thead>
                    <tbody>
                    {
                        tableBody
                      }
                    </tbody>
                  </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
        );
      }
}
export default CreateTable;