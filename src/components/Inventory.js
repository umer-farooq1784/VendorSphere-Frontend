import React, { useEffect, useState } from 'react'
import client from '../api/api'
import { useDispatch, useSelector } from 'react-redux'

const InventoryPage = () => {
  const [inventory, setInventory] = useState([])
  const [editMode, setEditMode] = useState(null)
  const [decrementCounts, setDecrementCounts] = useState({})
  const [incrementCounts, setIncrementCounts] = useState({})
  const [saving, setSaving] = useState(false)
  const userDetails = useSelector((state) => state.user)

  useEffect(() => {
    const fetchInventory = async () => {
      const response = await client.get(`api/user/${userDetails?.id}/inventory/`)
      console.log(response.data)
      setInventory(response.data)
    }
    fetchInventory()
  }, [userDetails])

  const handleEditClick = (id) => {
    if (editMode === id) {
      // Save changes
      saveChanges(id)
    } else {
      setEditMode(id)
    }
  }

  const handleDecrementClick = (id) => {
    setDecrementCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }))

    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === id ? { ...item, available_quantity: item.available_quantity - 1 } : item
      )
    )
  }

  const handleIncrementClick = (id) => {
    setIncrementCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }))

    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === id ? { ...item, available_quantity: item.available_quantity + 1 } : item
      )
    )
  }

  const saveChanges = async (id) => {
    const decrementCount = decrementCounts[id] || 0
    const incrementCount = incrementCounts[id] || 0
    if (decrementCount > 0 || incrementCount > 0) {
      setSaving(true)
      try {
        if (decrementCount > 0) {
          await client.post(`/api/inventory/${id}/decrement/`, { quantity: decrementCount })
        }
        if (incrementCount > 0) {
          await client.post(`/api/inventory/${id}/increment/`, { quantity: incrementCount })
        }
        // Inventory state is already updated locally, no need to update it again
      } catch (error) {
        console.error('Error updating quantity:', error.response?.data || error.message)
        // Revert the changes if the API call fails
        setInventory((prevInventory) =>
          prevInventory.map((item) => {
            if (item.id === id) {
              const adjustedQuantity = item.available_quantity + decrementCount - incrementCount
              return { ...item, available_quantity: adjustedQuantity }
            }
            return item
          })
        )
      }
      setSaving(false)
      window.location.reload()
    }
    setEditMode(null)
    setDecrementCounts((prev) => ({ ...prev, [id]: 0 }))
    setIncrementCounts((prev) => ({ ...prev, [id]: 0 }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Inventory</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Store Name</th>
              <th className="px-4 py-2">Commission Percentage</th>
              <th className="px-4 py-2">Quantity Sold</th>
              <th className="px-4 py-2">Quantity in Stock</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Revenue</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id} className={item.id % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="border px-4 py-2">{item?.id}</td>
                <td className="border px-4 py-2">{item?.product_name}</td>
                <td className="border px-4 py-2">{item?.store_name}</td>
                <td className="border px-4 py-2">{item?.commission_percentage}</td>
                <td className="border px-4 py-2">{item?.quantity_sold}</td>
                <td className="border px-4 py-2 flex items-center justify-between">
                  {item?.available_quantity}
                  {editMode === item.id && (
                    <div className="justify-end">
                      <button
                        className="ml-2 just bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDecrementClick(item.id)}
                        disabled={saving}
                      >
                        -
                      </button>
                      <button
                        className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
                        onClick={() => handleIncrementClick(item.id)}
                        disabled={saving || item.available_quantity >= item.total_quantity}
                      >
                        +
                      </button>
                    </div>
                  )}
                </td>
                <td className="border px-4 py-2">{item?.price_per_item}</td>
                <td className="border px-4 py-2">{item?.revenue}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleEditClick(item.id)}
                    disabled={saving}
                  >
                    {editMode === item.id ? (saving ? 'Saving...' : 'Save') : 'Edit'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InventoryPage
