import React from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import PageRouters from './PageRouters';
import Login from './Containers/Pages/Login';
import ForgotPassword from './Containers/Pages/ForgotPassword';
import Dashboard from './Containers/Pages/Dashboard';
import Information from './Containers/Pages/Information';
import Appearance from './Containers/Pages/Appearance';
import Directory from './Containers/Pages/Directory';
import EventSchedule from './Containers/Pages/EventSchedule';
import Messages from './Containers/Pages/Messages';
import Rewards from './Containers/Pages/Rewards';
import Leaderboards from './Containers/Pages/Leaderboards';
import CreateNewEvent from './Containers/Pages/EventSchedule/EventScheduleCreateNew';
import NewDirectory from './Containers/Pages/directory/NewDirectory';
import NewMessage from './Containers/Pages/Message/NewMessage';
import { getAdminData } from './Services/AuthServices';
import { connect } from 'react-redux';
import axios from 'axios';

// Authorize
import { useAppContext } from './Lib/ContextLib';

function Routers(props) {
  const { isAuthenticated, setAuthenticated } = useAppContext();
  const [ProfileData, setProfileData] = React.useState([]);

  React.useEffect(() => {
    const token = localStorage.getItem('isAuthenticated');
    setAuthenticated(token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    loadData();
  }, []);

  const loadData = async () => {
    const data = await props.getAdminData();
    setProfileData(data);
  };

  return (
    <>
      {isAuthenticated ? (
        <PageRouters ProfileData={ProfileData}>
          <Routes>
            <Route exact path="/dashboard" element={<Dashboard ProfileData={ProfileData} />} />
            <Route exact path="/information" element={<Information />} />
            <Route exact path="/appearance" element={<Appearance />} />
            <Route exact path="/directory" element={<Directory />} />
            <Route exact path="/directory/new-directory" element={<NewDirectory />} />
            <Route exact path="/event-schedule" element={<EventSchedule />} />
            <Route exact path="/event-schedule/new-event" element={<CreateNewEvent />} />
            <Route exact path="/messages" element={<Messages />} />
            <Route exact path="/messages/new-messages" element={<NewMessage />} />
            <Route exact path="/rewards" element={<Rewards />} />
            <Route exact path="/leaderboards" element={<Leaderboards />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </PageRouters>
      ) : (
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { getAdminData })(Routers);
// export default Routers;
