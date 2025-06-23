import React from 'react';
import NullCrash from './NullCrash';
import PopCrash from './PopCrash';
import EffectCrash from './EffectCrash';
import BrokenComponent from './BrokenComponent';

function CrashSimulator({ type }) {
  if (type === 'null') return <NullCrash />;
  if (type === 'prop') return <PopCrash />;
  if (type === 'effect') return <EffectCrash />;
  if (type === 'broken') return <BrokenComponent />;
  return <p>No crash selected yet.</p>;
}

export default CrashSimulator;
