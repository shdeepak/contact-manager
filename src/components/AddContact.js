import React from "react";
export class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
  };

  resetForm = () => {
    this.setState({ name: "", email: "" });
  };

  handleInput = (event) => {
    const inputName = event.target.name;
    const inputVal = event.target.value;
    this.setState({ [inputName]: inputVal });
  };

  submitHandler = (event) => {
    event.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      alert("Please fill valid input");
    } else {
      this.props.addContactHandler(this.state);
      this.props.history.push("/");
      this.resetForm();
    }
  };

  render() {
    return (
      <div className="ui main">
        <h2>Add Contact</h2>
        <form className="ui form" onSubmit={this.submitHandler}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleInput}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleInput}
            />
          </div>
          <button className="ui button blue">Add</button>
        </form>
      </div>
    );
  }
}
