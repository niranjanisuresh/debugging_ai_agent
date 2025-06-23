import React, { useState } from 'react';
import NullCrash from './NullCrash';
import PopCrash from './PopCrash';
import EffectCrash from './EffectCrash';
import BrokenComponent from './BrokenComponent';

function Dashboard() {
  const [activeCrash, setActiveCrash] = useState(null);

  let CrashComponent = null;
  if (activeCrash === 'null') CrashComponent = <NullCrash />;
  else if (activeCrash === 'prop') CrashComponent = <PopCrash />;
  else if (activeCrash === 'effect') CrashComponent = <EffectCrash />;
  else if (activeCrash === 'broken') CrashComponent = <BrokenComponent />;

  return (
    <div>
      <h2>🚀 Crash Dashboard</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setActiveCrash('null')}>Null Crash</button>
        <button onClick={() => setActiveCrash('prop')}>Prop Crash</button>
        <button onClick={() => setActiveCrash('effect')}>Effect Crash</button>
        <button onClick={() => setActiveCrash('broken')}>Broken Component</button>
      </div>
      {CrashComponent}
    </div>
  );
}

export default Dashboard;
