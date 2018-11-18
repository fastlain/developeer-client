import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import requiresLogin from './HOC/requiresLogin';
import styles from '../css_modules/ReviewFeedback.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API_BASE_URL } from '../config';

import PageTitle from './PageTitle';
import TableRow from './TableRow';
import ExternalLinkBtn from './ExternalLinkBtn';
import ViewFeedback from './ViewFeedback';

export class ReviewFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: []
        }
    }

    componentDidMount = () => {
        this.getReviews();
    }

    // fetch reviews for current form
    getReviews = () => {
        fetch(`${API_BASE_URL}/reviews/byForm/${this.props.match.params.id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.props.authToken}`
            },
        })
            .then(res => res.json())
            .then(({ reviews }) => {
                // populate review authors and get Date objects from review.date strings
                const promises = reviews.map(review => {

                    review.dateObj = new Date(review.date);
                    if (review.reviewerId) {
                        return fetch(`${API_BASE_URL}/users/${review.reviewerId}`)
                            .then(res => res.json())
                            .then(author => {
                                review.reviewerName = author.username;
                                return review;
                            })
                            .catch(err => console.error(err));
                    } else {
                        return Promise.resolve(review);
                    }
                });
                Promise.all(promises).then(reviewsWithAuthors => {
                    this.setState({ reviews: reviewsWithAuthors });
                })

            })
            .catch(err => {
                // TODO: create action and state handlers for auth errors
                // dispatch(authError(err));
                console.error(err);
            });
    }

    render() {

        // get formId from url parameter and corresponding form data and reviews
        const formId = this.props.match.params.id;
        const formData = this.props.forms.find(form => form._id === formId);

        // generate table rows from 
        const tableContents = this.state.reviews.map((review, index) => {
            const userIcon = review.reviewerId ? <FontAwesomeIcon icon="user" className="FA marginRt" /> : null;
            const cells = [
                <Link to={`${this.props.match.url}/view/${review._id}`} className="Link btnStyle">VIEW</Link>,
                <span>{userIcon}{review.reviewerName}</span>,
                `${review.dateObj.toLocaleString()}`,
            ];
            const rowStyle = (index % 2 === 0) ? 'even' : 'odd';
            return (
                <TableRow cells={cells} key={index} rowStyle={rowStyle} />
            );
        });

        const tableHeadings = ['', 'Reviewer', 'Date'];

        return (
            <div>
                <Link to="/main/dashboard" className="Link btnStyle roomy">
                    <FontAwesomeIcon icon="long-arrow-alt-left" size="lg" /> DASHBOARD
                </Link>
                <PageTitle>Review Feedback</PageTitle>
                <h2 className={styles.formName}>Form: <span className={styles.innerHeading}>{formData.name}</span></h2>
                <div className={styles.center}>
                    <ExternalLinkBtn href={formData.projectUrl}>
                        VISIT PAGE
                    </ExternalLinkBtn>
                </div>
                <h3 className={styles.center}>Reviews Received: <span className={styles.innerHeading}>{this.state.reviews.length}</span></h3>
                <div className={styles.table}>
                    <TableRow cells={tableHeadings} rowStyle="heading"></TableRow>
                    {tableContents}
                </div>

                <Route exact path={`${this.props.match.url}/view/:reviewId`} render={props => <ViewFeedback {...props} versions={formData.versions} reviews={this.state.reviews} />} />
            </div >
        );
    }
}

const mapStateToProps = state => ({
    forms: state.user.forms,
    authToken: state.authToken
});

export default requiresLogin()(connect(mapStateToProps)(ReviewFeedback));