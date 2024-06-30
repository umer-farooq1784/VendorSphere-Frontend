import React, { useEffect } from 'react'
import Rating from '../static/assets/StartIcon.svg'
import GreenReviewBadge from '../static/assets/GreenReviewBadge.svg'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import client from '../api/api'
import { fetchReviewsSuccess } from '../redux/features/reviewSlice'

const Review = ({ reviewDetails }) => {
  const loading = useSelector((state) => state.products.loading)

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div class="flex items-start bg-white rounded-md mt-2 p-2">
      <div class="flex-shrink-0">
        <div class="inline-block relative">
          <div class="relative w-16 h-16 rounded-full overflow-hidden">
            <img class="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover" src={`${reviewDetails.user.image}`} />
            <div class="absolute top-0 left-0 w-full h-full rounded-full shadow-inner"></div>
            {/* <img src={GreenReviewBadge} alt="" /> */}
          </div>
        </div>
      </div>
      <div class="ml-6">
        <p class="flex items-baseline">
          <span class="text-gray-600 font-bold">{reviewDetails.user.name}</span>
          <span class="ml-2 text-green-600 text-xs">Verified Buyer</span>
        </p>
        <div className="flex">
          <img className="pr-2" src={Rating} alt="" />
          <p>{reviewDetails.rating}</p>
        </div>

        <div class="mt-3">
          <span class="font-bold">{reviewDetails.title}</span>
          <p class="mt-1">{reviewDetails.content}</p>

        </div>
        <div class="flex items-center justify-between mt-4 text-sm text-gray-600 fill-current"></div>
      </div>
    </div>
  )
}

export default Review
