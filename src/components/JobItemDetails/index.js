import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {GoLinkExternal} from 'react-icons/go'
import SimilarJobs from '../SimilarJobs'
import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    detailedView: [],
    similarView: [],
    jobItemStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getItemDetails()
  }

  getItemDetails = async () => {
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const dataItem = await response.json()
      const data = dataItem.job_details
      const updatedJobDetails = {
        id: data.id,
        companyLogoUrl: data.company_logo_url,
        websiteUrl: data.company_website_url,
        employmentType: data.employment_type,
        title: data.title,
        rating: data.rating,
        location: data.location,
        jobDesc: data.job_description,
        lifeAtCompany: data.life_at_company,
        packagePerAnnum: data.package_per_annum,
        skills: data.skills.map(eachSkill => ({
          name: eachSkill.name,
          skillImg: eachSkill.image_url,
        })),
      }
      const similarJobs = dataItem.similar_jobs.map(eachSimilar => ({
        id: eachSimilar.id,
        companyLogoUrl: eachSimilar.company_logo_url,
        employmentType: eachSimilar.employment_type,
        title: eachSimilar.title,
        jobDesc: eachSimilar.job_description,
        rating: eachSimilar.rating,
        location: eachSimilar.location,
      }))
      console.log(similarJobs)
      this.setState({
        detailedView: updatedJobDetails,
        similarView: similarJobs,
        jobItemStatus: apiConstants.success,
      })
    } else {
      this.setState({jobItemStatus: apiConstants.failure})
    }
  }

  renderJobItemSuccessView = () => {
    const {detailedView} = this.state
    const {
      companyLogoUrl,
      rating,
      title,
      location,
      employmentType,
      websiteUrl,
      jobDesc,
      packagePerAnnum,
      lifeAtCompany,
      skills,
    } = detailedView
    return (
      <div className="detailed-view-page">
        <div className="detailed-view-cont">
          <div className="job-top-view-cont">
            <div className="job-logo-rating-cont">
              <img
                src={companyLogoUrl}
                alt=" job details company logo"
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
                <p className="suitcase-name">{employmentType} </p>
              </div>
              <p className="package">{packagePerAnnum} </p>
            </div>
          </div>
          <hr className="line-view" />
          <div className="desc-visit-cont">
            <h1 className="view-description">Description</h1>
            <div className="visit-cont">
              <a
                href={websiteUrl}
                rel="noreferrer"
                target="_blank"
                className="anchor"
              >
                <p className="visit">Visit</p>
                <GoLinkExternal className="go-link" />
              </a>
            </div>
          </div>

          <p className="info">{jobDesc} </p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list-cont">
            {skills.map(skill => (
              <li className="skill-item" key={skill.id}>
                <img
                  src={skill.skillImg}
                  alt={skill.name}
                  className="skill-img"
                />
                <p className="skill-name">{skill.name} </p>
              </li>
            ))}
          </ul>
          <h1 className="skills-heading">Life at Company</h1>
          <div className="desc-img-cont">
            <p className="life-at-para">{lifeAtCompany.description} </p>
            <img
              src={lifeAtCompany.image_url}
              alt="life at company"
              className="life-at-img"
            />
          </div>
        </div>
        {this.renderSimilarJobsPage()}
      </div>
    )
  }

  renderSimilarJobsPage = () => {
    const {similarView} = this.state

    return (
      <ul className="similar-jobs-cont">
        <h1>Similar Jobs</h1>
        {similarView.map(similar => (
          <SimilarJobs key={similar.id} similarDetails={similar} />
        ))}
      </ul>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetryJobItem = () => {
    this.getItemDetails()
  }

  renderJobItemFailureView = () => (
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
        onClick={this.onClickRetryJobItem}
      >
        Retry
      </button>
    </div>
  )

  renderJobItemSwitch = () => {
    const {jobItemStatus} = this.state

    switch (jobItemStatus) {
      case apiConstants.inProgress:
        return this.renderLoaderView()
      case apiConstants.success:
        return this.renderJobItemSuccessView()
      case apiConstants.failure:
        return this.renderJobItemFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="page">{this.renderJobItemSwitch()}</div>
      </>
    )
  }
}

export default JobItemDetails
