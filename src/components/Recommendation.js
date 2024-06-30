import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdCard from './AdCard'
import { fetchProductsSuccess } from '../redux/features/productsSlice'
import client from '../api/api'
import { fetchStoresSuccess } from '../redux/features/storeSlice'
import StoreCard from './StoreCard'

const Recommendation = ({ title }) => {
  const dispatch = useDispatch()
  const stores = useSelector((state) => state.stores.stores)
  const products = useSelector((state) => state.products.products)

  useEffect(() => {
    if (title === 'Products') {
      const fetchProducts = async () => {
        try {
          const response = await client.get('api/get_top_products')
          dispatch(fetchProductsSuccess(response.data.results))
        } catch (error) {
          console.error(error)
        }
      }

      fetchProducts()
    } else if (title === 'Stores') {
      const fetchStores = async () => {
        try {
          const res = await client.get('api/get_top_stores')
          dispatch(fetchStoresSuccess(res.data.results))
        } catch (error) {
          console.error(error)
        }
      }

      fetchStores()
    }
  }, [dispatch])

  return (
    <div className="flex flex-col m-5 md:m-8">
      <p className="font-inter font-semibold md:text-xl text-base">Recommended {title}</p>
      <div className="flex overflow-scroll scrollbar-hide max-w-full">
        {title === 'Products'
          ? products.map((product, i) => <AdCard key={i} productDetails={product} id={i} />)
          : stores.map((store, i) => <StoreCard key={i} storeDetails={store} id={i} />)}
      </div>
    </div>
  )
}

export default Recommendation
