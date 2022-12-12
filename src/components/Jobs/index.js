import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import {BsSearch, BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import Header from '../Header'
import FilterGroup from '../FilterGroup'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    searchInput: '',
    activeJobType: '',
    activeSalary: '',
    profileStatus: apiConstants.initial,
    jobStatus: apiConstants.initial,
    profileDetails: [],
    jobDetails: [],
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedProfile = {
        name: data.profile_details.name,
        profileImgUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedProfile,
        profileStatus: apiConstants.success,
      })
    } else {
      this.setState({profileStatus: apiConstants.failure})
    }
  }

  getJobDetails = async () => {
    this.setState({jobStatus: apiConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const {activeJobType, activeSalary, searchInput} = this.state
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeJobType}&minimum_package=${activeSalary}&
    search=${searchInput}`
    const option = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const responseVal = await fetch(jobsApiUrl, option)
    if (responseVal.ok === true) {
      const dataVal = await responseVal.json()
      const updatedJobs = dataVal.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        empType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobDetails: updatedJobs,
        jobStatus: apiConstants.success,
      })
    } else {
      this.setState({jobStatus: apiConstants.failure})
    }
  }

  renderProfileSuccess = () => {
    const {profileDetails} = this.state
    const {profileImgUrl, name, shortBio} = profileDetails
    return (
      <div className="profile-img">
        <img src={profileImgUrl} alt="profile" />
        <h1 className="name">{name} </h1>
        <p className="bio">{shortBio} </p>
      </div>
    )
  }

  onClickProfileRetry = () => {
    this.getProfileDetails()
  }

  renderProfileFailure = () => (
    <div className="profile-cont">
      <button
        type="button"
        className="retry-butn"
        onClick={this.onClickProfileRetry}
      >
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileSwitch = () => {
    const {profileStatus} = this.state

    switch (profileStatus) {
      case apiConstants.inProgress:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderProfileSuccess()
      case apiConstants.failure:
        return this.renderProfileFailure()
      default:
        return null
    }
  }

  renderJobsList = jobsItem => {
    const {
      companyLogoUrl,
      empType,
      jobDescription,
      location,
      id,
      rating,
      packagePerAnnum,
      title,
    } = jobsItem

    return (
      <Link to={`/jobs/${id}`} className="link">
        <div className="job-top-view-cont">
          <div className="job-logo-rating-cont">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="title-rating-cont">
              <h1 className="title">{title} </h1>
              <div className="star-rating-cont">
                <BsStarFill className="star" />
                <p className="rating">{rating} </p>
              </div>
            </div>
          </div>
          <div className="location-salary-cont">
            <div className="location-cont">
              <MdLocationOn className="location" />
              <p className="location-name">{location} </p>

              <BsBriefcaseFill className="suitcase" />
              <p className="suitcase-name">{empType} </p>
            </div>
            <p className="package">{packagePerAnnum} </p>
          </div>
        </div>
        <hr className="hr-line" />
        <h1 className="description">Description</h1>
        <p className="info">{jobDescription} </p>
      </Link>
    )
  }

  renderCompanySuccessView = () => {
    const {jobDetails} = this.state
    const showCompanies = jobDetails.length > 0

    return showCompanies ? (
      <ul className="job-detail-list-cont">
        {jobDetails.map(company => (
          <li className="job-item-cont" key={company.id}>
            {this.renderJobsList(company)}
          </li>
        ))}
      </ul>
    ) : (
      <div className="no-jobs-found-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-para">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  onClickRetryCompany = () => {
    this.getJobDetails()
  }

  renderCompanyFailureView = () => (
    <div className="oops-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="oops-heading">Oops! Something Went Wrong</h1>
      <p className="oops-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-butn"
        type="button"
        onClick={this.onClickRetryCompany}
      >
        Retry
      </button>
    </div>
  )

  renderJobsSwitch = () => {
    const {jobStatus} = this.state

    switch (jobStatus) {
      case apiConstants.inProgress:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderCompanySuccessView()
      case apiConstants.failure:
        return this.renderCompanyFailureView()
      default:
        return null
    }
  }

  onClickSearchButton = () => {
    this.getJobDetails()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  selectJobType = activeJobType => {
    this.setState({activeJobType}, this.getJobDetails)
  }

  selectSalaryRange = activeSalary => {
    this.setState({activeSalary}, this.getJobDetails)
  }

  render() {
    const {searchInput, activeJobType, activeSalary} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="profile-container">
            {this.renderProfileSwitch()}
            <FilterGroup
              searchInput={searchInput}
              activeJobType={activeJobType}
              activeSalary={activeSalary}
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              selectJobType={this.selectJobType}
              selectSalaryRange={this.selectSalaryRange}
            />
          </div>
          <div className="companies-container">
            <div className="search-cont">
              <input
                type="search"
                value={searchInput}
                className="search-bar"
                placeholder="search"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                className="search-icon-butn"
                onClick={this.onClickSearchButton}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsSwitch()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
