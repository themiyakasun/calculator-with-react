import React from 'react';
import './index.css';

import Calc from './components/Calc';

const App = () => {
  return (
    <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
      <Calc />
    </div>
  );
};

export default App;
