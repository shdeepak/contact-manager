import React, { useRef } from "react";
import { ContactCard } from "./ContactCard";
import { Link } from "react-router-dom";
export const ContactList = (props) => {
  const inputEl = useRef("");
  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  };
  const renderContactList = props.contacts?.map((contact) => (
    <ContactCard
      getContactId={props.getContactId}
      contact={contact}
      key={contact.id}
    />
  ));
  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input
            type="text"
            ref={inputEl}
            placeholder="Search Contacts"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {renderContactList.length > 0 ? renderContactList : "no result found"}
      </div>
    </div>
  );
};
