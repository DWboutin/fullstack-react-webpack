import React from 'react';
import { Link } from 'react-router-dom';

import Icon from 'components/reusables/Icon.react';

function Header() {
  return (
    <div id="header" className="container-fluid">
      <div className="row">
        <div className="col-md-4 col-sm-6 col-xs-6">
          <Link to="/" className="logo">Bakpak</Link>
        </div>
        <div className="col-md-8 col-sm-6 col-xs-6">
          <span className="menu-link"><Icon name="fa-bars" /></span>
        </div>
      </div>
    </div>
  );
}

export default Header;
