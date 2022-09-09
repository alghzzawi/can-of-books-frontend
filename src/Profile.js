import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends Component {
  render() {
    const { user } = this.props.auth0;
    console.log(user)
    return <h1>Hello {user.name}</h1>;
  }
}

export default withAuth0(Profile);