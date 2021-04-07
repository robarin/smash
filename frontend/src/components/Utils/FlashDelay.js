import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import Flash from './Flash';
import {hideFlashMessage} from '../../actions/flash';

const FLASH_DELAY_MS = 3000;

const FlashDelay = (props) => {
  const { dispatch, flashMessage, hideFlashMessage } = props;
  const { type, title, text } = flashMessage;
  
  const hideFlash = () => {
    dispatch(hideFlashMessage());
  }
  
  useEffect(() => {
    const timeout = setTimeout(() => hideFlash(), FLASH_DELAY_MS);
    return () => clearTimeout(timeout);
  }, []);
  
  return(
    <Flash type={type} title={title} text={text} active={flashMessage.show} hide={hideFlash} />
  )
}

const mapStateToProps = (state) => ({
  flashMessage: state.flashMessage,
})

const mapDispatchToProps = dispatch => ({
  hideFlashMessage,
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(FlashDelay);


