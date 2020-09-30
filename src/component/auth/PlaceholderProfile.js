import React, { Component } from "react";
import * as ProfileData from "../../api/ProfileData";

import Profile from "./Profile";
import Profile2 from "./Profile2";
import Profile3 from "./Profile3";
import Profile4 from "./Profile4";
import Profile5 from "./Profile5";

class PlaceholderProfile extends Component {
  state = {};

  components = {
    prf1: Profile,
    prf2: Profile2,
    prf3: Profile3,
    prf4: Profile4,
    prf5: Profile5,
  };

  //constructor(props) {
  //  super(props);
  //  console.log("HERE");
  //  this.state = { profile: props.profile };
  //  console.log(props);
  //}

  componentDidUpdate(prevProps) {
    console.log(this.props.profile);
    if (prevProps.profile !== this.props.profile) {
      if (!this.props.profile) {
        // Extract profile ID from the URL
        const windowUrl = window.location.pathname;
        const profilePath = windowUrl.substr(windowUrl.lastIndexOf("/") + 1);
        ProfileData.getProfile(profilePath, (res) => {
          this.setState({ profile: res });
        });
      } else {
        this.setState({ profile: this.props.profile });
      }
    }
  }

  render() {
    console.log("ANOTHER HELLO");
    return (
      <div>
        {this.state &&
          this.state.profile &&
          this.state.profile.layout &&
          React.createElement(
            this.components["prf" + this.state.profile.layout],
            { profile: this.state.profile }
          )}
      </div>
    );
  }
}

export default PlaceholderProfile;
