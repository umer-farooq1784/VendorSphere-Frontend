import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdCard from './AdCard'
import { fetchProductsSuccess } from '../redux/features/myCatalogueSlice'
import client from '../api/api'
import { fetchStoresSuccess } from '../redux/features/myCatalogueSlice'
import StoreCard from './StoreCard'

const MyCatalogue = () => {
  const dispatch = useDispatch()
  const stores = useSelector((state) => state.mycatalogue.stores)
  const products = useSelector((state) => state.mycatalogue.products)
  const userDetails = localStorage.getItem('userDetails')
  const user = userDetails ? JSON.parse(atob(userDetails)) : null

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await client.get(`api/my_product_catalog/${user.id}`)
        dispatch(fetchProductsSuccess(response.data.products))
      } catch (error) {
        console.error(error)
      }
    }

    fetchProducts()

    const fetchStores = async () => {
      try {
        const res = await client.get(`api/my_store_catalog/${user.id}`)
        dispatch(fetchStoresSuccess(res.data.stores))
        console.log('Stores:', res.data.stores)
      } catch (error) {
        console.error(error)
      }
    }

    fetchStores()
  }, [dispatch])

  return (
    <div>
      <div className="flex flex-col m-5 md:m-8">
        <p className="font-inter font-semibold md:text-xl text-base">My Catalogue</p>
        <p>MyProducts</p>
        <div className="flex overflow-scroll scrollbar-hide max-w-full">
          {products.map((product, i) => (
            <AdCard key={i} productDetails={product} id={i} />
          ))}
        </div>
        <p>MyStores</p>
        <div className="flex overflow-scroll scrollbar-hide max-w-full">
          {stores.map((store, i) => (
            <StoreCard key={i} storeDetails={store} id={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyCatalogue
