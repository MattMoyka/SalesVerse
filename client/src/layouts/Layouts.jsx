import { Link } from 'react-router-dom';

export default function Layouts(props) {
  const { children, currentUser, handleLogout } = props;
  return (
    <div>
      <header>
        <h1>SalesVerse</h1>
        {currentUser ? (
          <div>
            <p>{currentUser.username}</p>
          </div>
        ) : null}
      </header>
      {children}
    </div>
  )
}
