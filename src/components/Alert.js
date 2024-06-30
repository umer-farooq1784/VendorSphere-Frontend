import React from 'react'
import AlertIcon from '../static/assets/AlertIcon.svg'
import CrossIcon from '../static/assets/CrossIcon.svg'

const Alert = ({ content }) => {
  return (
    <div className="w-full h-full bg-white  flex items-center justify-center">
      <div className="pt-9 pb-9 pl-10 pr-10">
        <div className="flex">
          <img src={AlertIcon} alt="Alert Icon" />
          <p className="flex items-center">{content}</p>
        </div>
      </div>
    </div>
  )
}

export default Alert
