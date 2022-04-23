import {Link} from "react-router-dom";
import user from "../images/user.png";
export const ContactCard = ({ contact, getContactId }) => {
  const {id, name, email } = contact;
  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
        <Link to={{ pathname: `contact/${id}`, state: { contact } }}>
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      <i
        onClick={() => getContactId(id)}
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px" }}
      ></i>
      <Link to={{ pathname: `/edit`, state: { contact } }}>
      <i
        className="edit alternate outline icon"
        style={{ color: "blue", marginTop: "7px", marginRight: "10px" }}
      ></i>
      </Link>
    </div>
  );
};
