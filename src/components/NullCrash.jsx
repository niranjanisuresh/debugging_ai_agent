import React from 'react';

function NullCrash() {
  const data = null;
  return <div>{data.text}</div>;
}

export default NullCrash;
