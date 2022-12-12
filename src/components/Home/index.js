import Cookies from 'js-cookie'
import {Link, Redirect} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  const onFindJobs = () => <Redirect to="/jobs" />

  return (
    <>
      <Header />
      <div className="home-cont">
        <div className="home-img-cont">
          <div className="home-content-cont">
            <h1 className="home-heading">Find The Job That Fits Your Life </h1>
            <p className="home-para">
              Millions of people are searching for jobs, salary,
              information,company reviews. Find your job that fits your
              abilities and potential.
            </p>
            <Link to="/jobs" className="link">
              <button
                type="button"
                className="find-jobs-btn"
                onClick={onFindJobs}
              >
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
export default Home
