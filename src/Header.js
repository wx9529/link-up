import React from 'react';
import "./Header.css";
import logo from "./img/logo.png";
import PersonIcon from "@material-ui/icons/Person";
import ForumIcon from "@material-ui/icons/Forum";
import { IconButton } from '@material-ui/core';

function Header() {
  return (
    <div className="header">
      <IconButton>
        <PersonIcon className="header__icon" fontSize="large" />
      </IconButton>
      <IconButton>
        <img
          className="header__logo"
          src={logo}
          alt="link_up logo"
        />
      </IconButton>

      <IconButton>
        <ForumIcon className="header__icon" fontSize="large" />
      </IconButton>
    </div>
  )
}

export default Header