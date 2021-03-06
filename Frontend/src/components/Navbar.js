import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions"


class Navbar extends Component {
  state = { activeItem: "Admin Dashboard"};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  renderName = () => {
    if (this.props.role === -1) {
      return "SIGN IN"
    }
    return "SIGN OUT"
  }

  render() {
    const { activeItem} = this.state;
    return (
      <Menu pointing secondary>
        <Route path="/dashboard/admin">
          <Link to="/dashboard/admin/users">
            <Menu.Item
              name="Admin Dashboard"
              active={activeItem === "Admin Dashboard" || activeItem === "logout"}
              onClick={this.handleItemClick}
            />
          </Link>
          <Link to="/dashboard/admin/services">
            <Menu.Item
              name="Available Services"
              // active="true"
              active={activeItem === "Available Services"}
              onClick={this.handleItemClick}
            />
          </Link>
        </Route>
        <Route exact path="/dashboard/user">
          {/* <Link to="/dashboard/user"> */}
          <Menu.Item name="My account" active={true} />
          {/* </Link> */}
        </Route>

        <Menu.Menu position="right">
          <Route path="/dashboard/admin">
            <Link to="/dashboard/login">
              {/* <Menu.Item name="logout" onClick={this.handleItemClick} /> */}
              <Menu.Item name={this.renderName()} onClick={() =>  this.props.signOut()} />
            </Link>
          </Route>
          <Route path="/dashboard/user">
            <Link to="/dashboard/login">
              <Menu.Item name={this.renderName()} onClick={() =>  this.props.signOut()} />
            </Link>
          </Route>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    role: state.sign.role
  }
}

export default connect(mapStateToProps, {signIn, signOut})(Navbar);