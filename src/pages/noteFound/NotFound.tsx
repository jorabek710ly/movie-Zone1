import React from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfdfd] px-4 py-8 text-center">
      <img
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        alt="404 - Lost in the network"
        className="w-full max-w-[380px] mb-6"
      />
      <h1 className="text-4xl font-extrabold text-gray-800 mb-2">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 max-w-xl mb-6">
        It seems you've lost connection or the page you're looking for doesn't exist.
        Please check your network or return to the homepage.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#B88E2F] text-white text-lg font-semibold rounded-lg shadow hover:bg-[#9e7422] transition-all duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default  React.memo(NotFound);
