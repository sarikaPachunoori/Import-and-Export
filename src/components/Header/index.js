import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogoutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <ul className="header-cont">
      <li>
        <Link to="/" className="link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="home-logo"
          />
        </Link>
      </li>

      <li className="home-jobs-cont">
        <Link to="/" className="link">
          <h1 className="header-heading">Home</h1>
        </Link>
        <Link to="/jobs" className="link">
          <h1 className="header-heading">Jobs</h1>
        </Link>
      </li>
      <li>
        <button type="button" className="logout-btn" onClick={onLogoutButton}>
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)
