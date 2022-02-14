import React from "react";
import { Link, Outlet } from "react-router-dom";

const List = (props) => {
  return (
    <div className="contact">
      <div className="list">
        {props.contacts.map((contact) => (
          <Link to={contact.id} key="contact.id">
            <div className="contactListElement">{contact.title}</div>
          </Link>
        ))}
      </div>
      <div className="detail">
        Here the details of active contact
        <Outlet />
      </div>
    </div>
  );
};
export default List;
