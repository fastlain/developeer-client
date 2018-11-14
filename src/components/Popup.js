import React from 'react';
import { connect } from 'react-redux';
import styles from '../css_modules/Popup.module.css';

const Popup = ({ message }) => {

    let content = message.length > 0 ?
        <p className={styles.popup}>{message}</p> :
        null;

    return (
        <div>{content}</div>
    );
}

const mapStateToProps = state => ({
    message: state.popup
});

export default connect(mapStateToProps)(Popup);