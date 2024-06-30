import React, { useState } from 'react'
import client from '../api/api'
import { set } from 'date-fns'
import { useNavigate } from 'react-router-dom'

const AddReview = ({ storeId = '', productId = '' }) => {
  const userDetails = localStorage.getItem('userDetails')
  const user = userDetails ? JSON.parse(atob(userDetails)) : null
  const navigate = useNavigate()
  const [isAddingReview, setIsAddingReview] = useState(false)
  const [formData, setFormData] = useState({
    user: user.id,
    title: '',
    content: '',
    rating: 0,
  })
  const [errors, setErrors] = useState({
    title: false,
    content: false,
  })

  const handleStarClick = (rating) => {
    setFormData({
      ...formData,
      rating: rating,
    })
  }

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
      const apiEndpoint = productId
        ? `api/add_product_review/${productId}/`
        : `api/add_store_review/${storeId}/`
      setIsAddingReview(true)
      const response = await client.post(apiEndpoint, formData)
      // Clear form data after successful submission
      setFormData({
        user: user.id,
        title: '',
        content: '',
        rating: 0,
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
    <div className="max-w-md mb-4 mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Add a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
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
          {errors.title && <p className="text-red-500 text-sm mt-1">Title is required</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
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
          {errors.content && <p className="text-red-500 text-sm mt-1">Content is required</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleStarClick(value)}
                className={`text-3xl mr-1 ${
                  value <= formData.rating ? 'text-yellow-500' : 'text-gray-300'
                } focus:outline-none`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {isAddingReview ? 'Adding Review...' : 'Submit Review'}
        </button>
      </form>
    </div>
  )
}

export default AddReview
