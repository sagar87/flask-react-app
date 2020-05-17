import React, { Component } from "react";
import axios from "axios";
import UsersList from "./components/UsersList";
import AddUser from "./components/AddUser";
import About from "./components/About";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Form from "./components/Form";
import Logout from "./components/Logout";
import UserStatus from "./components/UserStatus";

class App extends Component {
  // new
  constructor() {
    super();
    this.state = {
      users: [],
      username: "",
      email: "",
      title: "TestDriven.io",
      // new
      formData: {
        username: "",
        email: "",
        password: "",
      },
      isAuthenticated: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserFormSubmit = this.handleUserFormSubmit.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }
  // new
  componentDidMount() {
    this.getUsers();
  }
  handleUserFormSubmit(event) {
    event.preventDefault();
    const formType = window.location.href.split("/").reverse()[0];
    let data = {
      email: this.state.formData.email,
      password: this.state.formData.password,
    };
    if (formType === "register") {
      data.username = this.state.formData.username;
    }
    const url = `${process.env.REACT_APP_FLASK_SERVICE_URL}/auth/${formType}`;
    axios
      .post(url, data)
      .then((res) => {
        this.clearFormState();
        window.localStorage.setItem("authToken", res.data.auth_token);
        this.setState({ isAuthenticated: true });
        this.getUsers(); // new
      })
      .catch((err) => {
        console.log(err);
      });
  }
  logoutUser() {
    window.localStorage.clear();
    this.setState({ isAuthenticated: false });
  }
  handleFormChange(event) {
    const obj = this.state.formData;
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }
  clearFormState() {
    this.setState({
      formData: { username: "", email: "", password: "" },
      username: "",
      email: "",
    });
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
    return (
      <div>
        <NavBar
          title={this.state.title}
          isAuthenticated={this.state.isAuthenticated}
        />
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-half">
                <br />
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <div>
                        <br />
                        <Route
                          exact
                          path="/"
                          render={() => <UsersList users={this.state.users} />}
                        />
                      </div>
                    )}
                  />
                  <Route exact path="/about" component={About} />
                  <Route
                    exact
                    path="/register"
                    render={() => (
                      <Form
                        formType={"Register"}
                        formData={this.state.formData}
                        handleUserFormSubmit={this.handleUserFormSubmit}
                        handleFormChange={this.handleFormChange}
                        isAuthenticated={this.state.isAuthenticated}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/login"
                    render={() => (
                      <Form
                        formType={"Login"}
                        formData={this.state.formData}
                        handleUserFormSubmit={this.handleUserFormSubmit}
                        handleFormChange={this.handleFormChange}
                        isAuthenticated={this.state.isAuthenticated}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/logout"
                    render={() => (
                      <Logout
                        logoutUser={this.logoutUser}
                        isAuthenticated={this.state.isAuthenticated}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/status"
                    render={() => (
                      <UserStatus
                        isAuthenticated={this.state.isAuthenticated}
                      />
                    )}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
