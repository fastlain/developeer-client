import React from 'react';
import { connect } from 'react-redux';

import PageTitle from './PageTitle';
import Notifications from './Notifications';
import Credits from './Credits';
import MyFeedback from './MyFeedback';

export const Dashboard = props => (
    <div>
        <PageTitle>Dashboard</PageTitle>
        <Notifications />
        <Credits credits={props.credit} />
        <MyFeedback />
    </div>
);

const mapStateToProps = state => ({
    credit: state.user.credit
});

export default connect(mapStateToProps)(Dashboard);