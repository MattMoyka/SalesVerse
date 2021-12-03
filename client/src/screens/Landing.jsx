import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './screen.css'
import { Button } from '@mui/material'
import { Collapse } from '@mui/material'
import { Box } from '@mui/system'

export default function Landing(props) {
  const { currentUser } = props
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    setChecked(true)
  }, [])


  return (
    <div>



      <div className='landing-container'>
        <Collapse in={checked}
          {... (checked ? { timeout: 1500 } : {})}
        >
          <Box>
            <div className='landing-text'>
              Welcome to the <span style={{ color: 'blue' }}>SalesVerse!</span>
            </div>
            <div>
              <Link to={currentUser ? '/products' : '/signup'} className='landing-button'>
                <Button variant="contained">Get Started</Button>
              </Link>
            </div>
          </Box>
        </Collapse>
      </div>




    </div >
  )
}
