import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/login'
import Signup from './components/SignUpPage'
import DashLayout from './components/DashLayout'
import Dashboard from './components/Dashboard'
import Products from './components/Products'
import Protected from './components/Protected'
import PaymentForm from './pages/payment'
import HomePage from './components/HomePage'
import AddProduct from './components/AddProduct'
import StoreComplete from './components/StoreComplete'
import ContractTable from './components/contractTable'
import ContactForm from './components/ContactForm'
import Profile from './components/ProfilePage'
import SearchPage from './components/SearchPage'
import AddStore from './components/AddStore'
import ProductDescription from './components/ProductDescription'
import InventoryPage from './components/Inventory'
import MyCatalogue from './components/MyCatalogue'
import ContractRequest from './components/ContractRequest'
import ContractList from './components/ContractsList'
import ContractRequestDetail from './components/ContractRequestDetail'
import Subscriptions from './components/SubscriptionPlans'

function App() {
  return (
    <BrowserRouter scrollRestoration="manual">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Protected Component={DashLayout} />}>
          <Route index element={<Products />} />
          <Route path="dash" element={<Dashboard />} />
          <Route path="addProducts" element={<AddProduct />} />
          <Route path="storeDescription/:id" element={<StoreComplete />} />
          <Route path="productDescription/:id" element={<ProductDescription />} />
          <Route path="store" element={<AddStore />} />
          <Route path="myCatalogue" element={<MyCatalogue />} />
          <Route path="contracts" element={<ContractTable />} />
          <Route path="support" element={<ContactForm />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="contractsList" element={<ContractList />} />
          <Route path="payment" element={<PaymentForm />} />
          <Route path="ProductContractRequest/:productId" element={<ContractRequest />} />
          <Route path="StoreContractRequest/:storeId" element={<ContractRequest />} />
          <Route path="contract/:contractID" element={<ContractRequestDetail />} />
          <Route path="/search/:searchTerm" element={<SearchPage />} />
          <Route path="/plan" element={<Subscriptions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
