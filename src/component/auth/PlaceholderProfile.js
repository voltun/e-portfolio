import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as ProfileData from "../../api/ProfileData";

import Profile from "./Profile";
import Profile2 from "./Profile2";
import Profile3 from "./Profile3";
import Profile5 from "./Profile5";

class PlaceholderProfile extends Component {
  state = {};

  components = {
    prf1: Profile,
    prf2: Profile2,
    prf3: Profile3,
    prf5: Profile5,
  };

  //constructor(props) {
  //  super(props);
  //  console.log("HERE");
  //  this.state = { profile: props.profile };
  //  console.log(props);
  //}

  // Load profile on mount if not passed through as props.
  componentDidMount() {
    if (
      !this.props.profile
      // && !this.state.profile
    ) {
      // Extract profile ID from the URL
      const windowUrl = window.location.pathname;
      const profilePath = windowUrl.substr(windowUrl.lastIndexOf("/") + 1);
      ProfileData.getProfile(profilePath, (res) => {
        this.setState({ profile: res });
      });
    } else this.setState({ profile: this.props.profile });
  }

  // For my-profile, only used when props are changing due to async.
  // componentDidUpdate(prevProps) {
  //   console.log("hello update");
  //   if (prevProps.profile !== this.props.profile) {
  //     this.setState({ profile: this.props.profile });
  //   }
  // }

  render() {
    return (
      <div>
        {/* Checks if the profile trying to be visited is self-profile, and 
        correctly redirects to my-profile if not already there */}
        {this.state.profile ? (
          this.props.isAuthenticated &&
          this.props.user.pid === this.state.profile._id &&
          window.location.pathname !== "/my-profile" ? (
            <Redirect to="/my-profile" />
          ) : (
            React.createElement(
              this.components["prf" + this.state.profile.layout],
              {
                profile: this.state.profile,
                layout: this.props.layout,
              }
            )
          )
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(PlaceholderProfile);
