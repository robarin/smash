import { SHOW_FLASH_MESSAGE, HIDE_FLASH_MESSAGE } from '@actions/flash';

const initialState = {
  show: false,
  title: '',
  text: '',
  type: ''
};

const flashReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SHOW_FLASH_MESSAGE.TYPE:
      return {...payload, show: true};
    case HIDE_FLASH_MESSAGE.TYPE:
      return initialState;
    default:
      return state;
  }
};

export default flashReducer;
