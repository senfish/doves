import React from "react";
import List from "./List";
import Item from "./Item";
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import "./app.css";

const ContactData = [
  {
    id: "01",
    title: "test 001",
    desc: "test 001test 001test 001test 001test 001test 001test 001",
  },
  {
    id: "02",
    title: "test 002",
    desc: "test 002test 002test 002test 002test 002test 002test 002",
  },
  {
    id: "03",
    title: "test 003",
    desc: "test 003test 003test 003test 003test 003test 003test 003",
  },
  {
    id: "04",
    title: "test 004",
    desc: "test 004test 004test 004test 004test 004test 004test 004",
  },
];
const Home = () => {
  return (
    <div>
      <h2>Home View</h2>
      <p>在react中使用React Router V6指南</p>
    </div>
  );
};
const App = () => {
  return (
    <HashRouter>
      <div className="main">
        <div className="navbar">
          <Link to="/">
            <div>Home</div>
          </Link>
          <Link to="/list">
            <div>List</div>
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List contacts={ContactData} />}>
            <Route path="/list/:id" element={<Item contacts={ContactData} />} />
          </Route>
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
