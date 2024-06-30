import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaCalendarAlt, FaCheck } from 'react-icons/fa';
import { selectPlan } from '../redux/features/planSlice';
import { setUserDetails } from '../redux/features/userReducer';
import client from '../api/api';

const staticValue = [
  {
    imageKey: 'briefcase',
    passType: "Basic",
    price: "Free",
    duration: "/lifetime",
    static: ["Add Store/Products", "Discover Vendors", "Send up to 3 contracts"],
  },
  {
    imageKey: 'calendar',
    passType: "Enterprise",
    price: "350PKR",
    duration: "/month",
    static: ["Add Store/Products", "Discover Vendors", "Send unlimited contracts", "Statistics"],
  },
];

const imageMap = {
  briefcase: <FaBriefcase size={34} />,
  calendar: <FaCalendarAlt size={30} />,
};

export default function Subscriptions() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.user);

  const handleChoosePlan = async (plan) => {
    if (plan.passType === 'Basic') {
      try {
        const response = await client.post('api/subscription/', {
          body: JSON.stringify({
          email: userDetails.email,
          subscription: plan.passType
        })
        });
        if (response.status === 200) {
          dispatch(selectPlan(plan));
          const userDetailsJSON = JSON.stringify(response.data.user);
          const userTokenPayload = btoa(userDetailsJSON);
          localStorage.setItem('userDetails', userTokenPayload);
          dispatch(setUserDetails(response.data.user));
          navigate('/');
        } else {
          //throw new Error('Failed to update subscription. Please try again.');
        }
      } catch (error) {
        console.error('Error updating subscription:', error);
      }
    } else if (plan.passType === 'Enterprise') {
      console.log('Navigating to payment page');
      dispatch(selectPlan(plan));
      navigate('/payment');
    }
  };

  return (
    <>
      <div className="w-full h-screen object-cover hidden lg:inline-block relative bg-white">
        <div className="bg-gray-300 font-sans lg:bg-transparent flex flex-col lg:flex-row absolute justify-center lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 px-5 xl:px-0 py-8 lg:py-0 w-full gap-6 items-center lg:items-stretch">
          <div className="flex flex-col flex-wrap max-w-[360px] md:w-[384px] min-h-[572px] p-6 bg-[#365CCE] group rounded-2xl relative overflow-hidden">
            <div className="text-start text-white">
              <span className="font-light text-3xl ">Save More</span>
              <br />
              <span className="font-bold text-3xl">With Goodplans</span>
              <br />
              <div className="text-lg leading-7">
                Choose a plan and get onboard in minutes.
              </div>
            </div>
            <div className="absolute bottom-0 h-[300px]">
              <img
                src="https://freepngimg.com/thumb/girl/168680-woman-young-free-clipart-hd.png"
                alt="girl image for promot pricing plan"
              />
            </div>
          </div>
          {staticValue.map((data, index) => (
            <div
              key={index}
              className="flex flex-col max-w-[360px] md:w-[384px] min-h-[518px] md:min-h-[572px] p-6 bg-white group rounded-2xl border xl:border-none border-[#0B0641] relative"
            >
              <div className="flex flex-row gap-5 items-center">
                <span>{imageMap[data.imageKey]}</span>
                <span className="text-3xl font-bold">{data.passType}</span>
              </div>
              <span className="flex mt-4 text-[#A9A9AA] text-[22px]">
                What You&apos;ll Get
              </span>
              {data.static.map((myData, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-3 items-start mt-6 text-left text-lg"
                >
                  <div className="pt-1 shrink-0 ">
                    <FaCheck />
                  </div>
                  <span>{myData}</span>
                </div>
              ))}
              <div className="border border-dashed border-[#A9A9AA] tracking-widest my-4" />
              <div className="h-28">
                <div className="flex flex-col gap-4 justify-between absolute left-6 right-6 bottom-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold ">{data.price}</span>
                    <span>{data.duration}</span>
                  </div>
                  <div className="flex align-bottom">
                    <button
                      className={`w-full rounded-xl font-semibold text-xl px-4 py-3 ${userDetails.subscription === data.passType ? 'bg-gray-300 text-gray-600' : 'bg-[#365CCE] text-white'}`}
                      onClick={() => handleChoosePlan(data)}
                      disabled={
                    
                        userDetails !== null && userDetails.subscription === data.passType
                      }
                    >
                      {userDetails.subscription === data.passType ? 'Selected' : 'Choose'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
