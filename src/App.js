import React from "react";
import BestBooks from "./BestBooks";
import Profile from "./Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header.js";
import { withAuth0 } from "@auth0/auth0-react";

class Books extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Header />
                  {isAuthenticated && <BestBooks />}
                </>
              }
            ></Route>
            <Route exact path="/profile" element={<> <Header />{isAuthenticated &&  <Profile />}</>}></Route>
          </Routes>
        </Router>
      </>
    );
  }
}

export default withAuth0(Books);
