import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAppContext } from '../Lib/ContextLib';

// axios - api call
// import axios from "axios";

export default function AuthenticatedRoute({ children, ...rest }) {
  const isAuthenticated = useAppContext().isAuthenticated;

  return (
    <>
      <Route {...rest}>{isAuthenticated ? children : <Redirect to="/login" />}</Route>
    </>
  );
}
