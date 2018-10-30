import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LandingPageLayout from './LandingPageLayout';
import MainLayout from './MainLayout';

// import fontawesome icons and add to library
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowsAltH, faAngleRight, faAngleDown, faPlus, faMinus, faTimes, faCopy, faExternalLinkAlt, faLongArrowAltLeft, faEdit, faUser } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowsAltH, faAngleRight, faAngleDown, faPlus, faMinus, faTimes, faCopy, faExternalLinkAlt, faLongArrowAltLeft, faEdit, faUser);

const App = () => (
    <Router>
        <div>
            <Route exact path="/" component={LandingPageLayout} />
            <Route path="/userform/" component={LandingPageLayout} />
            <Route path="/main" component={MainLayout} />
        </div>
    </Router>
);

export default App;
