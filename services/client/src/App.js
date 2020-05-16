import React, { Component } from "react";
import axios from "axios";
import UsersList from "./components/UsersList";
import AddUser from "./components/AddUser";

class App extends Component {
  // new
  constructor() {
    super();
    this.state = {
      users: [],
      username: "",
      email: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // new
  componentDidMount() {
    this.getUsers();
  }
  handleSubmit(e) {
    e.preventDefault();
    // new
    const data = {
      username: this.state.username,
      email: this.state.email,
    };
    axios
      .post(`${process.env.REACT_APP_FLASK_SERVICE_URL}/users`, data)
      .then((res) => {
        this.getUsers(); // new
        this.setState({ username: "", email: "" }); // new
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleChange(e) {
    const obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }
  getUsers() {
    axios
      .get(`${process.env.REACT_APP_FLASK_SERVICE_URL}/users`) // new
      .then((res) => {
        this.setState({ users: res.data.data.users });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { username, email } = this.state;
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-one-third">
              <br />
              <h1 className="title is-1">All Users</h1>
              <hr />
              <br />
              <AddUser
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                username={username}
                email={email}
              />
              <br></br>
              <UsersList users={this.state.users} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
