const iState = {
  data: [],
  loader: false,
  spree: ''
};

const Reducer = (state = iState, action) => {
  switch (action.type) {
    case 'REFRESH':
      return {
        spree: [action.payload]
      };
    case 'LOGIN':
      return {
        data: [action.payload]
      };
    default:
      return state;
  }
};

export default Reducer;
