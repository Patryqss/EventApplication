import React, { Component } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import ErrorMessage from '../ErrorMessage';

export default class Application extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      eventDate: '',
      checked: false,
      status: '',
      invalidData: false,
      valError: '',
    };
  }
  //Handling all values in state so the component is controlled
  onFormChange = (e, { name, value }) => this.setState({ [name]: value });

  onCheckboxToggle = () => this.setState(prevState => ({ checked: !prevState.checked }));

  onFormSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const [firstName, lastName, email, eventDate] = [
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.state.eventDate,
    ];
    if (this.formValidate()) {
      const response = await fetch('/api/members', {
        method: 'POST',
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          eventDate,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        form.reset();
        this.setState({ status: 'SUCCESS' });
      } else {
        this.setState({ valError: '', invalidData: true });
      }
    }
  };

  formValidate() {
    if (this.state.firstName.length < 3) {
      this.setState({ valError: 'First Name must be at least 3 characters long.', invalidData: true });
      return false;
    } else if (this.state.lastName.length < 3) {
      this.setState({ valError: 'Last Name must be at least 3 characters long.', invalidData: true });
      return false;
    } else if (
      this.state.email.length < 5 ||
      this.state.email.indexOf('@') === -1 ||
      this.state.email.indexOf('.') === -1
    ) {
      this.setState({ valError: 'Please enter a valid email adress.', invalidData: true });
      return false;
    } else if (this.state.eventDate.length === 0) {
      this.setState({ valError: 'Please select a date of an event.', invalidData: true });
      return false;
    } else if (!this.state.checked) {
      this.setState({ valError: 'You must agree to the terms and conditions.', invalidData: true });
      return false;
    } else return true;
  }

  render() {
    const { firstName, lastName, email, eventDate, status, invalidData, valError } = this.state;
    return (
      <div className="app">
        <Message
          attached
          className="message"
          color="olive"
          header="Welcome to our site!"
          content="Fill out the form below to sign-up for an event!"
        />
        {invalidData && status !== 'SUCCESS' && (
          <ErrorMessage mainmessage="Something went wrong. Please try again." submessage={valError} />
        )}
        <Form className="attached fluid segment" onSubmit={this.onFormSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              name="firstName"
              label="First Name"
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={this.onFormChange}
            />
            <Form.Input
              fluid
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={this.onFormChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              name="email"
              label="Email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={this.onFormChange}
            />
            <Form.Input
              fluid
              name="eventDate"
              label="Event Date"
              placeholder="Event Date"
              type="date"
              value={eventDate}
              onChange={this.onFormChange}
            />
          </Form.Group>
          <Form.Checkbox
            inline
            label="I agree to the terms and conditions"
            className="check"
            onChange={this.onCheckboxToggle}
            checked={this.state.checked}
          />
          <Form.Group>
            {status === 'SUCCESS' ? (
              <p className="info">Submit successful, thank you!</p>
            ) : (
              <Button color="olive" size="large" type="submit">
                Submit!
              </Button>
            )}
          </Form.Group>
        </Form>
      </div>
    );
  }
}
