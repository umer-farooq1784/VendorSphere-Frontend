import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import client from '../api/api'

const ContractsList = () => {
  const [contracts, setContracts] = useState(null)
  const [error, setError] = useState(null)
  const userDetails = localStorage.getItem('userDetails')
  const user = userDetails ? JSON.parse(atob(userDetails)) : null
  const userID = user ? user.id : null

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await client.get(`/api/contracts/${userID}/`)
        setContracts(response.data)
        console.log(response.data)
      } catch (error) {
        console.error(error)
        setError('Failed to fetch contracts')
      }
    }

    fetchContracts()
  }, [userID])

  const pendingContracts = contracts?.filter((contract) => contract.status === 'Pending') || []
  const approvedContracts = contracts?.filter((contract) => contract.status === 'Approved') || []
  const rejectedContracts = contracts?.filter((contract) => contract.status === 'Denied') || []

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
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Incoming Contract Requests
      </h1>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Pending Contracts</h2>
        {pendingContracts?.length > 0 ? (
          <ul className="space-y-4">
            {pendingContracts?.map((contract) => (
              <li
                key={contract.id}
                className="p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out"
              >
                <Link
                  to={`/contract/${contract?.id}`}
                  className="text-blue-600 hover:underline font-semibold text-lg"
                >
                  Contract Request -{' '}
                  {contract?.request_source === 'Store'
                    ? contract?.product_name
                    : contract?.request_source === 'Product'
                    ? contract?.store_name
                    : 'unknown'}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No pending contracts available.</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Approved Contracts</h2>
        {approvedContracts.length > 0 ? (
          <ul className="space-y-4">
            {approvedContracts.map((contract) => (
              <li
                key={contract.id}
                className="p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out"
              >
                <Link
                  to={`/contract/${contract.id}`}
                  className="text-blue-600 hover:underline font-semibold text-lg"
                >
                  Contract with{' '}
                  {contract?.request_source === 'Store'
                    ? contract?.product_name
                    : contract?.request_source === 'Product'
                    ? contract?.store_name
                    : 'unknown'}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No approved contracts available.</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Rejected Contracts</h2>
        {rejectedContracts.length > 0 ? (
          <ul className="space-y-4">
            {rejectedContracts.map((contract) => (
              <li
                key={contract.id}
                className="p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out"
              >
                <Link
                  to={`/contract/${contract.id}`}
                  className="text-blue-600 hover:underline font-semibold text-lg"
                >
                  Rejected Contract with{' '}
                  {contract?.request_source === 'Store'
                    ? contract?.product_name
                    : contract?.request_source === 'Product'
                    ? contract?.store_name
                    : 'unknown'}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No rejected contracts available.</p>
        )}
      </div>
    </div>
  )
}

export default ContractsList
