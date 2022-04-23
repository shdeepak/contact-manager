import { ContactCard } from "./ContactCard";
import { Link } from "react-router-dom";
export const ContactList = (props) => {
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
      <div className="ui celled list">{renderContactList}</div>
    </div>
  );
};
