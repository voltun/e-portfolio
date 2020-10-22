import React, { Component, Fragment } from "react";
import { Col, Upload, Button, Avatar } from "antd";
import "antd/dist/antd.css";
import { UserOutlined } from "@ant-design/icons";

export class ProfilePicture extends Component {
  state = {
    pfpVisible: true,
  };

  // pfp hovering methods
  onEnterPFP = () => {
    this.setState({ pfpVisible: false });
  };

  onLeavePFP = () => {
    this.setState({ pfpVisible: true });
  };

  render() {
    const { pfpVisible } = this.state;

    // pfp present by default
    const pfp = (
      <Avatar alt="pfp" className="pfp" src={this.props.image} shape="square" />
    );

    // upload button that appears while hovering in edit mode
    const uploadButton = (
      <Upload className="pfp-button">
        {!this.props.mobileView ? (
          <Button type="primary"> Change </Button>
        ) : (
          <Button type="primary" size="small" icon={<UserOutlined />} block />
        )}
      </Upload>
    );

    return (
      <Col
        flex="200px"
        onMouseEnter={() => this.onEnterPFP()}
        onMouseLeave={() => this.onLeavePFP()}
      >
        {pfp}
        {this.props.isMyProfile && this.props.canEdit && !pfpVisible
          ? uploadButton
          : null}
      </Col>
    );
  }
}
export default ProfilePicture;