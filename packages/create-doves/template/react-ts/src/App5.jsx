import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>
          Home
        </Link>
        <Link to="/about" style={{ padding: 5 }}>
          About
        </Link>
      </nav>
      <Switch>
        {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
      </Switch>
    </Router>
  );
};

const Home = () => {
  return (
    <div>
      <h2>Home View</h2>
      <p>在react中使用React Router V6指南</p>
    </div>
  );
};

const About = () => {
  return (
    <div>
      <h2>About View</h2>
      <p>在react中使用React Router V6指南</p>
    </div>
  );
};

export default App;
