import React, { useState, useEffect } from 'react'
import client from '../api/api'
import Success from './Success'
import Alert from './Alert'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
  const navigate = useNavigate()
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [isProductAdded, setIsProductAdded] = useState(false)
  const [productAddingFailed, setProductAddingFailed] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Tech',
    images: [],
  })
  const [error, setError] = useState('')
  const [isProfileIncomplete, setIsProfileIncomplete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setProduct({ ...product, images: files })
  }

  const [categories, setCategories] = useState([])

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
    setIsLoading(true)
    setError('')
    setProductAddingFailed(false)
    setIsProductAdded(false)

    try {
      // Check if user profile is incomplete
      if (isProfileIncomplete) {
        setIsLoading(false)
        return
      }

      // Check if images are selected
      if (product.images.length === 0) {
        setError('Please select at least one image for the product.')
        setIsLoading(false)
        return
      }

      const userDetails = localStorage.getItem('userDetails')
      const user = userDetails ? JSON.parse(atob(userDetails)) : null
      const formData = new FormData()
      formData.append('name', product.name)
      formData.append('description', product.description)
      formData.append('price', product.price)
      formData.append('category', product.category)
      formData.append('user_id', user.id)
      product.images.forEach((image, index) => {
        formData.append(`images`, image)
      })

      await client.post('/api/add_product/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setIsProductAdded(true)
      setProduct({
        name: '',
        description: '',
        price: '',
        category: 'Tech',
        images: [],
      })
    } catch (error) {
      setIsProductAdded(false)
      console.error('Error adding product:', error.response.data.error)
      setError(error.response.data.error)
      setErrorMessage(error.message)
      setProductAddingFailed(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full bg-white">
        {isProductAdded && <Success content={'Your Product added successfully.'} />}
        {productAddingFailed && <Alert content={errorMessage} />}

        <form className="py-4 px-9 block md:flex justify-between" onSubmit={handleSubmit}>
          <div className="mb-5 md:w-2/3">
            <label
              htmlFor="productName"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Product Label
            </label>
            <input
              type="text"
              name="name"
              id="productName"
              placeholder="Your product name"
              value={product.name}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-normal text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              onChange={handleChange}
              disabled={isLoading}
            />

            {/* Product category */}
            <label
              htmlFor="productCategory"
              className="mt-2 mb-3 block text-base font-medium text-[#07074D]"
            >
              Product Category/Niche
            </label>
            <select
              name="category"
              id="productCategory"
              value={product.category}
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

            {/* Product price */}
            <label
              htmlFor="productPrice"
              className="mt-2 mb-3 block text-base font-medium text-[#07074D]"
            >
              Product Price
            </label>
            <input
              type="number"
              name="price"
              id="productPrice"
              placeholder="Your estimated product price"
              value={product.price}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-normal text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              onChange={handleChange}
              disabled={isLoading}
            />

            {/* Product description */}
            <label
              htmlFor="productDescription"
              className="mt-2 mb-3 block text-base font-medium text-[#07074D]"
            >
              Product Description
            </label>
            <textarea
              rows="4"
              name="description"
              id="productDescription"
              placeholder="Your product description"
              value={product.description}
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
                  {product.images.map((image, index) => (
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
                {isLoading ? 'Adding Product...' : 'Add Product'}
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

export default AddProduct
