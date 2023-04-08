import {withRouter, Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="main-nav">
      <div className="navBar">
        <Link to="/" className="link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <ul className="list-elements">
          <Link to="/" className="link">
            <li className="list-item">Home</li>
          </Link>
          <Link to="/jobs" className="link">
            <li className="list-item">Jobs</li>
          </Link>
        </ul>
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
        <div className="nav-menu-mobile">
          <ul className="nav-menu-list-mobile">
            <Link to="/">
              <li className="style">
                <AiFillHome className="nav-menu-item-mobile" />
              </li>
            </Link>
            <Link to="/jobs">
              <li>
                <BsFillBriefcaseFill className="nav-menu-item-mobile" />
              </li>
            </Link>
            <li onClick={onClickLogout}>
              <button
                type="button"
                className="nav-mobile-btn"
                onClick={onClickLogout}
              >
                <FiLogOut className="nav-menu-item-mobile" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
