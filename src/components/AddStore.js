import React, { useState, useEffect } from 'react'
import client from '../api/api'
import Success from './Success'
import Alert from './Alert'
import { useNavigate } from 'react-router-dom'

const AddStore = () => {
  const navigate = useNavigate()
  const [isProductAdded, setIsProductAdded] = useState(false)
  const [productAddingFailed, setProductAddingFailed] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [store, setStore] = useState({
    name: '',
    description: '',
    location: '',
    category: '',
    images: [],
  })
  const [error, setError] = useState('')
  const [categories, setCategories] = useState([])
  const [isProfileIncomplete, setIsProfileIncomplete] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setStore({ ...store, [name]: value })
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setStore({ ...store, images: files })
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await client.get('/api/categories/')
        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
        setError('Error fetching categories. Please try again.')
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const checkProfileCompletion = () => {
      const userDetails = localStorage.getItem('userDetails')
      const user = userDetails ? JSON.parse(atob(userDetails)) : null

      if (!user) {
        setIsProfileIncomplete(true)
        return
      }

      const requiredFields = [
        'name',
        'email',
        'phone',
        'address',
        'city',
        'state',
        'zip',
        'country',
        'subscription',
      ]
      const incompleteFields = requiredFields.filter((field) => !user[field])

      if (incompleteFields.length > 0) {
        setIsProfileIncomplete(true)
      } else {
        setIsProfileIncomplete(false)
      }
    }

    checkProfileCompletion()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsFormSubmitted(true)
    setError('') // Reset error state
    setProductAddingFailed(false) // Reset productAddingFailed state
    setIsProductAdded(false) // Reset isProductAdded state
    setIsLoading(true) // Set loading state

    try {
      // Check if user profile is incomplete
      if (isProfileIncomplete) {
        setIsLoading(false) // Reset loading state
        return
      }

      // Check if images are selected
      if (store.images.length === 0) {
        setError('Please select at least one image for the store.')
        setIsLoading(false) // Reset loading state
        return
      }

      const userDetails = localStorage.getItem('userDetails')
      const user = userDetails ? JSON.parse(atob(userDetails)) : null

      const formData = new FormData()
      formData.append('name', store.name)
      formData.append('description', store.description)
      formData.append('location', store.location)
      formData.append('category', store.category)
      formData.append('user_id', user.id)
      store.images.forEach((image, index) => {
        formData.append(`images`, image)
      })

      await client.post('/api/add_store/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setIsProductAdded(true)
      // Clear all the fields
      setStore({
        name: '',
        description: '',
        location: '',
        category: '',
        images: [],
      })
    } catch (error) {
      console.error('Error adding store:', error)
      setError('Error adding store. Please try again.')
      setErrorMessage(error.message)
      setProductAddingFailed(true)
    } finally {
      setIsLoading(false) // Reset loading state
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full bg-white">
        {isProductAdded && <Success content={'Your Store added successfully.'} />}
        {productAddingFailed && <Alert content={errorMessage} />}

        <form className="py-4 px-9 block md:flex justify-between" onSubmit={handleSubmit}>
          <div className="mb-5 md:w-2/3">
            <label htmlFor="storeName" className="mb-3 block text-base font-medium text-[#07074D]">
              Store Name
            </label>
            <input
              type="text"
              name="name"
              id="storeName"
              value={store.name}
              placeholder="Your store name"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-normal text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              onChange={handleChange}
              disabled={isLoading}
            />

            {/* store category */}
            <label
              htmlFor="storeCategory"
              className="mt-2 mb-3 block text-base font-medium text-[#07074D]"
            >
              Store Category/Niche
            </label>
            <select
              name="category"
              id="storeCategory"
              value={store.category}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-normal text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              onChange={handleChange}
              disabled={isLoading}
            >
              <option value="">Select a category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* store location */}
            <label
              htmlFor="storeLocation"
              className="mt-2 mb-3 block text-base font-medium text-[#07074D]"
            >
              Store Location
            </label>
            <input
              type="text"
              name="location"
              id="storeLocation"
              value={store.location}
              placeholder="Your store location"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-normal text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              onChange={handleChange}
              disabled={isLoading}
            />

            {/* store description */}
            <label
              htmlFor="storeDescription"
              className="mt-2 mb-3 block text-base font-medium text-[#07074D]"
            >
              Store Description
            </label>
            <textarea
              rows="4"
              name="description"
              id="storeDescription"
              value={store.description}
              placeholder="Your store description"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-normal text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="md:w-1/3 md:pl-10">
            {/* Image upload */}
            <div className="mb-6 pt-4">
              <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                Upload Images
              </label>
              <input
                type="file"
                name="images"
                id="images"
                className="sr-only"
                accept="image/*"
                multiple // Allow multiple file selection
                onChange={handleImageChange}
                disabled={isLoading}
              />
              {/* Display selected image filenames */}
              <div className="mt-4">
                <p className="font-semibold mb-2">Selected Images:</p>
                <ul className="list-disc pl-4">
                  {store.images.map((image, index) => (
                    <li key={index} className="text-gray-700">
                      {image.name}
                    </li>
                  ))}
                </ul>
              </div>
              <label
                htmlFor="images"
                className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center cursor-pointer"
              >
                <div>
                  <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                    Drop files here or click to select
                  </span>
                </div>
              </label>
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                disabled={isLoading}
              >
                {isLoading ? 'Adding store...' : 'Add store'}
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </form>
        {isProfileIncomplete && isFormSubmitted && (
          <div className="mt-4 text-center">
            <p className="text-gray-700 mb-2">
              Please complete your profile before adding a new product.
            </p>
            <button
              className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              onClick={() => navigate('/profile')}
            >
              Complete your profile now
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddStore
