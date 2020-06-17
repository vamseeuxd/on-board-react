import React, {Component} from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
  Table,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import ReactPaginate from 'react-paginate';

function SearchRow(props) {
  const search = props.search
  const searchLink = `/search/${search.id}`

  return (
    <tr key={search.id.toString()}>
      <th scope="row">
        <button className="btn btn-link p-0 m-0"
                type="button"
                onClick={() => {
                  props.toggle(search);
                }}>{search.id}</button>
      </th>
      <td>{search.firstName}</td>
      <td>{search.lastName}</td>
      <td>{search.ssn}</td>
    </tr>
  )
}

class Search extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      modal: false,
      selectedSearchItem: null,
      searchBy: "firstName",
      searchCondition: "=",
      searchByValue: "",
      globalSearch: "",
      searches: [],
      masterSearchData: [],
      searchData: [],
      searchDetails: [],
      pageSize: 5,
      showPaginationDropdown: false,
      currentPage: 0,
    }
    this.getSearchPageData = this.getSearchPageData.bind(this);
    this.setSearchBy = this.setSearchBy.bind(this);
    this.setSearchCondition = this.setSearchCondition.bind(this);
    this.setSearchByValue = this.setSearchByValue.bind(this);
    this.applySearchByFilter = this.applySearchByFilter.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.togglePaginationDropdown = this.togglePaginationDropdown.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleGlobalSearch = this.handleGlobalSearch.bind(this);
    this.getSearchPageData();
  }

  getSearchPageData() {
    fetch('./assets/data/search-data.json')
      .then((res) => res.json())
      .then((searchData) => {
        /** -- Clone Search Data for future reference --
         *  -- this data should not applied with any filters, --
         *  -- on reset / clear filter this data will utilized --
         * */
        const masterSearchData = JSON.parse(JSON.stringify(searchData));
        this.setState({searchData, masterSearchData});
      });
  }

  toggleModal(selectedSearchItem) {
    this.setState({selectedSearchItem, modal: !this.state.modal});
  }

  togglePaginationDropdown(pageSize) {
    if (pageSize) {
      const pageCount = Math.ceil(this.state.searchData.length / pageSize);
      if (this.state.currentPage > (pageCount - 1)) {
        this.setState(
          {
            pageSize,
            currentPage: pageCount - 1,
            showPaginationDropdown: !this.state.showPaginationDropdown
          }
        );
      } else {
        this.setState({pageSize, showPaginationDropdown: !this.state.showPaginationDropdown});
      }
    } else {
      this.setState({showPaginationDropdown: !this.state.showPaginationDropdown});
    }
  }

  handlePageClick(data) {
    let selected = data.selected;
    this.setState({currentPage: data.selected});
  }

  handleGlobalSearch(event) {
    this.setState({searchByValue: ''});
    const globalSearch = event.target.value;
    this.setState({globalSearch});
    if (globalSearch.toString().trim().length > 0) {
      const searchData = this.state.masterSearchData.filter(data => {
        const keys = Object.keys(data);
        let isReferenceFound = false;
        keys.forEach(key => {
          if (data[key].toString().toLowerCase().indexOf(globalSearch.toString().toLowerCase()) >= 0) {
            isReferenceFound = true;
          }
        })
        return isReferenceFound;
      });
      this.setState({searchData});
    } else {
      const searchData = JSON.parse(JSON.stringify(this.state.masterSearchData));
      this.setState({searchData});
    }
  }

  setSearchBy(searchBy) {
    this.setState({searchBy, searchCondition: '=', searchByValue: ''});
  }

  setSearchCondition(searchCondition) {
    this.setState({searchCondition});
  }

  setSearchByValue(searchByValue) {
    if (this.state.searchBy === 'id' && this.state.searchByValue.trim().length > 0) {
      if (!isNaN(searchByValue)) {
        const convertedNumber = Number(searchByValue);
        this.setState({searchByValue});
      }
    } else {
      this.setState({searchByValue});
    }
  }

  applySearchByFilter() {
    this.setState({globalSearch: ''});
    if (this.state.searchByValue.toString().trim().length > 0) {
      const searchData = this.state.masterSearchData.filter(data => {
        switch (this.state.searchCondition) {
          case '=':
            if (this.state.searchBy != 'id') {
              return data[this.state.searchBy].toString().toLowerCase() === this.state.searchByValue.toLowerCase();
            } else {
              return data[this.state.searchBy] == this.state.searchByValue;
            }
            break;
          case '>':
            if (this.state.searchBy == 'id') {
              return data[this.state.searchBy] > this.state.searchByValue;
            } else {
              return false;
            }
            break;
          case '<':
            if (this.state.searchBy == 'id') {
              return data[this.state.searchBy] < this.state.searchByValue;
            } else {
              return false;
            }
            break;
          case '>=<':
            if (this.state.searchBy != 'id') {
              return data[this.state.searchBy].toString().toLowerCase().indexOf(this.state.searchByValue.toLowerCase()) >= 0;
            } else {
              return false;
            }
            break;
        }
      });
      this.setState({searchData});
    } else {
      const searchData = JSON.parse(JSON.stringify(this.state.masterSearchData));
      this.setState({searchData});
    }
  }

  render() {
    const pageCount = Math.ceil(this.state.searchData.length / this.state.pageSize);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <h4>Search By</h4>
                <Form className="row">
                  <FormGroup className="col-md-3 offset-md-1">
                    <Input autoComplete="off"
                           type="select"
                           name="searchBy"
                           id="searchBy"
                           onChange={e => this.setSearchBy(e.target.value)}
                           value={this.state.searchBy}
                           placeholder="Search By">
                      <option value="id">App ID</option>
                      <option value="firstName">First Name</option>
                      <option value="lastName">Last Name</option>
                      <option value="ssn">SSN</option>
                    </Input>
                  </FormGroup>

                  <FormGroup className="col-md-3">
                    <Input autoComplete="off"
                           type="select"
                           name="condition"
                           id="condition"
                           onChange={e => this.setSearchCondition(e.target.value)}
                           value={this.state.searchCondition}
                           placeholder="Select Condition">
                      <option disabled={this.state.searchBy != 'id'}
                              value=">">Greater Than
                      </option>
                      <option disabled={this.state.searchBy != 'id'}
                              value="<">Less Than
                      </option>
                      <option value="=">Equal to</option>
                      <option disabled={this.state.searchBy == 'id'}
                              value=">=<">Contains
                      </option>
                    </Input>
                  </FormGroup>

                  <FormGroup className="col-md-3">
                    <Input autoComplete="off"
                           type="text"
                           name="Search Value"
                           id="searchByValue"
                           onChange={e => this.setSearchByValue(e.target.value)}
                           value={this.state.searchByValue}
                           placeholder="Value"/>
                  </FormGroup>

                  <div className="col-md-2">
                    <Button type="button"
                            onClick={this.applySearchByFilter}>Search</Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                {/* ___________________ Global Search ___________________ */}
                <FormGroup className="col-md-3 float-left">
                  <Input autoComplete="off"
                         type="text"
                         name="Search Value"
                         id="globalSearch"
                         onChange={this.handleGlobalSearch}
                         value={this.state.globalSearch}
                         placeholder="Global Search"/>
                </FormGroup>

                <div>
                  {/* ___________________ Pagination ___________________ */}
                  <div className="d-inline-block ml-2 float-right">
                    <ReactPaginate
                      previousLabel={'<'}
                      nextLabel={'>'}
                      breakLabel={'...'}
                      pageCount={pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={2}
                      forcePage={this.state.currentPage}
                      pageLinkClassName="page-link btn btn-link rounded-0"
                      previousLinkClassName="page-link btn btn-link rounded-0"
                      nextLinkClassName="page-link btn btn-link rounded-0"
                      breakLinkClassName="page-link btn btn-link rounded-0"
                      activeClassName="active"
                      pageClassName="page-item"
                      previousClassName="page-item"
                      breakClassName="page-item"
                      nextClassName="page-item"
                      disabledClassName="disabled"
                      containerClassName="pagination text-right"
                      onPageChange={this.handlePageClick}
                    />
                  </div>

                  {/* ___________________ Show Dropdown ___________________ */}
                  <Dropdown group
                            className="float-right"
                            isOpen={this.state.showPaginationDropdown}
                            size="sm"
                            toggle={() => this.togglePaginationDropdown(null)}>
                    <DropdownToggle caret
                                    className="p-2 bg-white">
                      Show
                      <span className="font-weight-bold ml-2 mr-2">
                        {this.state.pageSize > 9 ? this.state.pageSize : ('0' + this.state.pageSize)}
                      </span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <ListGroup>
                        <ListGroupItem active={this.state.pageSize == 5}
                                       tag="a"
                                       onClick={() => this.togglePaginationDropdown(5)}
                                       action>5</ListGroupItem>
                        <ListGroupItem tag="a"
                                       onClick={() => this.togglePaginationDropdown(10)}
                                       active={this.state.pageSize == 10}
                                       action>10</ListGroupItem>
                        <ListGroupItem tag="a"
                                       onClick={() => this.togglePaginationDropdown(15)}
                                       active={this.state.pageSize == 15}
                                       action>15</ListGroupItem>
                        <ListGroupItem tag="a"
                                       onClick={() => this.togglePaginationDropdown(20)}
                                       active={this.state.pageSize == 20}
                                       action>20</ListGroupItem>
                      </ListGroup>
                    </DropdownMenu>
                  </Dropdown>


                </div>

                <Table responsive
                       striped
                       className="border">
                  <thead className="bg-dark border-dark">
                  <tr>
                    <th className="border-dark"
                        scope="col">APP ID
                    </th>
                    <th className="border-dark"
                        scope="col">First Name
                    </th>
                    <th className="border-dark"
                        scope="col">Last Name
                    </th>
                    <th className="border-dark"
                        scope="col">SSN
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.searchData
                      .slice(
                        this.state.currentPage * this.state.pageSize,
                        (this.state.currentPage + 1) * this.state.pageSize
                      )
                      .map((search, index) =>
                        <SearchRow key={index}
                                   toggle={this.toggleModal}
                                   search={search}/>
                      )
                  }
                  </tbody>
                </Table>

              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.modal}
               toggle={() => this.toggleModal(null)}
               backdrop={true}
               keyboard={true}>
          <ModalHeader toggle={() => this.toggleModal(null)}>Modal title</ModalHeader>
          <ModalBody>
            <pre>{JSON.stringify(this.state.selectedSearchItem, null, 2)}</pre>
          </ModalBody>
          <ModalFooter>
            <Button color="primary"
                    onClick={() => this.toggleModal(null)}>Do Something</Button>{' '}
            <Button color="secondary"
                    onClick={() => this.toggleModal(null)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default Search;
