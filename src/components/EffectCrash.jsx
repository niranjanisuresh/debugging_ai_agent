import React, { useEffect } from 'react';

function EffectCrash() {
  useEffect(() => {
    throw new Error("💣 Boom from useEffect!");
  }, []);

  return <div>EffectCrash Component Mounted</div>;
}

export default EffectCrash;
