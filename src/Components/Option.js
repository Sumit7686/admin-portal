import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router';
import { getSpree } from '../Services/DashboardServices';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { refresh } from '../Actions/Refresh';
import { useAppContext } from '../Lib/ContextLib';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#8d8c8c' : 'white',
    '&:hover': {
      background: '#cac4c4'
    }
  }),
  control: (styles) => ({
    // none of react-select's styles are passed to <Control />
    ...styles,
    border: '1px solid #707070',
    borderRadius: '10px',
    display: 'flex',
    '&:hover': {
      borderColor: '#000'
    }
  }),
  menu: (base) => ({
    ...base,
    // override border radius to match the box
    borderRadius: 5,
    marginTop: '3px'
  }),
  menuList: (base) => ({
    ...base,
    height: 'auto'
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    const color = '#707070';
    return { ...provided, transition, color, opacity };
  }
};

function Option(props) {
  let navigate = useNavigate();
  const { setAuthenticated } = useAppContext();

  const [spreeData, setSpreeData] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await props.getSpree();
    if (data.status === 'ok') {
      setSpreeData(data.data);
      dispatch(refresh(data.data[0].id));
    } else if (data.message === 'Unauthorized Request') {
      console.log('call Unauthorized Request', data);
      setAuthenticated(false);
      navigate('/login');
    }
  };

  const [selectedOption, setSelectedOption] = useState(spreeData[0]);

  let options = spreeData.map(function (item) {
    return { value: item.name, label: item.name, id: item.id };
  });

  const data = (data) => {
    dispatch(refresh(data.id));
  };

  return (
    <Select
      defaultValue={selectedOption}
      onChange={(item) => {
        setSelectedOption(item);
        data(item);
      }}
      options={options}
      value={selectedOption === undefined ? options[0] : selectedOption}
      styles={customStyles}
    />
  );
}

function mapStateToProps(state) {
  return { todos: state.spree };
}

export default connect(mapStateToProps, { getSpree })(Option);
