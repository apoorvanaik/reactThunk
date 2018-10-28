import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Grid, Row, Col } from "react-bootstrap";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import { getUserDetails } from "./actions/users.actions";
import DisplayContent from "./components/DisplayContent";
import {
  USERS_HR,
  USERS_ENGG,
  HR,
  DEPARTMENT_OPTIONS,
  DEPARTMENT,
  EMPLOYEE_ID,
  GET_DETAILS,
  CLEAR
} from "./constants";
import "./styles/styles.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      selectedItemDept: undefined,
      selectedItemEmp: undefined,
      selectedEmp: undefined,
      selectedItems: [],
      firstName: "",
      userId: "",
      userImage: "",
      userIdHR: USERS_HR,
      userIdEngg: USERS_ENGG,
      clearAll: false,
      loading: false
    };
  }

  componentDidMount() {}

  _onDropdownDeptChanged = event => {
    const { userIdEngg, userIdHR } = this.state;
    const newValue = event.key;
    this.setState({
      selectedItemEmp: newValue === HR ? userIdHR : userIdEngg
    });
  };

  __onDropdownEmpChanged = event => {
    this.setState({
      selectedEmp: event.key
    });
  };

  getDetails = event => {
    this.setState({ loading: true });
    event.preventDefault();
    this.props.getUserDetails(this.state.selectedEmp);
  };

  clearDetails = () => {
    this.setState({
      selectedItemDept: undefined,
      selectedItemEmp: undefined,
      clearAll: true
    });
  };

  render() {
    const { selectedItemDept, selectedItemEmp, clearAll, loading } = this.state;
    const { disabled, checked, users } = this.props;
    let usersList;
    if (loading) {
      usersList = <div>Loading...</div>;
    }

    if (users) {
      usersList = users.map((user, index) => (
        <DisplayContent userDetails={user.data} key={index} />
      ));
    }

    return (
      <Grid fluid>
        <Fabric className="App">
          <Row>
            <Col sm={6} md={3}>
              <Dropdown
                id="Department"
                label={DEPARTMENT}
                selectedKey={
                  selectedItemDept ? selectedItemDept.key : undefined
                }
                placeHolder={DEPARTMENT}
                options={DEPARTMENT_OPTIONS}
                onChanged={this._onDropdownDeptChanged}
              />
            </Col>

            <Col sm={6} md={3}>
              <Dropdown
                id="Employee"
                label={EMPLOYEE_ID}
                selectedKey={selectedItemEmp ? selectedItemEmp.key : undefined}
                placeHolder={EMPLOYEE_ID}
                options={selectedItemEmp}
                onChanged={this.__onDropdownEmpChanged}
              />
            </Col>

            <Col sm={6} md={3}>
              <div className="buttonWrapper">
                <DefaultButton
                  data-automation-id="test"
                  allowDisabledFocus={true}
                  disabled={disabled}
                  checked={checked}
                  text={GET_DETAILS}
                  onClick={this.getDetails}
                />
              </div>
            </Col>

            <Col sm={6} md={3}>
              <div className="buttonWrapper">
                <DefaultButton
                  data-automation-id="test"
                  allowDisabledFocus={true}
                  disabled={disabled}
                  checked={checked}
                  text={CLEAR}
                  onClick={this.clearDetails}
                />
              </div>
            </Col>
          </Row>

          {clearAll ? "" : usersList}
        </Fabric>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserDetails: bindActionCreators(getUserDetails, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
