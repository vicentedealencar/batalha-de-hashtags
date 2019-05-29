import React, { Component } from "react";

class ImageAvatars extends Component {
  render() {
    const { name, pic, role } = this.props;

    return (
      <div className="avatar">
        <img alt={name} src={"/img/" + pic} />
        <h1 className="title">{name}</h1>
        <div className="role">{role}</div>
      </div>
    );
  }
}

export default ImageAvatars;
