import React from 'react';

const StoreStats = () => {
  return (
    <section className="text-gray-600 body-font  mb-4">
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-wrap -m-4 text-center">
          <div className="p-4 sm:w-1/4 w-1/2">
            <div className="bg-indigo-100 p-6 rounded-lg">
              <h2 className="title-font font-medium sm:text-4xl text-2xl text-gray-900">
                35M PKR
              </h2>
              <p className="leading-relaxed">Total Revenue</p>
            </div>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <div className="bg-indigo-100 p-6 rounded-lg">
              <h2 className="title-font font-medium sm:text-4xl text-2xl text-gray-900">
                10
              </h2>
              <p className="leading-relaxed">Branches</p>
            </div>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <div className="bg-indigo-100 p-6 rounded-lg">
              <h2 className="title-font font-medium sm:text-4xl text-2xl text-gray-900">
                4
              </h2>
              <p className="leading-relaxed">Contracts Initiated</p>
            </div>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <div className="bg-indigo-100 p-6 rounded-lg">
              <h2 className="title-font font-medium sm:text-4xl text-2xl text-gray-900">
                40
              </h2>
              <p className="leading-relaxed">Contracts Expired</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreStats;
