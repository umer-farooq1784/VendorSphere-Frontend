import React, { useEffect, useState } from 'react'
import Recommendation from './Recommendation'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProductsSuccess, setSelectedProduct } from '../redux/features/productsSlice'
import { setLoadingFalse, setSelectedStore } from '../redux/features/storeSlice'
import { fetchReviewsSuccess } from '../redux/features/reviewSlice'
import Rating from '../static/assets/StartIcon.svg'
import Dot from '../static/assets/Dot.svg'
import Reviews from '../static/assets/reviews.svg'
import PriceIcon from '../static/assets/PriceIcon.svg'
import Contracts from '../static/assets/contract.svg'
import SaleBanner from './SaleBanner'
import ContactDetails from './ContactDetails'
import { useParams } from 'react-router-dom'
import client from '../api/api'
import Review from './Review'
import AddReview from './AddReview'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  setDefaultPrice,
  setIsButtonClickedProduct,
  setIsButtonClickedStore,
  setStoreId,
} from '../redux/features/paymentSlice'
import ReportUser from './ReportUser'

const ProductContent = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const [showAddReview, setShowAddReview] = useState(false)
  const [showReporUser, setShowReporUser] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const loading = useSelector((state) => state?.products?.loading)
  let details = useSelector((state) => state?.products?.selectedProduct)
  const [updatedProduct, setUpdatedProduct] = useState({ name: '', description: '', price: '' })
  const userDetails = localStorage.getItem('userDetails')
  const currentUser = userDetails ? JSON.parse(atob(userDetails)) : null
  const isOwner = currentUser && details?.NormalUser?.id === currentUser.id
  const [noOfContracts, setNoOfContracts] = useState(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  let reviews = useSelector((state) => state.reviews.reviews)

  const toggleAddReview = () => {
    if (showReporUser) {
      setShowReporUser(false)
    }
    setShowAddReview(!showAddReview)
  }

  const toggleReportUser = () => {
    if (showAddReview) {
      setShowAddReview(false)
    }
    setShowReporUser(!showReporUser)
  }

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await client.get(`api/get_product_reviews/${id}`)
        dispatch(fetchReviewsSuccess(response.data))
      } catch (error) {
        console.error(error)
      }
    }

    fetchReviews()
  }, [dispatch, id])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await client.get(`api/get_product_details/${id}`)
        const res = await client.get(`api/check_active_records/${currentUser.id}`)

        setNoOfContracts(res?.data?.active_contracts_count)
        dispatch(setSelectedProduct(response.data))
        dispatch(setLoadingFalse)
        setUpdatedProduct({
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
        })
      } catch (error) {
        console.error(error)
      }
    }

    fetchProducts()
  }, [dispatch, id, setUpdatedProduct])

  const handleReClick = async () => {
    console.log('inside')
    if (currentUser?.subscription === 'Basic') {
      try {
        const response = await client.get(`api/check_active_records/${currentUser.id}`)
        setNoOfContracts(response?.data?.active_contracts_count)
        if (response?.data?.active_contracts_count > 3) {
          setShowUpgradeModal(true)
          return
        }
        navigate(`/ProductContractRequest/${id}`)
      } catch (error) {
        console.error('Error checking active records:', error)
        // Optionally display an error message to the user
      }
    } else {
      console.log('Not Basic Plan')
      navigate(`/ProductContractRequest/${id}`)
    }
  }

  const handleEditClick = () => {
    setIsEditMode(true)
  }
  const [isInContractWith, setIsInContractWith] = useState(false)

  useEffect(() => {
    const fetchContractStatus = async () => {
      try {
        const response = await client.get(`api/contract/check_product/${id}/${currentUser.id}/`)
        console.log(response)
        setIsInContractWith(response?.data?.has_accepted_contract)
      } catch (error) {
        console.error(error)
      }
    }

    fetchContractStatus()
  }, [id])

  const handleSaveClick = async () => {
    setIsSaving(true)
    try {
      await client.put(`/api/update_product/${id}/`, updatedProduct)
      const response = await client.get(`api/get_product_details/${id}`)
      dispatch(setSelectedProduct(response?.data))
      setIsEditMode(false)
    } catch (error) {
      console.error('Error saving product:', error)
    }
    setIsSaving(false)
  }

  const handleFeatureClick = async () => {
    console.log(details)
    try {
      dispatch(setStoreId(details.id))
      dispatch(setDefaultPrice(200))
      dispatch(setIsButtonClickedProduct(true))
      dispatch(setIsButtonClickedStore(false))
      navigate(`/payment`)
    } catch (error) {
      console.error('Error featuring product:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUpdatedProduct({ ...updatedProduct, [name]: value })
  }

  if (!details) {
    return (
      <div className="relative m-52 inset-0 flex items-center justify-center bg-gray-100 opacity-30 z-50">
        Product Details
        <svg
          aria-hidden="true"
          className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }
  const isAlreadyFeatured =
    details?.is_featured === true ||
    details?.isFeatured === 'true' ||
    details?.isFeatured === 'True'

  return (
    <div className="">
      <div className="flex flex-col md:flex-row p-3 md:p-4 bg-white">
        <div className="flex items-center justify-center flex-wrap max-h-72 w-fit md:w-2/6 rounded-md border-2">
          <img
            className="p-2 md:p-3 max-h-64 rounded-md"
            src={`${details?.ProductImages[0]?.image_url}`}
            alt=""
          />
        </div>
        <div className="w-full md:w-3/5 p-3 flex flex-col">
          {isEditMode ? (
            <input
              type="text"
              name="name"
              value={updatedProduct?.name}
              onChange={handleChange}
              className="font-semibold text-lg border p-2 rounded"
            />
          ) : (
            <div className="font-sNaibold text-lg">{details?.name}</div>
          )}
          <div className="flex flex-col md:flex-row pt-2 md:items-center pb-2 text-[#787A80]">
            <div className="flex">
              <img className="pr-2" src={Rating} alt="" />
              <p className="">{details?.rating}</p>
            </div>
            <div className="hidden md:block items-center">
              <img className="md:pl-3" src={Dot} alt="" />
            </div>
            <div className="flex">
              <img className="md:pl-3" src={Reviews} alt="" />
              <p className="pl-2">{reviews?.length} Reviews </p>
            </div>
            <div className="hidden md:block">
              <img className="md:pl-3" src={Dot} alt="" />
            </div>
            <div className="flex">
              <img className="md:pl-3" src={Contracts} alt="" />
              <p className="pl-2">{noOfContracts} Contracts </p>
            </div>
            <div className="hidden md:block">
              <img className="md:pl-3" src={Dot} alt="" />
            </div>
            <div className="flex">
              <img className="md:pl-3" src={PriceIcon} alt="priceIcon" />{' '}
              {isEditMode ? (
                <input
                  type="text"
                  name="price"
                  value={updatedProduct?.price}
                  onChange={handleChange}
                  className="pl-2 border rounded"
                />
              ) : (
                <p className="pl-2">{details?.price} Rs.</p>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-end items-end h-full">
            <div className="pt-4 pr-4 pb-4">
              {isOwner && (
                <>
                  {isEditMode ? (
                    <button
                      onClick={handleSaveClick}
                      className="bg-[#FFD814] text-white font-bold py-2 px-4 rounded-full"
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                  ) : (
                    <button
                      onClick={handleEditClick}
                      className="bg-[#FFD814] text-white font-bold py-2 px-4 rounded-full"
                    >
                      Edit Product
                    </button>
                  )}
                </>
              )}

              {isOwner && !isAlreadyFeatured && (
                <button
                  onClick={handleFeatureClick}
                  className="feature-product-button relative overflow-hidden bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-250 transform hover:scale-110 hover:shadow-2xl active:scale-95 m-4"
                >
                  Feature Product
                  <span className="absolute inset-0 bg-white opacity-0 transition-opacity duration-500 rounded-full"></span>
                </button>
              )}
              {!isOwner && (
                <button
                  onClick={handleReClick}
                  className="bg-[#FFD814] text-white font-bold py-2 px-4 rounded-full"
                >
                  Request Contract
                </button>
              )}
            </div>
          </div>
        </div>
        <ContactDetails userDetails={details?.NormalUser} />
      </div>
      <div className="w-full mt-4 p-3 md:mt-6 md:p-4 rounded-md bg-white">
        <div className="text-lg font-semibold">Description</div>
        {isEditMode ? (
          <textarea
            name="description"
            value={updatedProduct.description}
            onChange={handleChange}
            className="w-full mt-2 p-2 border rounded"
          />
        ) : (
          <div className="whitespace-normal">{details?.description}</div>
        )}
      </div>
      <div className="w-full mt-4 p-3 md:mt-6 md:p-4 rounded-md bg-white">
        <div className="text-lg font-semibold mt-4">Reviews</div>

        {reviews?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-16 h-16 text-gray-500 mb-4 animate-bounce"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h.01M15 12h.01M12 15.5h.01M12 12h.01M4 6h16M4 18h16"
              />
            </svg>
            <p className="text-center text-lg text-gray-600">No reviews yet</p>
          </div>
        )}
        {reviews?.map((review, i) => (
          <Review key={i} reviewDetails={review} id={i} />
        ))}
        {showAddReview && <AddReview productId={details?.id} />}
        {showReporUser && <ReportUser userId={details?.NormalUser?.id} />}

        {isInContractWith && (
          <div className="flex justify-evenly">
            <button
              onClick={toggleAddReview}
              className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600"
            >
              Add Review
            </button>

            <button
              onClick={toggleReportUser}
              className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600"
            >
              Report User
            </button>
          </div>
        )}
      </div>

      <Recommendation title="Stores" />
      <Recommendation title="Products" />
      <SaleBanner />
      {showUpgradeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg text-center">
            <h2 className="text-2xl mb-4">Upgrade Required</h2>
            <p className="mb-6">To send more contracts, please upgrade your subscription plan.</p>
            <div className="flex justify-center space-x-6">
              <Link to="/plan">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Upgrade Now</button>
              </Link>
              <Link to="/">
                <button className="bg-red-500 text-white px-4 py-2 rounded">Go Back</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductContent
