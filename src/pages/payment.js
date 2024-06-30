import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useSelector, useDispatch } from 'react-redux'
import client from '../api/api'
import pak from '../static/assets/icons8-pakistan-48.png'
import { selectPlan } from '../redux/features/planSlice'
import { setUserDetails } from '../redux/features/userReducer'
import { setIsButtonClickedProduct, setIsButtonClickedStore } from '../redux/features/paymentSlice'
import Success from '../components/Success'
import Alert from '../components/Alert'

const stripePromise = loadStripe(
  'pk_test_51NXh2rAXTleCaFVGHkShFccjdQITyHLaEKWcZ1T237s7FNbowtruQum7J8W4WYHFSHvvcmF9A1gJw46wLXispQTQ00O7KQE9em'
)

const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [paymentResult, setPaymentResult] = useState({ message: '', type: '' })
  const [buttonText, setButtonText] = useState('Place Order')
  const [cardHolder, setCardHolder] = useState('')
  const [billingAddress, setBillingAddress] = useState('')
  const [billingZip, setBillingZip] = useState('')

  const selectedPlan = useSelector((state) => state.plan.selectedPlan) || {
    passType: 'Current Total',
    price: '0PKR',
    duration: 'monthly service',
  }

  const storeDetails = useSelector((state) => state.payment) || {
    isButtonClickedStore: false,
    isButtonClickedProduct: false,
    price: 0,
    storeId: 0,
  }

  const subtotal =
    storeDetails.isButtonClickedStore || storeDetails.isButtonClickedProduct
      ? storeDetails.price
      : selectedPlan.passType === 'Enterprise'
      ? parseFloat(selectedPlan.price.replace('PKR', '').trim()) || 0
      : parseFloat(selectedPlan.price.replace('PKR', '').trim()) || 0

  const total = subtotal + 9.0

  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.user)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    if (!cardHolder || !billingAddress || !billingZip) {
      setPaymentResult({ message: 'Please fill in all fields.', type: 'error' })
      return
    }

    setButtonText('Completing Order')

    const cardElement = elements.getElement(CardElement)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: cardHolder,
        address: {
          line1: billingAddress,
          postal_code: billingZip,
        },
      },
    })

    if (error) {
      setPaymentResult({ message: error.message, type: 'error' })
      setButtonText('Place Order')
      return
    }

    const response = await client.post('api/process_payment/', {
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        amount: total,
      }),
    })

    const result = await response

    if (result.error) {
      setPaymentResult({ message: result.error, type: 'error' })
      setButtonText('Place Order')
    } else {
      setPaymentResult({ message: 'Payment successful!', type: 'success' })

      if (storeDetails.isButtonClickedStore && storeDetails.isButtonClickedProduct === false) {
        try {
          const response2 = await client.post('api/feature_store/', {
            body: JSON.stringify({
              storeId: storeDetails.storeId,
            }),
          })
          dispatch(setIsButtonClickedStore(false))

          if (response2.status === 200) {
            setPaymentResult({ message: 'Store feature payment successful!', type: 'success' })
          } else {
            setPaymentResult({ message: 'Store feature payment unsuccessful!', type: 'error' })
          }
        } catch (error) {
          console.error('Error processing store payment:', error)
        }
      }

      if (storeDetails.isButtonClickedProduct && storeDetails.isButtonClickedStore === false) {
        try {
          const response2 = await client.post('api/feature_product/', {
            body: JSON.stringify({
              storeId: storeDetails.storeId,
            }),
          })
          dispatch(setIsButtonClickedProduct(false))

          if (response2.status === 200) {
            setPaymentResult({ message: 'Product feature payment successful!', type: 'success' })
          } else {
            setPaymentResult({ message: 'Product feature payment unsuccessful!', type: 'error' })
          }
        } catch (error) {
          console.error('Error processing product payment:', error)
        }
      } else if (selectedPlan.passType === 'Enterprise') {
        try {
          const response = await client.post('api/subscription/', {
            body: JSON.stringify({
              email: userDetails.email,
              subscription: selectedPlan.passType,
            }),
          })

          if (response.status === 200) {
            dispatch(selectPlan(selectedPlan))
            const userDetailsJSON = JSON.stringify(response.data.user)
            const userTokenPayload = btoa(userDetailsJSON)
            localStorage.setItem('userDetails', userTokenPayload)
            dispatch(setUserDetails(response.data.user))
          } else {
            setPaymentResult({ message: 'Subscription payment unsuccessful!', type: 'error' })
          }
        } catch (error) {
          console.error('Error updating subscription:', error)
        }
      }

      setButtonText('Place Order')
    }
  }

  return (
    <div>
      {paymentResult.message && paymentResult.type === 'success' && (
        <Success content={paymentResult.message} />
      )}
      {paymentResult.message && paymentResult.type === 'error' && (
        <Alert content={paymentResult.message} />
      )}
      <div className="grid md:grid-cols-2 md:px-10 mt-7">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Service Summary</p>
          <div className="mt-8 rounded-lg border bg-white">
            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <div className="flex w-full flex-col px-4 py-4">
                {storeDetails.isButtonClickedStore || storeDetails.isButtonClickedProduct ? (
                  <div>
                    <span className="font-semibold">
                      {storeDetails.isButtonClickedStore ? 'Featured Store' : 'Featured Product'}{' '}
                      Payment
                    </span>
                    <p className="mt-auto text-lg font-bold">{storeDetails.price}PKR</p>
                  </div>
                ) : (
                  <>
                    <span className="font-semibold">{selectedPlan.passType} Service</span>
                    <span className="float-right text-gray-400">{selectedPlan.duration}</span>
                    <p className="mt-auto text-lg font-bold">{selectedPlan.price}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="ml-4 mr-4 md:ml-0 md:mr-0 mt-8 rounded-lg bg-white px-4 pt-8 md:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">Enter your card details.</p>
          <form onSubmit={handleSubmit}>
            <label className="mt-4 mb-2 block text-sm font-medium">Card Holder</label>
            <div className="relative">
              <input
                type="text"
                name="card-holder"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your full name here"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                  />
                </svg>
              </div>
            </div>

            <label className="mt-4 mb-2 block text-sm font-medium">Card Details</label>
            <div className="flex flex-col space-y-4">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#32325d',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#fa755a',
                      iconColor: '#fa755a',
                    },
                  },
                }}
              />
            </div>

            <label className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-7/12">
                <input
                  type="text"
                  name="billing-address"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Street Address"
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <img className="h-4 w-4 object-contain" src={pak} alt="" />
                </div>
              </div>

              <input
                type="text"
                name="billing-zip"
                className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="ZIP"
                value={billingZip}
                onChange={(e) => setBillingZip(e.target.value)}
              />
            </div>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">{subtotal.toFixed(2)}PKR</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">{total.toFixed(2)}PKR</p>
            </div>

            <button
              type="submit"
              className="mt-4 mb-8 w-full rounded-md bg-[#6959CF] px-6 py-3 font-medium text-white"
              disabled={!stripe}
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

const Payment = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
)

export default Payment
