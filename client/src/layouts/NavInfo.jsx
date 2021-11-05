import './Layouts.css'
import { Link, Switch, useLocation, Redirect } from 'react-router-dom';
export default function NavInfo(props) {
  const { children, currentUser, handleLogout } = props;
  return (
    <div >
      <header className='sidebar'>
        <Link to='/'><h1 className='header-title' id='nodec'>SalesVerse</h1></Link>
        {currentUser ? (
          <div className='navinfo-text'>
            <div className='navinfo-subtext'>
              <p>Welcome back, {currentUser.username}</p>
              <Link to='/products' id='nodec'>Products</Link>
              <Link to='/sales' id='nodec'>Sales</Link>
            </div>
            <button onClick={handleLogout} id='logout-button'>Log Out</button>
          </div>
        ) :
          (<div className='navinfo-text-signedout'>
            <Link to='/login' id='nodec'>Log In</Link>
            <Link to='/signup' id='nodec'>Sign Up</Link>
          </div>)
        }
      </header>
      {children}
    </div >
  )
}
