
// A modal is a message box that is displayed on top of your screen.
// Modals put an overlay on the screen; therefore, they take visual precedence over all the other elements.

import React, { Component } from "react";
// import 'src/App.css'
// import { useEffect } from 'react';
// import { Route, Routes, useNavigate } from 'react-router-dom';

// importing all of these classes from reactstrap module
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

// build a class base component

// let text="Enter Text Here"
class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
    this.myStyle={
      color:'black',
      backgroundColor:'lightgrey',
      padding:'8px',
      borderRadius:'6px'
    };
  }
  // changes handler to check if a checkbox is checed or not
  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    // console.log("changed")
    this.setState({ activeItem });
    // this.setState({...e.target.value,[name]:value})
  };
  handleClose = () => {
    this.setState({ show: false })
  };
  handleShow = () => {
    this.setState({ show: true })
  }

  // rendering modal in the custommodal class received toggle and on save as props,
  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle} >
        <ModalHeader toggle={toggle}> Task Item </ModalHeader>
        {/* <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div> */}
        <ModalBody>
        
          <Form>
            {/* 3 formgroups
            1 title label */}
            <FormGroup>
              <Label for="title" style={this.myStyle}><h3>Title</h3></Label>
              <Input
                type="text"
                name="title"
                value={this.state.activeItem.title}
                // value={text}
                onChange={this.handleChange}
                placeholder="Enter Task Title"
              />
              <div className="my-3">
                <h6> Your Text Summary</h6>
                <p>{this.state.activeItem.title.split(" ").length} words and {this.state.activeItem.title.length}</p>
              </div>
            </FormGroup>

            {/* 2 description label */}
            <FormGroup>
              <Label for="description" style={this.myStyle}><h3>Description</h3></Label>
              <div className="my-2">
                <textarea rows="3"
                className="form-control"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter Task Description"
                >
                </textarea>
              </div>
              <div>
                <h6> Your Text Summary</h6>
                <p>{this.state.activeItem.description.split(" ").length} words and {this.state.activeItem.description.length}</p>
              </div>
            </FormGroup>

            {/* 3 completed label */}
            <FormGroup check>
              <Label for="completed">
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        {/* create a modal footer */}
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)
          }>
            {/* {navigate('', { replace: true })} */}
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
export default CustomModal