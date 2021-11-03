import { Link } from 'react-router-dom';

export default function Layouts(props) {
  const { children, currentUser, handleLogout } = props;
  return (
    <div>
      <header>
        <Link to='/'><h1>SalesVerse</h1></Link>
        {currentUser ? (
          <div>
            <p>{currentUser.username}</p>
            <Link to='/products'>Products</Link>
            <Link to='/sales'>Sales</Link>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        ) :
          (<div>
            <Link to='/login'>Log In</Link>
            <Link to='/signup'>Sign Up</Link>
          </div>)
        }
      </header>
      {children}
    </div>
  )
}
