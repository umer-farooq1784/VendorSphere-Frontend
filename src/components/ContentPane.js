import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import Recommendation from './Recommendation';
import client from '../api/api';
import { useNavigate } from 'react-router-dom';

const ContentPane = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const getTrimmedDescription = (description) => {
    const match = description.match(/(.*?\..*?\.)/);
    return match ? match[0] : description;
  };

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        const productResponse = await client.get('api/get_featured_products/');
        const products = productResponse.data.map(product => ({
          ...product,
          type: 'product',
          description: getTrimmedDescription(product.description)
        }));

        const storeResponse = await client.get('api/get_featured_stores/');
        const stores = storeResponse.data.map(store => ({
          ...store,
          type: 'store',
          description: getTrimmedDescription(store.description)
        }));

        // Intermix products and stores
        const combinedItems = [...products, ...stores].sort(() => Math.random() - 0.5);

        setSlides(combinedItems);
      } catch (error) {
        console.error('Error fetching featured items:', error);
      }
    };

    fetchFeaturedItems();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 4 seconds

    // Clear interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const handleLearnMoreClick = () => {
    const slide = slides[currentIndex];
    const path = slide.type === 'product' 
      ? `/productDescription/${slide.id}` 
      : `/storeDescription/${slide.id}`;
    navigate(path);
  };

  return (
    <div>
      <div className='max-w-[1300px] h-[450px] w-full m-auto py-2 px-2 relative group'>
        {slides.length > 0 && (
          <div className="flex h-full bg-white rounded-lg overflow-hidden shadow-md shadow-blue-500/50">
            <div className="w-1/3 p-8 flex flex-col justify-center items-center">
              <h2 className="text-4xl font-bold mb-2 text-center">{slides[currentIndex].name}</h2>
              <p className="text-sm text-gray-600 mb-4 text-justify">{slides[currentIndex].description}</p>
              <button
                onClick={handleLearnMoreClick}
                className="inline-block mt-4 px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              >
                Learn More
              </button>
            </div>
            <div
              className="w-2/3 h-full bg-center bg-contain bg-no-repeat rounded-r-lg duration-500"
              style={{ backgroundImage: `url(${slides[currentIndex].images[0]?.image})` }}
            ></div>
          </div>
        )}
        {/* Left Arrow */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-y-[-50%] left-16 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-y-[-50%] right-16 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className='flex top-4 justify-center py-2'>
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className='text-2xl cursor-pointer'
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>

      <Recommendation title="Stores" />
      <Recommendation title="Products" />
    </div>
  );
}

export default ContentPane;
