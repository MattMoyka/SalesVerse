import './Layouts.css'
import { Link, Switch, useLocation } from 'react-router-dom';
export default function NavHome(props) {
  const { children, currentUser, handleLogout } = props;
  return (
    <div >
      <header className='header'>
        <Link to='/' id='nodec'><h1 className='header-title' >SalesVerse</h1></Link>
        {currentUser ? (
          <div className='header-text'>
            <p>Welcome back, {currentUser.username}</p>
            <Link to='/products' id='nodec'>Products</Link>
            <Link to='/sales' id='nodec'>Sales</Link>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        ) :
          (<div className='header-text'>
            <Link to='/login' id='nodec'>Log In</Link>
            <Link to='/signup' id='nodec'>Sign Up</Link>
          </div>)
        }
      </header>
      {children}
    </div >
  )
}
