import { Link, Switch, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavHome from './NavHome';
import NavInfo from './NavInfo';
import './Layouts.css'

export default function Layouts(props) {
  const { children, currentUser, handleLogout } = props;
  const location = useLocation()

  const navbar = () => {
    switch (location.pathname) {
      case '/': return <NavHome children={children} currentUser={currentUser} handleLogout={handleLogout} />;
      case '/login': return <NavHome children={children} currentUser={currentUser} handleLogout={handleLogout} />;
      case '/signup': return <NavHome children={children} currentUser={currentUser} handleLogout={handleLogout} />;
      default: return <NavInfo children={children} currentUser={currentUser} handleLogout={handleLogout} />;
    }
  }

  return (
    <div className='nav'>{navbar()}</div>
  )





}
