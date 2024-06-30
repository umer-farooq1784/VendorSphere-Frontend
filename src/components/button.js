import React from 'react';

const MyButton = ({ onClick, children }) => {
  return (
    <button className="flex ml-auto mt-6 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded" onClick={onClick}>
      {children}
    </button>
  );
};

export default MyButton;
