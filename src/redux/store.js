import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userReducer'
import productsSlice from './features/productsSlice'
import reviewSlice from './features/reviewSlice'
import productSearchedReducer from './features/productSearchedReducer'
import searchStoreReducer from './features/storeSearchReducer'
import storeSlice from './features/storeSlice'
import myCatalogue from './features/myCatalogueSlice'
import planReducer from './features/planSlice'
import paymentSlice from './features/paymentSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsSlice,
    reviews: reviewSlice,
    searchProducts: productSearchedReducer,
    searchStore: searchStoreReducer,
    stores: storeSlice,
    mycatalogue: myCatalogue,
    plan: planReducer,
    payment: paymentSlice
  },
})
