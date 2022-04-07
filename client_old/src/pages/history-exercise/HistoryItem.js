import React from 'react'
import './styles.scoped.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const HistoryItem = (props) => {
  const { courseName, categoryName, userName, courseImage, score, status, createdAt, userImage } = props
  return (
    <div className="container">
      <ul className="timeline">
        <li>
          <div className="timeline-time">
            <span className="date">Date Create</span>
            <span className="time">{new Date(createdAt).toLocaleString()}</span>
          </div>
          <div className="timeline-icon">
            <a href="#">&nbsp;</a>
          </div>
          <div className="timeline-body">
            <div className="timeline-header">
              <span className="userimage">
                <img src={userImage} alt="" />
              </span>
              <span className="username"><a href="#">{userName}</a> <small /></span>
            </div>
            <div className="timeline-content">
              <div className='timeline-image'>
                <div>
                  <LazyLoadImage
                    src={courseImage}
                    alt={courseName}
                    effect="blur"
                    height={100}
                    width={300}
                  />
                </div>
                <div className='timeline-text-content'>
                  <p className="category-text">{categoryName}</p>
                  <p className="stats-text">Course name: {courseName}</p>
                  <p className="stats-text">Score: {score} </p>
                  <p className="stats-text">Status: {status === 0 ? 'Fail' : 'Success'}</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default HistoryItem