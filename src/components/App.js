import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import MainLayout from './MainLayout';

// import fontawesome icons and add to library
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowsAltH, faPlus, faMinus, faTimes, faCopy, faExternalLinkAlt, faLongArrowAltLeft, faEdit, faUser, faStar, faEnvelope, faArrowLeft, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
library.add(faArrowsAltH, faPlus, faMinus, faTimes, faCopy, faExternalLinkAlt, faLongArrowAltLeft, faEdit, faUser, faStar, faEnvelope, faLinkedin, faGithub, faArrowLeft, faChevronLeft);

const App = () => (
    <Router>
        <Route path="/" component={MainLayout} />
    </Router>
);

export default App;
