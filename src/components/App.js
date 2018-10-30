import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainLayout from './MainLayout';

// import fontawesome icons and add to library
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowsAltH, faPlus, faMinus, faTimes, faCopy, faExternalLinkAlt, faLongArrowAltLeft, faEdit, faUser } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowsAltH, faPlus, faMinus, faTimes, faCopy, faExternalLinkAlt, faLongArrowAltLeft, faEdit, faUser);

const App = () => (
    <Router>
        <Route path="/" component={MainLayout} />
    </Router>
);

export default App;
