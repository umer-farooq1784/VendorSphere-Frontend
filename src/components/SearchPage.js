import React, { useEffect, useState } from 'react'
import AdCard from './AdCard'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchSearchedProducts,
  clearSearchedProducts,
} from '../redux/features/productSearchedReducer'
import { fetchSearchedStores, clearSearchedStores } from '../redux/features/storeSearchReducer'
import { useParams } from 'react-router-dom'
import StoreCard from './StoreCard'

const SearchPage = () => {
  const dispatch = useDispatch()
  const { searchTerm } = useParams()
  const [searchType, setSearchType] = useState('store')
  let products = useSelector((state) => state.searchProducts.searchedProducts)
  let stores = useSelector((state) => state.searchStore.stores)

  useEffect(() => {
    dispatch(clearSearchedProducts())
    dispatch(clearSearchedStores())
    if (searchTerm) {
      if (searchType === 'store') {
        dispatch(fetchSearchedStores(searchTerm))
      } else {
        dispatch(fetchSearchedProducts(searchTerm))
      }
    }
  }, [dispatch, searchTerm, searchType])

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value)
  }

  const renderSearchResults = () => {
    return (
      <div className="font-bold">
        <div className="flex flex-col m-5 md:m-8">
          <div className="flex justify-between">
            <p className="font-inter font-semibold md:text-xl text-base">Search Results</p>
            <select
              id="searchType"
              name="searchType"
              value={searchType}
              onChange={handleSearchTypeChange}
              className="w-fit h-fit border-2 text-sm md:text-lg border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
            >
              <option value="store">Store</option>
              <option value="product">Product</option>
            </select>
          </div>
          <div className="flex flex-wrap scrollbar-hide">
            {searchType === 'store'
              ? stores.map((store, i) => <AdCard key={i} productDetails={store} id={i} />)
              : products.map((product, i) => <AdCard key={i} productDetails={product} id={i} />)}
          </div>
        </div>
      </div>
    )
  }

  return renderSearchResults()
}

export default SearchPage
