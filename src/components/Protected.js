import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../redux/features/userReducer'
import atob from 'atob'

function Protected(props) {
  const dispatch = useDispatch()
  const { Component } = props
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const user = localStorage.getItem('userDetails')

    if (!accessToken || !refreshToken) {
      navigate('/login')
    } else {
      const userPayload = atob(user)
      const decodedUserDetails = JSON.parse(userPayload)
      dispatch(setUserDetails(decodedUserDetails))
      setLoading(false)
    }
  }, [navigate])

  return <div>{!loading && <Component />}</div>
}

export default Protected
