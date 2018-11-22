import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { closeNotification } from '../actions';
import requiresLogin from './HOC/requiresLogin';

import PageTitle from './PageTitle';
// import Notifications from './Notifications';
import Credits from './Credits';
import MyFeedback from './MyFeedback';

export class Dashboard extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div>
                <PageTitle>Dashboard</PageTitle>
                {/* <Notifications notifications={props.notifications} closeNotification={props.closeNotification} /> */}
                <Credits credits={this.props.credit} />
                <MyFeedback />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    credit: state.user.credit
    // notifications: state.notifications
});

// const mapDispatchToProps = dispatch => ({
//     closeNotification: id => dispatch(closeNotification(id))
// });

export default requiresLogin()(connect(mapStateToProps)(Dashboard));