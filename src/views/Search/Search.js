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
import searchData from './SearchData';
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
      searches: [],
      searchDetails: [],
      pageSize: 5,
      showPaginationDropdown: false,
      currentPage: 0,
    }
    this.searchClick = this.searchClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.togglePaginationDropdown = this.togglePaginationDropdown.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  searchClick() {
    const searches = searchData.find(search => search.id.toString() === this.props.match.params.id)
    const searchDetails = searches ? Object.entries(searches) : [['id', (
      <span><i className="text-muted icon-ban"></i> Not found</span>)]];
    this.setState({searchDetails, searches});
  }

  toggleModal(selectedSearchItem) {
    this.setState({selectedSearchItem, modal: !this.state.modal});
  }

  togglePaginationDropdown(pageSize) {
    if (pageSize) {
      const pageCount = Math.ceil(searchData.length / pageSize);
      // debugger;
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

  render() {

    const pageCount = Math.ceil(searchData.length / this.state.pageSize);

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
                           placeholder="Search By">
                      <option>App ID</option>
                      <option>SSN</option>
                      <option>First Name</option>
                    </Input>
                  </FormGroup>
                  <FormGroup className="col-md-3">
                    <Input autoComplete="off"
                           type="select"
                           name="condition"
                           id="condition"
                           placeholder="Select Condition">
                      <option>Greater Than</option>
                      <option>Less Than</option>
                      <option>Equal to</option>
                    </Input>
                  </FormGroup>
                  <FormGroup className="col-md-3">
                    <Input autoComplete="off"
                           type="text"
                           name="Search Value"
                           id="searchBy"
                           placeholder="Value"/>
                  </FormGroup>
                  <div className="col-md-2">
                    <Button type="button"
                            onClick={this.searchClick}>Search</Button>
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

                <div className="text-right">
                  <Dropdown group
                            className="m-2"
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

                  <div className="d-inline-block">
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
                    searchData
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
