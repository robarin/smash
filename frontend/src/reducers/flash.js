import { SHOW_FLASH_MESSAGE, HIDE_FLASH_MESSAGE } from '../actions/flash';

const initialState = {
  show: false,
  title: '',
  text: '',
  type: ''
};

const flashReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_FLASH_MESSAGE:
      return action.payload;
    case HIDE_FLASH_MESSAGE:
      return initialState;
    default:
      return state;
  }
};

export default flashReducer;
