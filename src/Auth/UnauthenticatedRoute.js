import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAppContext } from '../Lib/ContextLib';

// axios - api call
// import axios from "axios";

export default function UnauthenticatedRoute({ children, ...rest }) {
  const isAuthenticated = useAppContext().isAuthenticated;
  console.log('unauth :::', useAppContext());

  return (
    <>
      <Route {...rest}>{!isAuthenticated ? children : <Redirect to="/" />}</Route>
    </>
  );
}
