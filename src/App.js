import React from "react";
import "./App.css";
import Home from "./components/Home";
import Details from "./components/Details";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/business/:id" component={Details} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
