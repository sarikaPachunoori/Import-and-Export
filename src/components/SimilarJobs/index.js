import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'

import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobDetails = props => {
  const {similarDetails} = props
  const {
    companyLogoUrl,
    rating,
    title,
    location,
    employmentType,
    jobDesc,
  } = similarDetails

  return (
    <li className="similar-item-cont">
      <div className="job-logo-rating-cont">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="similar-title">Description</h1>
      <p className="similar-desc">{jobDesc} </p>
      <div className="location-cont">
        <MdLocationOn className="location" />
        <p className="location-name">{location} </p>

        <BsBriefcaseFill className="suitcase" />
        <p className="suitcase-name">{employmentType} </p>
      </div>
    </li>
  )
}

export default SimilarJobDetails
