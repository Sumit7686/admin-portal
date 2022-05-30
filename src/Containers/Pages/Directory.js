import React from 'react';
import DirectoryTable from './directory/DirectoryTable';
import classes from './css/Directory.module.css';
import plus from '../../Assets/Images/plus.svg';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import { getDirectory, deleteDirectory } from '../../Services/Directory';

function Directory(props) {
  const navigate = useNavigate();

  const [directoryData, setDirectoryData] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [record, setRecord] = React.useState();

  React.useEffect(() => {
    loadData();
  }, [props]);

  const loadData = async () => {
    const data = await props.getDirectory();
    const dataValue = data.filter((item) => item.spree === props.spree);
    setRecord(dataValue.length);
    setDirectoryData(dataValue);
  };

  const addNewData = () => {
    navigate('/directory/new-directory', { state: false });
  };

  const deleteDirectoryData = async (id) => {
    console.log('delete :::', id);
    const data = await props.deleteDirectory(id);
    console.log('deleteDirectoryData :::', data);
    loadData();
  };

  return (
    <div className={classes.mainDirectoryContainer}>
      <div className={classes.directoryTitleContainer}>
        <h1>Directory</h1>
        <p>{record ? record + ' entries found' : 'NaN entries found.'}</p>
      </div>

      <div className={classes.maindirec} style={{ position: 'relative' }}>
        <div
          style={{
            textAlign: 'right',
            margin: '1rem 0',
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
          <div
            style={{
              background: 'white',
              display: 'flex',
              borderRadius: '15px',
              width: '250px',
              boxShadow: '3px 3px 8px rgba(0,0,0,0.1)'
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
        <DirectoryTable
          data={directoryData}
          search={search}
          spree={props.spree}
          delete={deleteDirectoryData}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  // console.log('spree :::', state.spree);
  return { spree: state.spree[0] };
}

export default connect(mapStateToProps, { getDirectory, deleteDirectory })(Directory);

// export default Directory;
