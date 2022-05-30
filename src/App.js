import * as React from 'react';
import './App.css';

import Routers from './Routers';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppContext } from './Lib/ContextLib';

toast.configure();

function App() {
  const [isAuthenticated, setAuthenticated] = React.useState(false);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated
      }}>
      <Routers />
    </AppContext.Provider>
  );
}

export default App;
