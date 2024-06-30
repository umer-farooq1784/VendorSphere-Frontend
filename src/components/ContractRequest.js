import client from '../api/api'
import { fetchProductsSuccess, fetchStoresSuccess } from '../redux/features/myCatalogueSlice'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Success from './Success'
import { useParams, useLocation } from 'react-router-dom'

const ContractRequest = () => {
  const { storeId, productId } = useParams()

  const location = useLocation()
  const isProductContractRequest = location.pathname.includes('ProductContractRequest')
  const products = useSelector((state) => state.mycatalogue.products)
  const stores = useSelector((state) => state.mycatalogue.stores)
  const dispatch = useDispatch()

  const [error, setError] = useState(null) // State to store error message

  const userDetails = localStorage.getItem('userDetails')
  const user = userDetails ? JSON.parse(atob(userDetails)) : null

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isProductContractRequest) {
          const res = await client.get(`api/my_store_catalog/${user.id}`)
          dispatch(fetchStoresSuccess(res.data.stores))
        } else {
          const res = await client.get(`api/my_product_catalog/${user.id}`)
          dispatch(fetchProductsSuccess(res.data.products))
        }
      } catch (error) {
        console.error(error)
        setError(`Failed to fetch ${isProductContractRequest ? 'stores' : 'products'}`)
      }
    }

    fetchData()
  }, [dispatch, user.id, isProductContractRequest])

  const sendContractRequest = async (contractData) => {
    try {
      // Simulate API call
      const res = await client.post(`api/contract/send/`, contractData)
      console.log(res.data)
      // Assuming you're expecting a response from the API
      return { success: true, message: 'Contract request sent successfully' }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const [selectedProductId, setSelectedProductId] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState('')
  const [duration, setDuration] = useState('')
  const [commissionPercentage, setCommissionPercentage] = useState('') 
  const [isContractSent, setIsContractSent] = useState(false)

  const handleProductClick = (productId) => {
    setSelectedProductId(productId)
  }

  const handleSubmit = async () => {
    // Validate data
    if (!selectedProductId){
      setError('Please select a product or store')
      return
    }
    setIsContractSent(false)
    if(!price){
      setError('Price is required')
      return
    }
    
    if(!duration){
      setError('Duration is required')
      return
    }
    
    if(!commissionPercentage) {
      setError('Commission percentage is required')
      return
    }
  
    // Ensure numeric fields have valid values
    if (isNaN(quantity) || isNaN(price) || isNaN(duration) || isNaN(commissionPercentage)) {
      setError('Quantity, price, duration, and commission percentage must be valid numbers')
      return
    }
  
    // Ensure no negative values
    if (quantity <= 0 || price <= 0 || duration <= 0 || commissionPercentage <= 0) {
      setError('Quantity, price, duration, and commission percentage must be positive values')
      return
    }
  
    // Ensure commission percentage is below 100
    if (commissionPercentage >= 100) {
      setError('Commission percentage must be less than 100')
      return
    }

    let contractData = {
      product_quantity: quantity,
      duration: duration,
      price_per_item: price,
      commission_percentage: commissionPercentage,
    }

    if (storeId) {
      contractData.store_id = storeId
      contractData.product_id = selectedProductId
      contractData.request_source = 'Store'
    } else {
      contractData.product_id = productId
      contractData.request_source = 'Product'
      contractData.store_id = selectedProductId
    }

    try {
      // Call API
      const response = await sendContractRequest(contractData)
      // Handle response if needed
      setIsContractSent(true)
      setError(null) // Reset error state
    } catch (error) {
      // Handle error
      console.error(error)
      setIsContractSent(false)
      setError('Failed to send contract request') // Set error message
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {isContractSent && <Success content={'Your Contract was successfully!'} />}
      <h1 className="text-2xl pt-4 font-bold mb-4">Contract Page</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-4">
            {isProductContractRequest ? 'Select a Store:' : 'Select a Product:'}
          </h2>
          <ul className="space-y-2">
            {isProductContractRequest
              ? stores?.map((store) => (
                  <li
                    key={store?.id}
                    className={`cursor-pointer p-4 rounded-lg shadow-md hover:bg-blue-100 transition-colors duration-200 ease-in-out ${
                      selectedProductId === store?.id ? 'bg-blue-200' : 'bg-white'
                    }`}
                    onClick={() => handleProductClick(store?.id)}
                  >
                    <p className="font-semibold text-lg text-gray-700">{store?.name}</p>
                  </li>
                ))
              : products?.map((product) => (
                  <li
                    key={product?.id}
                    className={`cursor-pointer p-4 rounded-lg shadow-md hover:bg-blue-100 transition-colors duration-200 ease-in-out ${
                      selectedProductId === product?.id ? 'bg-blue-200' : 'bg-white'
                    }`}
                    onClick={() => handleProductClick(product?.id)}
                  >
                    <p className="font-semibold text-lg text-gray-700">{product?.name}</p>
                  </li>
                ))}
          </ul>
        </div>
        <div className="bg-gradient-to-br ml-3 from-blue-200 to-blue-300 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-black">Contract Details:</h2>
          <div className="mb-4">
            <label htmlFor="quantity" className="block font-semibold">
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block font-semibold">
              Price:
            </label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="duration" className="block font-semibold">
              Duration (months):
            </label>
            <input
              id="duration"
              type="number"
              min="1"
              className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="commissionPercentage" className="block font-semibold">
              Commission Percentage:
            </label>
            <input
              id="commissionPercentage"
              type="number"
              min="0"
              step="0.01"
              className="bg-white border border-gray-300 rounded px-2 py-1 w-full"
              value={commissionPercentage}
              onChange={(e) => setCommissionPercentage(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContractRequest
