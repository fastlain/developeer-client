import React, { Component } from 'react';
import styles from '../css_modules/FormSummary.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { showPopup, changeRequests } from '../actions';

import Error from './Error';
import Button from './Button';
import StyledLink from './StyledLink';
import { CLIENT_ORIGIN } from '../config';

export class FormSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showWarning: false,
            expanded: false
        }
        this.urlInputRef = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.credit > 0) {
            this.setState({ showWarning: false });
        }
    }

    // decrease pending requests for this form
    decRequest = () => {
        if (this.props.requests > 0) {
            this.props.dispatch(changeRequests(this.props.id, -1));
        }
    }

    // increase pending requests for this form (if user has available credits)
    incRequest = () => {
        if (this.props.credit > 0) {
            this.props.dispatch(changeRequests(this.props.id, 1));
        } else {
            this.setState({ showWarning: true });
        }
    }

    toggleExpanded = () => {
        this.setState({ expanded: !this.state.expanded });
    }

    // select content of urlInput and copies it to clipboard
    copyDirectUrl = () => {
        this.urlInputRef.current.select();
        document.execCommand('copy');
        this.props.dispatch(showPopup('Copied'));
    }

    render() {

        const removeBtnActive = this.props.requests > 0;
        const removeBtnClass = removeBtnActive ? 'default' : 'disabled';
        const warning = (this.state.showWarning && this.props.credit === 0) ? <Error message="Out of credits. Give feedback to earn more." /> : null;
        const shareableUrl = `${CLIENT_ORIGIN}/#/main/feedback/${this.props.id}`;
        const showDetails = this.state.expanded ? styles.details : styles.detailsHidden;
        const iconType = this.state.expanded ? 'minus' : 'plus';

        return (
            <div className={styles.formContainer}>

                <div className={styles.formNameWrapper} >
                    <Button btnStyle="background" onClick={this.toggleExpanded} aria-expanded={this.state.expanded}>
                        <h3 className={styles.formName} >{this.props.name}</h3>
                        <FontAwesomeIcon icon={iconType} className="FA right" />
                    </Button>
                </div>

                <div className={showDetails}>
                    <StyledLink to={`/main/editForm/${this.props.id}`} className=" topRight">
                        <FontAwesomeIcon icon="edit" title="Edit Form" className="FA" />
                        <span className={styles.btnText}>EDIT</span>
                    </StyledLink>
                    <div className={styles.pendingRequests}>
                        <span>Pending Requests:</span>
                        <div className={styles.requestButtonWrapper}>
                            <Button type="button" btnStyle={`square ${removeBtnClass} lt`} onClick={this.decRequest}>
                                <FontAwesomeIcon icon="minus" title="Remove Request" fixedWidth />
                            </Button>
                            <span className={styles.credits}>{this.props.requests}</span>
                            <Button type="button" btnStyle="square lt" onClick={this.incRequest}>
                                <FontAwesomeIcon icon="plus" title="Add Request" fixedWidth />
                            </Button>
                        </div>
                    </div>
                    {warning}
                    <div>
                        <p className={styles.requestInfo}>Share this direct link elsewhere:</p>
                        <div className={styles.shareLinkWrapper}>
                            <input ref={this.urlInputRef} type="text" value={shareableUrl} readOnly className={styles.urlInput} aria-label="Shareable URL" />
                            <Button type="button" btnStyle="text" onClick={this.copyDirectUrl}>
                                <FontAwesomeIcon icon="copy" title="Copy Link" className="FA" />
                                <span className={styles.btnText}>COPY</span>
                            </Button>
                        </div>
                    </div>
                    <StyledLink to={`/main/reviewfeedback/${this.props.id}`} className="roomyTopBot">
                        REVIEW FEEDBACK
                    </StyledLink>
                </div>
            </div>
        );
    }
}

export default connect()(FormSummary);