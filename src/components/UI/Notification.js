import React from "react";

const Notification = React.memo((props) => {
  return <div className={`${props.class} notification`}>{props.children}</div>;
});

export default Notification;
