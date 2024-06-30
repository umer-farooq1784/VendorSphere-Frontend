import React from 'react'
import PakFlag from '../static/assets/pakistanFlag.svg'
import ProfileIcon from '../static/assets/profileIcon.svg'
import VerifiedUser from '../static/assets/verified_user.svg'
import LocationIcon from '../static/assets/location.svg'
import WhatsappIcon from '../static/assets/whatsapp.svg'
const ContactDetails = ({ userDetails }) => {
  const openWhatsapp = () => {
    const url = `https://api.whatsapp.com/send?phone=${userDetails.phone}`
    window.open(url, '_blank')
  }
  const sendEmail = () => {
    const emailAddress = userDetails.email
    const subject = 'Your subject here'
    const body = 'Your message here'

    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="md:w-2/6 border-2 rounded-md p4">
      <div className="flex">
        <div className="p-3">
          <img className="w-11 h-11" src={`${userDetails.image}`} alt={ProfileIcon} />
        </div>
        <div className="p-3 font-semibold">{userDetails.name}</div>
      </div>
      <hr className="m-3 mt-0"></hr>
      <div className="p-3 pt-0">
        <div className="flex ">
          <img src={PakFlag} alt="" />
          <p className="text-[#787A80] pl-2">{userDetails.city}</p>
        </div>
        <div className="flex ">
          <img src={VerifiedUser} alt="" />
          <p className="text-[#787A80] pl-2">Verfied Store Owner</p>
        </div>
        <div className="flex ">
          <img src={LocationIcon} alt="" />
          <p className="text-[#787A80] pl-2">{userDetails.address}</p>
        </div>
        <div className="flex flex-col">
          <button
            className="mt-2 p-2 rounded-md border-2 bg-[#127FFF] text-white mb-2"
            onClick={sendEmail}
          >
            Send Email
          </button>
          <button
            className="p-2 rounded-md border-2 flex justify-center items-center"
            onClick={openWhatsapp}
          >
            <img src={WhatsappIcon} alt="WhatsApp" className="h-6 w-6 mr-2" />
            <span>{userDetails.phone}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactDetails
