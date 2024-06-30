import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import client from '../api/api'
import { format } from 'date-fns'
import Success from './Success'

const ContractRequestDetail = () => {
  const { contractID } = useParams()
  const [contract, setContract] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const [isContractDeclined, setIsContractDeclined] = useState(false)

  function formatDateTime(dateString) {
    const date = new Date(dateString)
    const formattedDate = format(date, 'dd-MM-yyyy')
    const formattedTime = format(date, 'hh:mmaaa').toUpperCase()
    return ` ${formattedDate} at ${formattedTime}`
  }

  const userDetails = localStorage.getItem('userDetails')
  const currentUser = userDetails ? JSON.parse(atob(userDetails)) : null
  useEffect(() => {
    const fetchContractDetails = async () => {
      try {
        const response = await client.get(`/api/contract/${contractID}/`)
        setContract(response.data)
        setIsContractDeclined(false)
      } catch (error) {
        console.error(error)
        setError(`Failed to fetch contract details ${error}`)
      }
    }

    fetchContractDetails()
  }, [contractID])

  const handleAccept = async () => {
    try {
      const response = await client.post(`/api/contract/accept/`, { contract_id: contractID })
      {
        response?.status == 200 && <Success content={'Contract accepted successfully.'} />
      }
      navigate('/contractsList')
    } catch (error) {
      console.error(error)
      setError(`Failed to accept contract ${error}`)
    }
  }

  const handleNegotiate = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${contract?.senderPhone}&text=Let's%20negotiate%20the%20contract%20details`
    window.open(whatsappUrl, '_blank')
  }

  const handleDecline = async () => {
    try {
      const response = await client.post(`/api/contract/reject/`, { contract_id: contractID })
      console.log(response)
      setIsContractDeclined(true)
      navigate('/contractsList')
    } catch (error) {
      console.error(error)
      setIsContractDeclined(false)
      setError(`Failed to decline contract ${error}`)
    }
  }

  if (!contract) {
    return <div className="text-center text-xl font-semibold">Loading...</div>
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
      {isContractDeclined && <Success content={'You Declined the Contract!'} />}
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Contract Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between">
        <div>
          <p className="text-lg mb-4">
            <strong>Sender:</strong>{' '}
            {contract?.request_source === 'Store'
              ? contract?.vendor_name
              : contract?.request_source === 'Product'
              ? contract?.seller_name
              : 'unknown'}
          </p>
          <p className="text-lg mb-4">
            <strong>Product:</strong> {contract?.product_name}
          </p>
          <p className="text-lg mb-4">
            <strong>Store:</strong> {contract?.store_name}
          </p>
          <p className="text-lg mb-4">
            <strong>Quantity:</strong> {contract?.product_quantity}
          </p>
          <p className="text-lg mb-4">
            <strong>Duration:</strong> {contract?.duration} months
          </p>
          <p className="text-lg mb-4">
            <strong>Commission:</strong> {contract?.commission_percentage}%
          </p>
          <p className="text-lg mb-4">
            <strong>Start Date:</strong>{' '}
            {contract?.start_date ? formatDateTime(contract.start_date) : ''}
          </p>
        </div>
        <div>
          {contract?.images?.length > 0 && (
            <img
              src={contract.images[0]?.image}
              alt="Contract image"
              className="max-w-xs rounded-lg shadow-md"
            />
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-center space-x-4">
        {contract?.status === 'Pending' &&
          (contract?.request_source === 'Product'
            ? contract?.vendor_name
            : contract?.seller_name) === currentUser?.name && (
            <button
              onClick={handleAccept}
              className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600"
            >
              Accept
            </button>
          )}
        <button
          onClick={handleNegotiate}
          className="bg-yellow-500 text-white py-2 px-6 rounded hover:bg-yellow-600"
        >
          Negotiate
        </button>
        {contract?.status !== 'Denied' && (
          <button
            onClick={handleDecline}
            className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600"
          >
            Decline
          </button>
        )}
      </div>
    </div>
  )
}

export default ContractRequestDetail
