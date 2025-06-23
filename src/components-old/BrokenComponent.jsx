import React from 'react';

function BrokenComponent() {
  throw new Error("💥 This component broke intentionally.");
}

export default BrokenComponent;
