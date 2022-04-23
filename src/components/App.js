import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Header } from "./Header";
import { AddContact } from "./AddContact";
import { ContactList } from "./ContactList";
import { ContactDetails } from "./ContactDetails";
import api from "../api/contacts";
import { EditContact } from "./EditContact";
function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };
  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, { ...response.data }]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(
      contacts.map((contact) =>
        contact.id === id ? { ...response.data } : contact
      )
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const updateContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(updateContactList);
  };

  const searchHandler = (searchTerm) => {
    setsearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactsList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });

      setSearchResults(newContactsList);
    } else {
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    const getAllCOntacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllCOntacts();
  }, []);

  useEffect(() => {}, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <ContactList
                {...props}
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />
          <Route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />
          <Route path="/contact/:id" component={ContactDetails} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
