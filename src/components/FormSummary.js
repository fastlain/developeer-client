import React, { Component } from 'react';
import styles from '../css_modules/FormSummary.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from './Button';

class FormSummary extends Component {
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

    decRequest = () => {
        if (this.props.requests > 0) {
            this.props.decRequest(this.props.id);
        }
    }

    incRequest = () => {
        if (this.props.credit > 0) {
            this.props.incRequest(this.props.id);
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
    }

    render() {

        const removeBtnActive = this.props.requests > 0;
        const removeBtnClass = removeBtnActive ? 'default' : 'disabled';
        const warnClass = (this.state.showWarning && this.props.credit === 0) ? styles.warning : styles.hideWarning;
        const inputWidth = this.props.shareableUrl.length;
        const showDetails = this.state.expanded ? styles.details : styles.detailsHidden;
        const iconType = this.state.expanded ? "minus" : "plus";
        // TODO: Add edit button functionality

        return (
            <div className={styles.formContainer}>

                <div className={styles.formNameWrapper} >
                    <Button btnStyle="background" onClick={this.toggleExpanded} aria-expanded={this.state.expanded}>
                        <h3 className={styles.formName} >{this.props.name}</h3>
                        <FontAwesomeIcon icon={iconType} className="FA right" />
                    </Button>

                    {/* <Button type="button" btnStyle="edit">Edit</Button> */}
                </div>

                <div className={showDetails}>
                    <p className={styles.requestInfo}>Spend Credits to get more feedback from other Developeer users.</p>
                    <div className={styles.pendingRequests}>
                        <span>Pending Requests:</span>
                        <div className={styles.requestButtonWrapper}>
                            <Button type="button" btnStyle={`square ${removeBtnClass}`} onClick={this.decRequest}><FontAwesomeIcon icon="minus" fixedWidth />
                            </Button>
                            <span className={styles.credits}>{this.props.requests}</span>
                            <Button type="button" btnStyle="square" onClick={this.incRequest}>
                                <FontAwesomeIcon icon="plus" fixedWidth />
                            </Button>
                        </div>
                    </div>
                    <p className={warnClass}>Out of credits. Give feedback to earn more</p>

                    <p>-- OR --</p>

                    <div>
                        <p className={styles.requestInfo}>Share this direct link elsewhere:</p>
                        <div className={styles.shareLinkWrapper}>
                            <input ref={this.urlInputRef} type="text" value={this.props.shareableUrl} readOnly size={inputWidth} />
                            <Button type="button" btnStyle="roomySides" onClick={this.copyDirectUrl}>
                                <FontAwesomeIcon icon="copy" className="FA marginRt" /> COPY LINK
                            </Button>
                        </div>
                    </div>
                    <Link to={`/main/reviewfeedback/${this.props.id}`} className="Link btnStyle roomy">
                        REVIEW FEEDBACK
                    </Link>
                </div>
            </div>
        );
    }
}

export default FormSummary;