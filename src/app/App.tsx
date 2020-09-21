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

// --------------------------- TODOs -------------------------------
// Explain usage (make a nice readme)
// -----------------------------------------------------------------


export default function App() {
  return (
    <Router basename={C.APP_BASE_URL}>
      <div>
        <nav className="app-nav">
          <ul>
            <li>
              <Link to={"/"}>Shortcuts</Link>
            </li>
            <li>
              <Link to={C.ENCRYPT_PAGE_URL}>Encrypt a link</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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
  )
}
