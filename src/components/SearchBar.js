import React from 'react'

const SearchBar = () => {
  return (
    <div className="flex flex-row gap-3">
      <div className="flex">
        <input
          type="text"
          placeholder="Search.."
          className="w-full md:w-80 px-3 h-10 rounded-l border-2 border-sky-500 focus:outline-none focus:border-sky-500"
        />
      </div>
      <select
        id="pricingType"
        name="pricingType"
        className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
      >
        <option value="store" selected="">
          Store
        </option>
        <option value="product">Product</option>
      </select>
    </div>
  )
}

export default SearchBar
