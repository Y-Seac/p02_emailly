import React, { Component } from "react"; //uses import rather than require , require more for backend.
import { BrowserRouter, Route } from "react-router-dom"; //one React libray somehow that allows the next 4 lines???
import { connect } from "react-redux"; //allows react to communicate w redux
import * as actions from "../actions"; //imports all actions from actions dir.

import Header from "./Header";
import Landing from "./Landing";

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

//Creates a new componet that will exported to the client index.js file
//React componet begins here. And syntax inbetween has diff syntax
//Has be refactored v.2. Search App class vs App function(const App = () => { )
class App extends Component {
  componentDidMount() {
    //Lifecycle method??
    //init any async you want to load right away
    this.props.fetchUser(); //When the action is sent to App componet it become a prop of that componet
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Landing />
            <Route exact={true} path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
