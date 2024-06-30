import React from 'react'
import { useNavigate } from 'react-router-dom'
import Star from '../static/assets/StartIcon.svg'

const AdCard = ({ id, productDetails }) => {
  const navigate = useNavigate()

  const openDescriptionPage = (e) => {
    navigate(`/productDescription/${productDetails.id}`)
  }

  return (
    <div className="group mr-2 md:mr-4 my-3 md:my-10 flex w-full  flex-col rounded-lg border border-gray-100 bg-white shadow-md max-w-56">
      <div
        className="relative mx-3 mt-3 flex h-52 w-40 md:h-60 md:w-48 overflow-hidden rounded-xl cursor-pointer hover:group"
        onClick={openDescriptionPage}
      >
        <img
          className={`peer absolute top-0 right-0 h-full w-full object-cover transition-opacity delay-1000 duration-100 ${
            productDetails.ProductImages[1] ? 'group-hover:opacity-0 peer-hover:opacity-0' : ''
          }`}
          src={`${productDetails.ProductImages[0]?.image_url}`}
          alt="product image"
        />

        {productDetails.ProductImages[1] && (
          <img
            className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 group-hover:right-0 peer-hover:right-0"
            src={`${productDetails.ProductImages[1].image_url}`}
            alt="product image"
          />
        )}
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
          />
        </svg>
      </div>
      <div className="mt-4 px-5 pb-5">
        <div className="">
          <p className="text-lg font-bold md:text-xl tracking-tight text-slate-900">
            {productDetails.name} - {productDetails.ProductCategory.name}
          </p>
          <div className="flex justify-between">
            <p className="text-sm tracking-tight text-slate-900">
              {productDetails.ProductCategory.description}
            </p>
            <div className="flex">
              <img className="" src={Star} alt="star" />
              <p className="ml-1 md:ml-2 text-sm tracking-tight text-slate-900">
                {productDetails.rating}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-lg md:text-xl font-bold text-slate-900">
              {productDetails.price}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdCard
