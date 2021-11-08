import { Link, Redirect } from 'react-router-dom'
import './screen.css'
import { Button } from '@mui/material'

export default function Landing(props) {
  const { currentUser } = props
  return (
    <div>

      {currentUser ? (
        <div>

          <Redirect to='/products' />
        </div>
      ) :
        <div className='landing-page'>
          <div className='landing-container'>
            <div className='landing-text'>
              Welcome to the SalesVerse, Are you ready to incorporate the most modern sales tracking technique into your business?
            </div>
            <Link to='/signup' className='landing-button'><Button variant="contained">I'm interested</Button></Link>
          </div>
        </div>
      }
    </div>
  )
}
