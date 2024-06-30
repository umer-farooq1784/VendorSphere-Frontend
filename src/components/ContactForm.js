import React, { useState } from "react";
import Fb from "../static/assets/fbIcon.svg";
import Insta from "../static/assets/instaIcon.svg";
import LinkdIn from "../static/assets/linkdInIcon.svg";
import Twitter from "../static/assets/twitterICon.svg";
import client from "../api/api";
import Success from './Success';
import Alert from './Alert';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    sender_email: ""
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await client.post('api/email/', formData);
      const data = response.data;
      setSuccess(true);
      setError(null); 
    } catch (error) {
      
      setError(error); 
    }
  };

  return (
    <div className="my-6">
      <div className="grid sm:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md text-[#333] font-[sans-serif]">
        <div>
          <h1 className="text-3xl font-extrabold">Let's Talk</h1>
          <p className="text-sm text-gray-400 mt-3">
            Stuck somewhere and need help? Then reach
            out we'd love to hear about your problem and provide help.
          </p>
          
          <div className="mt-12">
            <h2 className="text-lg font-extrabold">Socials</h2>
            <div className="flex justify-between h-6 md:h-8 mt-1 md:mt-0">
              <img src={Fb} alt="Fb" />
              <img src={Twitter} alt="twitter" />
              <img src={Insta} alt="insta" />
              <img src={LinkdIn} alt="linkdin" />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="ml-auto space-y-4">
          {success && <Success content="Email sent successfully" />}
          {error && <Alert content="Failed to send email" />} 
          <input
            type="email"
            name="sender_email"
            placeholder="Your Email"
            value={formData.sender_email}
            onChange={handleChange}
            className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
          />
         
          <textarea
            placeholder="Message"
            rows="6"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full rounded-md px-4 border text-sm pt-2.5 outline-[#007bff]"
          ></textarea>
          
          <button
            type="submit"
            className="text-white bg-[#007bff] hover:bg-blue-600 font-semibold rounded-md text-sm px-4 py-2.5 w-full"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
