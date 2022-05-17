import React from 'react';
import "./Header.css";
import logo from "./img/logo.png";
import PersonIcon from "@material-ui/icons/Person";
import ForumIcon from "@material-ui/icons/Forum";
import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link, useNavigate } from "react-router-dom";


function Header(props) {
  const navigate = useNavigate();
  return (
    <div className="header">
      {props.backButton ? (
        <IconButton onClick={() => navigate(props.backButton, { replace: true })}>
          <ArrowBackIosIcon className="header__icon" fontSize="large" />
        </IconButton>
      ) :
        (<IconButton>
          <PersonIcon className="header__icon" fontSize="large" />
        </IconButton>)
      }

      <Link to="/">
        <IconButton>
          <img
            className="header__logo"
            src={logo}
            alt="link_up logo"
          />
        </IconButton>
      </Link>
      <Link to="/chat">
        <IconButton>
          <ForumIcon className="header__icon" fontSize="large" />
        </IconButton>
      </Link>

    </div >
  )
}

export default Header