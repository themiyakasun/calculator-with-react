import React from 'react';

import { ACTIONS } from './Actions.js';

const OperationButtons = ({ dispatch, operation }) => {
  return (
    <button
      className={`${
        operation === '='
          ? 'text-white bg-[#e6883c] w-[60px] h-[60px] border-2 border-[#d4d4d4] shadow-md shadow-[#595959] rounded-[20px]'
          : 'text-[#e6883c] w-[60px] h-[60px] border-2 border-[#d4d4d4] shadow-md shadow-[#595959] rounded-[20px]'
      }`}
      onClick={(e) => {
        e.preventDefault();
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
      }}
    >
      {operation}
    </button>
  );
};

export default OperationButtons;
