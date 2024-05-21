import React, { createContext, useState, useContext } from 'react';
import Spinner from 'components/spinner/spinner';

const SpinnerContext = createContext();

export const SpinnerProvider = ({ children }) => {
  const [showSpinner, setShowSpinner] = useState(false);

  const show = () => setShowSpinner(true);
  const hide = () => setShowSpinner(false);

  return (
    <SpinnerContext.Provider value={{ show, hide }}>
      {children}
      <Spinner show={showSpinner} />
    </SpinnerContext.Provider>
  );
};

export const useSpinner = () => useContext(SpinnerContext);
