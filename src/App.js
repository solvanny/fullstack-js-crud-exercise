import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Employees from "./components/Employees";
import PageNotFound from "./components/PageNotFound";
import EmployeerForm from "./components/EmployeerForm";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route exact path="/employees/view/:id" component={EmployeerForm} />
            <Route exact path="/employees/new" component={EmployeerForm} />
            <Route exact path="/employees" component={Employees} />
            <Redirect from="/" exact to="/employees" />
            <Route path="/not-found" exact component={PageNotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
