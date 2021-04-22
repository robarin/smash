import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import Flash from './Flash';
import {hideFlashMessage} from '@actions/flash';

const FLASH_DELAY_MS = 3000;

const FlashDelay = (props) => {
  const { flashMessage, hideFlashMessage } = props;
  const { type, title, text } = flashMessage;

  useEffect(() => {
    const timeout = setTimeout(() => hideFlashMessage(), FLASH_DELAY_MS);
    return () => clearTimeout(timeout);
  }, []);

  return(
    <Flash type={type} title={title} text={text} active={flashMessage.show} hide={hideFlashMessage} />
  )
}

const mapStateToProps = (state) => ({
  flashMessage: state.flashMessage,
})

const mapDispatchToProps = {
  hideFlashMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(FlashDelay);
