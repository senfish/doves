import React from "react";
import { useParams } from "react-router-dom";

const Item = (props) => {
  const result = useParams();

  const contact = props.contacts.find((contact) => contact.id === result.id);
  if (contact == null) {
    return <div>No matching contact</div>;
  }

  return <div>{contact.desc}</div>;
};

export default Item;
