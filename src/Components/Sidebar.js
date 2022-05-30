import React from 'react';
import classes from './css/Sidebar.module.css';
import { NavLink } from 'react-router-dom';
import Option from './Option';
import logo from '../Assets/Images/logo.svg';
import dashboard from '../Assets/Images/dashboard.svg';
import information from '../Assets/Images/information.svg';
import appearance from '../Assets/Images/appearance.svg';
import directory from '../Assets/Images/directory.svg';
import eventschedule from '../Assets/Images/eventschedule.svg';
import messages from '../Assets/Images/messages.svg';
import rewards from '../Assets/Images/rewards.svg';
import leaderboards from '../Assets/Images/leaderboards.svg';
import settings from '../Assets/Images/settings.svg';
import { logout } from '../Services/AuthServices';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import Loader from './Loader';
import { useAppContext } from '../Lib/ContextLib';

const list = [
  { name: 'Dashboard', img: dashboard, path: 'dashboard' },
  { name: 'Information', img: information, path: 'information' },
  { name: 'Appearance', img: appearance, path: 'appearance' },
  { name: 'Directory', img: directory, path: 'directory' },
  { name: 'Event-Schedule', img: eventschedule, path: 'event-schedule' },
  { name: 'Messages', img: messages, path: 'messages' },
  { name: 'Rewards', img: rewards, path: 'rewards' },
  { name: 'Leaderboards', img: leaderboards, path: 'leaderboards' }
];

const Sidebar = (props) => {
  const { setAuthenticated } = useAppContext();

  let navigate = useNavigate();
  const [loader, setLoader] = React.useState(false);

  const logoutAdmin = async () => {
    setLoader(true);
    const data = await props.logout();
    setAuthenticated(false);
    data && navigate('/login');
    console.log('logout :::', data);
    setLoader(false);
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className={classes.mainSidebarContainer}>
          <div className={classes.logoContainer}>
            <img src={logo} alt="Carat_App_Logo" />
            <h1>Carat Apps</h1>
            <p>Destination Dashboard</p>
          </div>
          <hr />
          <div className={classes.navLinksWithSelectContainer}>
            <div style={{ width: '80%', margin: '0 auto' }} className={classes.optionContainer}>
              <Option />
            </div>
            <div className={classes.navLinksContainer}>
              {list.map((text) => (
                <NavLink
                  to={`/${text.path}`}
                  key={text.name}
                  className={({ isActive }) => `nav_links ${isActive ? 'active' : ''}`}
                  style={({ isActive }) => {
                    return {
                      color: isActive && '#fff',
                      background: isActive && '#000'
                    };
                  }}>
                  <span style={{ padding: '0 2rem' }}>
                    <img
                      src={text.img}
                      alt=""
                      style={{
                        marginRight: '0.6rem',
                        paddingBottom: '0.3rem',
                        paddingTop: '0.1rem'
                      }}
                    />
                    <span>{text.name}</span>
                  </span>
                  <br />
                </NavLink>
              ))}
            </div>
          </div>
          <hr />
          <div className={`${classes.navLinksContainer} ${classes.settingsContainer}`}>
            <NavLink
              to={`/Settings`}
              className={({ isActive }) => `nav_link ${isActive ? 'active' : ''}`}
              style={({ isActive }) => {
                return {
                  color: isActive && '#fff',
                  background: isActive && '#000'
                };
              }}>
              <span style={{ padding: '0 2rem' }}>
                <img
                  src={settings}
                  alt=""
                  style={{ marginRight: '0.6rem', paddingBottom: '0.3rem', paddingTop: '0.1rem' }}
                />
                <span>Settings</span>
              </span>
            </NavLink>
          </div>
          <hr />
          <div className={classes.logoutContainer}>
            <h3>{props.ProfileData.name}</h3>
            <p onClick={logoutAdmin}>Logout</p>
          </div>
        </div>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return { spree: state.spree };
}

export default connect(mapStateToProps, { logout })(Sidebar);

// export default Sidebar;
