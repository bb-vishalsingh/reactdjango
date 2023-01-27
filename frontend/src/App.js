// import logo from './logo.svg';
import React, { Component } from 'react'
import './App.css';
// import CustomModal from './components/';
import Modal from "./components/Modal";
import axios from 'axios';  



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      taskList: []
    };

    // declearing myStyle object which can be used in any html element as a 
    // javascript variable to style it.
    this.myStyle={
      color:'black',
      backgroundColor:'lightgrey'
    }
  }
  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios   //Axios to send and receive HTTP requests
      .get("http://localhost:8000/api/tasks/")
      .then(res => this.setState({ taskList: res.data }))
      .catch(err => console.log(err));
  };

  //Creating toggle property
  toggle=()=>{
    this.setState({modal:!this.state.model});
  }

  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      // if old post to edit and submit
      axios
        .put(`http://127.0.0.1:8000/api/tasks/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    // if new post to submit
    axios
      .post("http://127.0.0.1:8000/api/tasks/", item)
      .then(res => this.refreshList());
  };

  // Delete item
  handleDelete = item => {
    axios
      .delete(`http://127.0.0.1:8000/api/tasks/${item.id}/`)
      .then(res => this.refreshList());
  };
  // handleDelete = item => {//add this after modal creation
  //   alert("delete" + JSON.stringify(item));//add this after modal creation
  // };

  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
    this.refreshList()
  };

  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };


  displayCompleted=status=>{
    if(status){
      return this.setState({viewCompleted:true})
    }
    return this.setState({viewCompleted:false})

  }



  renderTabList=()=>{
    return(
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          completed
            </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incompleted
            </span>
      </div>
    );
  }
  // Rendering items in the list(completed or incompleted)
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.taskList.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map(item => (

      // The HTML here is same only differce is, we have to change syntax of those keywords which are already reserved in js
      // like class, instead we use className, and insted of for, we use htmlFor etc.
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
        style={this.myStyle}
      >
        <span
          className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""
            }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };
 
  render(){

    // If we are using HTML here , the it is expected to return only one HTML elemetn in a function,
   // returning more than one element will give error. Below only one element is returned i.e <main><main/> 
   //Also we can use JSX fragment <> </> and put all HTML elements inside this.
    return(
      <main className="content p-3 mb-2 bg-secondary">
      <h1 className="text-white text-uppercase text-center my-5">Task Manager</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="">
              <button onClick={this.createItem} className="btn btn-secondary">
                Add task
                  </button>
            </div>
            {this.renderTabList()}
            <ul className="list-group">
              {this.renderItems()}
            </ul>
          </div>
        </div>
      </div>

      <footer className="my-3 mb-2 bg-secondary  text-white text-center">
        Copyright 2023 &copy; All Rights Reserverd
      </footer>
      {this.state.modal ? (
        <Modal
          activeItem={this.state.activeItem}
          toggle={this.toggle}
          onSave={this.handleSubmit}
        />
      ) : null}
    </main>
    )
  }
  // createItem = () => {
  //   const item = { title: "", description: "", completed: false };
  //   this.setState({ activeItem: item, modal: !this.state.modal });
  // };

  // editItem = item => {
  //   this.setState({ activeItem: item, modal: !this.state.modal });
  // };
}

export default App;
