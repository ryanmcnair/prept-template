import React, { Component } from 'react';
import { Button, Form, Input } from 'reactstrap';
import data from '../../helpers/data/questionData';

export default class AddForm extends Component {
  state = {
    firebaseKey: this.props.card?.firebaseKey || '',
    question: this.props.card?.question || '',
    answer: this.props.card?.answer || '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    data.createQuestion(this.state)
      .then(() => {
        this.props.onUpdate();
      });
  }

  render() {
    return (
        <Form className='container mb-3' onSubmit={this.handleSubmit}>
          <h2>Add or Edit Questions</h2>
            <Input
            type='text'
            name='question'
            value={this.state.question}
            onChange={this.handleChange}
            placeholder='Question'
            className='form-control form-control-lg m-1'
            required
            />
            <Input
            type='text'
            name='answer'
            value={this.state.answer}
            onChange={this.handleChange}
            placeholder='Answer'
            className='form-control form-control-lg m-1'
            required
            />
            <Button className="mt-3">Submit</Button>
        </Form>
    );
  }
}
