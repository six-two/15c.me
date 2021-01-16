import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import EncryptLink from './EncryptLink';
import ShortcutPage from './ShortcutPage';
import * as C from './Config';
import '../css/main.scss';
import ContextLocalizer from './i18n/ContextLocalizer';
import { FormattedMessage } from 'react-intl';

// --------------------------- TODOs -------------------------------
// Vercels web server does not support support router, so change it to #encrypt or ?page=encrypt

// Support categories for the json file and the react app
//  - put each one in a single table
//  - hide empty categories

// # Idea: make a script that merges all files (redirect.html, sjcl.js, redirect.js, sc.json)
// - Download sjcl.js
// # Bonus points: minimize the resulting file.

// -----------------------------------------------------------------


export default function App() {
  return (
    <ContextLocalizer handle_url_param={true}>
      <Router basename={C.APP_BASE_URL}>
        <div>
          <nav className="app-nav">
            <ul>
              <li>
                <Link to={"/"}><FormattedMessage id="shortcuts" /></Link>
              </li>
              <li>
                <Link to={C.ENCRYPT_PAGE_URL}><FormattedMessage id="encrypt_link_page" /></Link>
              </li>
            </ul>
          </nav>

          <div className="app-page">
            <Switch>
              <Route path={C.ENCRYPT_PAGE_URL}>
                <EncryptLink />
              </Route>
              <Route path="/">
                <ShortcutPage />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ContextLocalizer>
  )
}
