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
            <button onClick={handleLogout}>Log Out</button>
          </div>
        ) : null}
      </header>
      {children}
    </div>
  )
}
