import React from 'react';

function PopCrash({ user }) {
  return <div>{user.name.toUpperCase()}</div>; // Crashes if `user` is undefined
}

export default PopCrash;
