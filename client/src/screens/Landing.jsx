import { Link } from 'react-router-dom'



export default function Landing(props) {
  const { currentUser } = props
  return (
    <div>

      {currentUser ? (
        <div>

          <Link to='/app'>Dashboard</Link>
        </div>
      ) :

        <div>
          Welcome to the SalesVerse, Are you ready to take you dollar tracking to a whole new level?
          <Link to='/signup'><button>I'm interested</button></Link>
        </div>
      }
    </div>
  )
}
