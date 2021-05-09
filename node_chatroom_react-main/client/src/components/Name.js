import React, { useEffect } from "react";

const Name = (props) => {
  const getName = () => {
    if (props.username.length === 0) {
      let newName = prompt("Enter your username: ");

      props.getThumbs();

      props.setUsername([newName]);
    }
  };

  // const assignThumbnail = () => {
  //   let thumb = Math.floor(Math.random() * 50);
  //   thumb = props.thumbsArr[thumb];
  //   console.log(thumb);
  // };

  useEffect(() => {
    getName();
  }, []);

  return (
    <h2 id="name">Welcome, {props.username.map((username) => username)}!</h2>
  );
};

export default Name;
