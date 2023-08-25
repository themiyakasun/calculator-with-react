/* eslint-disable default-case */
import React from 'react';
import { useReducer } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { ACTIONS } from './Actions.js';
import DigitButtons from './DigitButtons.jsx';
import OperationButtons from './OparationButton.jsx';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite === true) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === '0' && state.currentOperand === '0') return state;
      if (payload.digit === '.' && state.currentOperand.includes('.'))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null)
        return state;
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite === true) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
};

const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(curr)) return '';
  let computation = '';

  switch (operation) {
    case '+':
      computation = prev + curr;
      break;
    case '-':
      computation = prev - curr;
      break;
    case '*':
      computation = prev * curr;
      break;
    case '/':
      computation = prev / curr;
      break;
  }
  return computation.toString();
};

const Calc = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className='bg-black w-[300px] h-auto'>
      <form action=''>
        <div className='w-full h-[70px] border-b-2 border-b-slate-100 '>
          <span className='text-white float-right'>
            {previousOperand} {operation}
          </span>
          <input
            type='text'
            className='text-white text-xl w-full h-full p-5 border-0 focus:outline-none bg-transparent text-right'
            value={currentOperand == null ? '' : currentOperand}
          />
        </div>
        <div className='flex justify-between m-3'>
          <button
            className='text-[#e6883c] w-[60px] h-[60px] border-2 border-[#d4d4d4] shadow-md shadow-[#595959] rounded-[20px]'
            onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          >
            AC
          </button>
          <button
            className='text-[#e6883c] w-[60px] h-[60px] border-2 border-[#d4d4d4] shadow-md shadow-[#595959] rounded-[20px] flex items-center justify-center text-lg'
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: ACTIONS.DELETE_DIGIT });
            }}
          >
            <AiOutlineCloseCircle />
          </button>
          <OperationButtons operation='%' dispatch={dispatch} />
          <OperationButtons operation='/' dispatch={dispatch} />
        </div>
        <div className='flex justify-between m-3'>
          <DigitButtons digit='7' dispatch={dispatch} />
          <DigitButtons digit='8' dispatch={dispatch} />
          <DigitButtons digit='9' dispatch={dispatch} />
          <OperationButtons operation='*' dispatch={dispatch} />
        </div>
        <div className='flex justify-between m-3'>
          <DigitButtons digit='4' dispatch={dispatch} />
          <DigitButtons digit='5' dispatch={dispatch} />
          <DigitButtons digit='6' dispatch={dispatch} />
          <OperationButtons operation='-' dispatch={dispatch} />
        </div>
        <div className='flex justify-between m-3'>
          <DigitButtons digit='1' dispatch={dispatch} />
          <DigitButtons digit='2' dispatch={dispatch} />
          <DigitButtons digit='3' dispatch={dispatch} />
          <OperationButtons operation='+' dispatch={dispatch} />
        </div>
        <div className='flex justify-between m-3 pb-2'>
          <DigitButtons digit='0' dispatch={dispatch} />
          <DigitButtons digit='.' dispatch={dispatch} />
          <button
            className='text-white bg-[#e6883c] w-[60px] h-[60px] border-2 border-[#d4d4d4] shadow-md shadow-[#595959] rounded-[20px]'
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: ACTIONS.EVALUATE });
            }}
          >
            =
          </button>
        </div>
      </form>
    </div>
  );
};

export default Calc;
