// src/EmployeeList.js
import React from "react";
import { Page, Grid, Table } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react";

class ListEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  loadData() {
    fetch("http://lb-test-1996005186.ap-south-1.elb.amazonaws.com:8080/api/v1/employee/search/all")
      .then(response => response.json())
      .then(data => {
        console.log("employee API data:", data);
        this.setState({ data: data || [] });
      })
      .catch(err => console.error("employee load error", err.toString()));
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <SiteWrapper>
        <Page.Card title="Employee List"></Page.Card>
        <Grid.Col md={12} lg={12} className="align-self-center">
          <Table>
            <Table.Header>
              <Table.ColHeader>Employee ID</Table.ColHeader>
              <Table.ColHeader>Name</Table.ColHeader>
              <Table.ColHeader>Email</Table.ColHeader>
              <Table.ColHeader>Phone Number</Table.ColHeader>
              <Table.ColHeader>Designation</Table.ColHeader>
              <Table.ColHeader>Department</Table.ColHeader>
              <Table.ColHeader>Joining Date</Table.ColHeader>
              <Table.ColHeader>Address</Table.ColHeader>
              <Table.ColHeader>Office Location</Table.ColHeader>
              <Table.ColHeader>Status</Table.ColHeader>
            </Table.Header>
            <Table.Body>
              {this.state.data.map((item, i) => (
                <Table.Row key={item.id || i}>
                  <Table.Col>{item.id}</Table.Col>
                  <Table.Col>{item.name}</Table.Col>
                  <Table.Col>{item.email}</Table.Col>
                  <Table.Col>{item.phone_number}</Table.Col>
                  <Table.Col>{item.designation || "-"}</Table.Col>
                  <Table.Col>{item.department || "-"}</Table.Col>
                  <Table.Col>{item.joining_date || "-"}</Table.Col>
                  <Table.Col>{item.address || "-"}</Table.Col>
                  <Table.Col>{item.office_location || "-"}</Table.Col>
                  <Table.Col>{item.status || "-"}</Table.Col>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Grid.Col>
      </SiteWrapper>
    );
  }
}

export default ListEmployee;
