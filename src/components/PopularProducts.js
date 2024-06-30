import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

const popularProducts = [
  {
    id: '3432',
    product_name: 'Macbook M1 Pro 14"',
    product_thumbnail: 'https://source.unsplash.com/100x100?macbook',
    product_price: '$1499.00',
    product_stock: 341,
  },
  {
    id: '7633',
    product_name: 'Samsung Galaxy Buds 2',
    product_thumbnail: 'https://source.unsplash.com/100x100?earbuds',
    product_price: '$399.00',
    product_stock: 24,
  },
  {
    id: '6534',
    product_name: 'Asus Zenbook Pro',
    product_thumbnail: 'https://source.unsplash.com/100x100?laptop',
    product_price: '$899.00',
    product_stock: 56,
  },
  {
    id: '9234',
    product_name: 'LG Flex Canvas',
    product_thumbnail: 'https://source.unsplash.com/100x100?smartphone',
    product_price: '$499.00',
    product_stock: 98,
  },
  {
    id: '4314',
    product_name: 'Apple Magic Touchpad',
    product_thumbnail: 'https://source.unsplash.com/100x100?touchpad',
    product_price: '$699.00',
    product_stock: 0,
  },
  {
    id: '4342',
    product_name: 'Nothing Earbuds One',
    product_thumbnail: 'https://source.unsplash.com/100x100?earphone',
    product_price: '$399.00',
    product_stock: 453,
  },
]

function PopularProducts() {
  return (
    <div class="relative bg-gray-50 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      <div class="absolute inset-0">
        <div class="h-1/3 bg-white sm:h-2/3"></div>
      </div>
      <div class="relative mx-auto max-w-7xl">
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Welcome to VendorSphere
          </h2>
          <p class="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Place to revolutionize reatil parternships...
          </p>
        </div>
        <div class="mx-auto mt-12 overflow-x-auto">
          <div class="flex overflow-x-auto">
            <div class="flex min-w-120 md:mr-4 md:min-w-210 flex-col ml-2 mr-2 overflow-hidden rounded-lg shadow-lg">
              <div class="flex-shrink-0">
                <img
                  class="h-48 w-full object-cover"
                  src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1679&amp;q=80"
                  alt=""
                />
              </div>
              <div class="flex flex-1 flex-col justify-between bg-white p-6">
                <div class="flex-1">
                  <p class="text-sm font-medium text-indigo-600">
                    <a href="#" class="hover:underline">
                      Article
                    </a>
                  </p>
                  <a href="#" class="mt-2 block">
                    <p class="text-xl font-semibold text-gray-900">Boost your conversion rate</p>
                    <p class="mt-3 text-base text-gray-500">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
                      accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos
                      quis dolorum.
                    </p>
                  </a>
                </div>
                <div class="mt-6 flex items-center">
                  <div class="flex-shrink-0">
                    <a href="#">
                      <span class="sr-only">Roel Aufderehar</span>
                      <img
                        class="h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                        alt=""
                      />
                    </a>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">
                      <a href="#" class="hover:underline">
                        Roel Aufderehar
                      </a>
                    </p>
                    <div class="flex space-x-1 text-sm text-gray-500">
                      <time datetime="2020-03-16">Mar 16, 2020</time>
                      <span aria-hidden="true">·</span>
                      <span>6 min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex min-w-120 md:mr-4 md:min-w-210 flex-col overflow-hidden rounded-lg shadow-lg">
              <div class="flex-shrink-0">
                <img
                  class="h-48 w-full object-cover"
                  src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1679&amp;q=80"
                  alt=""
                />
              </div>
              <div class="flex flex-1 flex-col justify-between bg-white p-6">
                <div class="flex-1">
                  <p class="text-sm font-medium text-indigo-600">
                    <a href="#" class="hover:underline">
                      Article
                    </a>
                  </p>
                  <a href="#" class="mt-2 block">
                    <p class="text-xl font-semibold text-gray-900">Boost your conversion rate</p>
                    <p class="mt-3 text-base text-gray-500">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
                      accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos
                      quis dolorum.
                    </p>
                  </a>
                </div>
                <div class="mt-6 flex items-center">
                  <div class="flex-shrink-0">
                    <a href="#">
                      <span class="sr-only">Roel Aufderehar</span>
                      <img
                        class="h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                        alt=""
                      />
                    </a>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">
                      <a href="#" class="hover:underline">
                        Roel Aufderehar
                      </a>
                    </p>
                    <div class="flex space-x-1 text-sm text-gray-500">
                      <time datetime="2020-03-16">Mar 16, 2020</time>
                      <span aria-hidden="true">·</span>
                      <span>6 min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex  min-w-120 md:mr-4 md:min-w-210 flex-col overflow-hidden rounded-lg shadow-lg">
              <div class="flex-shrink-0">
                <img
                  class="h-48 w-full object-cover"
                  src="https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1679&amp;q=80"
                  alt=""
                />
              </div>
              <div class="flex flex-1 flex-col justify-between bg-white p-6">
                <div class="flex-1">
                  <p class="text-sm font-medium text-indigo-600">
                    <a href="#" class="hover:underline">
                      Video
                    </a>
                  </p>
                  <a href="#" class="mt-2 block">
                    <p class="text-xl font-semibold text-gray-900">
                      How to use search engine optimization to drive sales
                    </p>
                    <p class="mt-3 text-base text-gray-500">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis
                      asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut
                      inventore optio animi., tempore temporibus quo laudantium.
                    </p>
                  </a>
                </div>
                <div class="mt-6 flex items-center">
                  <div class="flex-shrink-0">
                    <a href="#">
                      <span class="sr-only">Brenna Goyette</span>
                      <img
                        class="h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                        alt=""
                      />
                    </a>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">
                      <a href="#" class="hover:underline">
                        Brenna Goyette
                      </a>
                    </p>
                    <div class="flex space-x-1 text-sm text-gray-500">
                      <time datetime="2020-03-10">Mar 10, 2020</time>
                      <span aria-hidden="true">·</span>
                      <span>4 min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex  min-w-120 md:mr-4 md:min-w-210 flex-col overflow-hidden rounded-lg shadow-lg">
              <div class="flex-shrink-0">
                <img
                  class="h-48 w-full object-cover"
                  src="https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1679&amp;q=80"
                  alt=""
                />
              </div>
              <div class="flex flex-1 flex-col justify-between bg-white p-6">
                <div class="flex-1">
                  <p class="text-sm font-medium text-indigo-600">
                    <a href="#" class="hover:underline">
                      Video
                    </a>
                  </p>
                  <a href="#" class="mt-2 block">
                    <p class="text-xl font-semibold text-gray-900">
                      How to use search engine optimization to drive sales
                    </p>
                    <p class="mt-3 text-base text-gray-500">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis
                      asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut
                      inventore optio animi., tempore temporibus quo laudantium.
                    </p>
                  </a>
                </div>
                <div class="mt-6 flex items-center">
                  <div class="flex-shrink-0">
                    <a href="#">
                      <span class="sr-only">Brenna Goyette</span>
                      <img
                        class="h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                        alt=""
                      />
                    </a>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">
                      <a href="#" class="hover:underline">
                        Brenna Goyette
                      </a>
                    </p>
                    <div class="flex space-x-1 text-sm text-gray-500">
                      <time datetime="2020-03-10">Mar 10, 2020</time>
                      <span aria-hidden="true">·</span>
                      <span>4 min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex min-w-120 md:mr-4 md:min-w-210 flex-col overflow-hidden rounded-lg shadow-lg">
              <div class="flex-shrink-0">
                <img
                  class="h-48 w-full object-cover"
                  src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1679&amp;q=80"
                  alt=""
                />
              </div>
              <div class="flex flex-1 flex-col justify-between bg-white p-6">
                <div class="flex-1">
                  <p class="text-sm font-medium text-indigo-600">
                    <a href="#" class="hover:underline">
                      Case Study
                    </a>
                  </p>
                  <a href="#" class="mt-2 block">
                    <p class="text-xl font-semibold text-gray-900">
                      Improve your customer experience
                    </p>
                    <p class="mt-3 text-base text-gray-500">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum
                      voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque
                      corporis perferendis hic.
                    </p>
                  </a>
                </div>
                <div class="mt-6 flex items-center">
                  <div class="flex-shrink-0">
                    <a href="#">
                      <span class="sr-only">Daniela Metz</span>
                      <img
                        class="h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                        alt=""
                      />
                    </a>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">
                      <a href="#" class="hover:underline">
                        Daniela Metz
                      </a>
                    </p>
                    <div class="flex space-x-1 text-sm text-gray-500">
                      <time datetime="2020-02-12">Feb 12, 2020</time>
                      <span aria-hidden="true">·</span>
                      <span>11 min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopularProducts
