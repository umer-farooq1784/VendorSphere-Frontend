import React, { useState } from 'react'
import client from '../api/api'
import { useNavigate } from 'react-router-dom'

const ReportUser = ({ storeId = '', productId = '' }) => {
  const userDetails = localStorage.getItem('userDetails')
  const user = userDetails ? JSON.parse(atob(userDetails)) : null
  const navigate = useNavigate()
  const [isAddingReview, setIsAddingReview] = useState(false)
  const [formData, setFormData] = useState({
    reported_by: user?.id,
    reported_id: storeId || productId,
    report_type: storeId ? 'Store' : 'Product',
    title: '',
    content: '',
  })
  const [errors, setErrors] = useState({
    title: false,
    content: false,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.content) {
      setErrors({
        title: !formData.title,
        content: !formData.content,
      })
      return
    }

    try {
      const apiEndpoint = 'api/report_user/'

      setIsAddingReview(true)
      const response = await client.post(apiEndpoint, formData)
      // Clear form data after successful submission
      setFormData({
        reported_by: user?.id,
        reported_id: storeId || productId,
        report_type: storeId ? 'Store' : 'Product',
        title: '',
        content: '',
      })
      setErrors({
        title: false,
        content: false,
      })
      // Refresh the screen
      setIsAddingReview(false)
      window.location.reload()
    } catch (error) {
      console.error(error) // Handle error
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 mb-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Report a User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Reason
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`border ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            } focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md shadow-sm`}
            required
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">Reason is required</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Details
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows="3"
            className={`border ${
              errors.content ? 'border-red-500' : 'border-gray-300'
            } focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md shadow-sm`}
            required
          ></textarea>
          {errors.content && <p className="text-red-500 text-sm mt-1">Detail is required</p>}

          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 mt-4 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isAddingReview ? 'Submitting' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReportUser
