import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import EncryptLink from './EncryptLink';
import ShortcutPage from './ShortcutPage';
import '../css/main.scss';

// --------------------------- TODOs -------------------------------
// Explain usage
// make clicking a shortcut copy its url into your clipboard
// -----------------------------------------------------------------


export default function App() {
  return (
    <Router basename="/view">
      <div>
        <nav className="app-nav">
          <ul>
            <li>
              <Link to={"/"}>Shortcuts</Link>
            </li>
            <li>
              <Link to={"/encrypt"}>Encrypt a link</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <div className="app-page">
          <Switch>
            <Route path="/encrypt">
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
