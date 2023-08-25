import React from 'react';

import { ACTIONS } from './Actions.js';

const DigitButtons = ({ dispatch, digit }) => {
  return (
    <button
      className={`${
        digit === '0'
          ? 'text-white w-[130px] h-[60px] border-2 border-[#d4d4d4] shadow-md shadow-[#595959] rounded-[20px]'
          : 'text-white w-[60px] h-[60px] border-2 border-[#d4d4d4] shadow-md shadow-[#595959] rounded-[20px]'
      }`}
      onClick={(e) => {
        e.preventDefault();
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
      }}
    >
      {digit}
    </button>
  );
};

export default DigitButtons;
