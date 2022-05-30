import React from 'react';
import classes from './EventSchedule.module.css';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { getEvent, deleteEvent } from '../../Services/EventSchedule';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';

import EventScheduleTable from './EventSchedule/EventScheduleTable';
import EventScheduleTableForm from './EventSchedule/EventScheduleTableForm';
import plus from '../../Assets/Images/plus.svg';

function EventSchedule(props) {
  const [getEventDataDays, setGetEventDataDays] = React.useState([]);
  const [getEventData, setGetEventData] = React.useState([]);
  const [search, setSearch] = React.useState('');

  let navigate = useNavigate();

  React.useEffect(() => {
    loadData();
  }, [props]);

  const loadData = async () => {
    const data = await props.getEvent(props.spree);
    if (data.status === 'error') {
      setGetEventDataDays(data);
      setGetEventData(data);
    } else {
      // console.log('spree loadData event schedule ::: ', data);
      setGetEventDataDays(data.days);
      setGetEventData(data);
    }
  };

  const deleteData = async (id) => {
    const data = await props.deleteEvent({ id, spree: props.spree });
    console.log('deleteData data :::', data);
    loadData();
  };

  const addNewData = () => {
    navigate('/event-schedule/new-event', { state: false });
  };

  return (
    <>
      <div className={classes.mainEventScheduleContainer}>
        <Typography sx={{ fontSize: '48px', fontFamily: 'Magdelin-Black', color: '#121212' }}>
          Event Schedule
        </Typography>
        <Typography
          paragraph
          sx={{ fontSize: '24px', fontFamily: 'Magdelin-Medium', color: '#707070' }}>
          Event Schedule (Limit 7 Days)
        </Typography>
        <div className={classes.eventMain} style={{ display: 'flex' }}>
          <div className={classes.form} style={{ width: '27%' }}>
            <EventScheduleTableForm data={getEventData} />
          </div>
          <div className={classes.table}>
            <div
              style={{
                textAlign: 'right',
                margin: '0 0 1.3rem',
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
              <div
                style={{
                  background: 'white',
                  display: 'flex',
                  borderRadius: '15px',
                  width: '250px',
                  boxShadow: '3px 3px 8px rgba(0,0,0,0.1)',
                  height: '3rem'
                }}>
                <IconButton type="submit" sx={{ p: '10px 5px 10px 10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
                <InputBase
                  sx={{ p: '3.5px 0 0 5px', font: '18px' }}
                  placeholder="Search..."
                  inputProps={{ 'aria-label': 'search google maps' }}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div style={{ marginLeft: '3%', display: 'flex' }}>
                <Button
                  sx={{
                    backgroundColor: 'black',
                    fontFamily: 'Magdelin-Bold',
                    fontSize: '15px',
                    borderRadius: '10px',
                    width: '200px',
                    display: 'flex',
                    color: '#fff'
                  }}
                  onClick={() => addNewData()}>
                  <div style={{ width: '40px' }}>
                    <img src={plus} alt="Add_Icon" style={{ padding: '0.1rem 0 0.2rem' }} />
                  </div>
                  <div style={{ width: '160px', paddingRight: '20px', letterSpacing: '0.2em' }}>
                    Add New
                  </div>
                </Button>
              </div>
            </div>
            <EventScheduleTable
              data={getEventDataDays}
              getEventData={getEventData}
              deleteData={deleteData}
              search={search}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return { spree: state.spree[0] };
}

export default connect(mapStateToProps, { getEvent, deleteEvent })(EventSchedule);
