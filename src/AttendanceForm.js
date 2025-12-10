import react, * as React from "react";
import { Page, Grid } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { withFormik } from "formik";

const AttendanceForm = ({
  values,
  handleChange,
  handleSubmit,
  errors,
  touched,
  isSubmitting,
}) => {
  return (
    <SiteWrapper>
      <Page.Card title="Employee Attendance"></Page.Card>
      <Grid.Col md={6} lg={6} className="align-self-center">
        <Form onSubmit={handleSubmit}>
          {/* Employee ID */}
          <FormGroup>
            {touched.id && errors.id && <p className="red">{errors.id}</p>}
            <Label for="id">Employee ID</Label>
            <Input
              type="number"
              name="id"
              value={values.id}
              onChange={handleChange}
              id="id"
              placeholder="Employee ID"
            />
          </FormGroup>

          {/* Employee Name */}
          <FormGroup>
            {touched.name && errors.name && <p className="red">{errors.name}</p>}
            <Label for="name">Employee Name</Label>
            <Input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              id="name"
              placeholder="Employee Name"
            />
          </FormGroup>

          {/* Status */}
          <FormGroup>
            {touched.status && errors.status && (
              <p className="red">{errors.status}</p>
            )}
            <Label for="status">Status</Label>
            <Input
              type="select"
              name="status"
              id="status"
              value={values.status}
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option>Present</option>
              <option>Absent</option>
            </Input>
          </FormGroup>

          {/* Date */}
          <FormGroup>
            {touched.date && errors.date && <p className="red">{errors.date}</p>}
            <Label for="date">Date</Label>
            <Input
              type="date"
              name="date"
              id="date"
              value={values.date}
              onChange={handleChange}
            />
          </FormGroup>

          <Button color="primary" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      </Grid.Col>
    </SiteWrapper>
  );
};

const FormikApp = withFormik({
  mapPropsToValues({ id, name, status, date }) {
    return {
      id: id || "",
      name: name || "",
      status: status || "",
      date: date || "",
    };
  },
  handleSubmit(values, { resetForm, setSubmitting }) {
    console.log("Submitting:", JSON.stringify(values));
    fetch(
      "http://lb-test-1996005186.ap-south-1.elb.amazonaws.com:8082/api/v1/attendance/create",
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Success:", data);
        resetForm();
      })
      .catch((err) => {
        console.error("❌ Error submitting attendance:", err);
      })
      .finally(() => setSubmitting(false));
  },
})(AttendanceForm);

export default FormikApp;
