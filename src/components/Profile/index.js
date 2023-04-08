import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class Profile extends Component {
  state = {
    profileData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        profileData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
      console.log('fail')
    }
  }

  getProfileDetails = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-container">
        <div>
          <img src={profileImageUrl} alt="profile" className="profile" />
          <h1 className="name">{name}</h1>
          <p className="short-bio">{shortBio}</p>
        </div>
      </div>
    )
  }

  getTheLoading = () => (
    <div className="loader-containers" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getFailureView = () => (
    <div className="failure">
      <button type="button" className="button" onClick={this.getProfile}>
        Retry
      </button>
    </div>
  )

  getProfileData = () => {
    const {apiStatus} = this.state
    // console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getProfileDetails()
      case apiStatusConstants.failure:
        return this.getFailureView()
      case apiStatusConstants.inprogress:
        return this.getTheLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <div className="side-portion">
          <div>{this.getProfileData()}</div>
          <hr className="line" />
        </div>
      </div>
    )
  }
}
export default Profile
