import React, { Component } from 'react';
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row, Table} from 'reactstrap';
import SearchAppjson from "../../assets/data/SearchApps.json";
import FormModel from '../Customers/components/FormModel';
import CreateTable from './CreateTable';
import axios from "axios";

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      SearchAppJson: SearchAppjson,
      jsonValues: {},
      searchTable: [],
      redirect: false
    };
    this.columnLabels = [];
    this.columnIds = [];
    this.tableLabel = "";
    this.searchStrings = {};
    this.searchTypes = {};
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  isInteger = (val)=>{
    var digits="1234567890";
    for (var i=0; i < val.length; i++) {
      if (digits.indexOf(val.charAt(i))==-1) { return false; }
      }
    return true;
  }

  onChangeHandler = function (e) {
    e.persist();
    this.state.jsonValues[e.target.id] = e.target.value;
  };

  searchHandler = () => {
    let searchValue = this.state.jsonValues["searchValue"];
    let searchCriteria = this.state.jsonValues["searchCriteria"];
    let searchCondition = this.state.jsonValues["searchCondition"];
    if(searchCondition==null || typeof searchCondition =='undefined'){
      searchCondition = "=";
    }

    if(searchCriteria==null || typeof searchCriteria =='undefined'){
      searchCriteria = "_id";
    }else{
      searchCriteria = this.searchStrings[searchCriteria];
    }
    let isInteger = false;//this.isInteger(searchValue);
    
    if(this.searchTypes[searchCriteria]=='number'){
      isInteger = true;
    }

    let postData = {
      searchValue: searchValue,
      searchCondition:searchCondition,
      searchCriteria:searchCriteria,
      columnIds: this.columnIds,
      isInteger: isInteger
    };
    axios
      .post("/searchAppData", postData)
      .then((response) => {
        if(response.data.status){
          this.renderTable(response.data.data);
        }else{
          alert(response.data.message);
        } 
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderTable = (data) => {
    let arr = [];
    arr.push(
      <CreateTable
        columnLabels={this.columnLabels}
        columnIds={this.columnIds}
        data={data}
        tableLabel={this.tableLabel}
      />
    );

    this.state["searchTable"].push(arr);
    this.setState({ ["searchTable"]: arr });
  };

  render() {
    let items = [];
    let sectionList = SearchAppjson.sectionList;
    this.searchStrings = SearchAppjson.searchStrings;
    this.searchTypes  = SearchAppjson.searchTypes;
    this.columnLabels = [];
    Object.keys(sectionList).map((sectionIndex, index) => {
      let section = sectionList[index];
      if (typeof section.isSearch != "undefined" && section.isSearch) {
        items.push(<label>{section.sectionName}</label>);
        items.push(
          <FormModel
            data={section.fields}
            uniqueId = ""
            searchHandler={this.searchHandler}
            changed={this.onChangeHandler}
          />
        );
      }
      if (typeof section.isTable != "undefined" && section.isTable) {
        this.columnLabels = section.ColumnLabels;
        this.columnIds = section.ColumnIds;
        this.tableLabel = section.sectionName;
        items.push(
          <div contentEditable='true' id='searchTable'>
            {this.state["searchTable"]}
          </div>
        );
      }
    });
    return (
      <div >
        <div >{items}</div>  
                 
    </div> 
      /*<div className="animated fadeIn">
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
      </div>*/
    )
  }
}

export default Search;
