import React from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfdfd] dark:bg-[#0f172b] px-4 py-12 transition-colors duration-300 text-center">
      <div className="relative w-full max-w-[400px] mb-8">
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="404 - Lost in the network"
          className="w-full object-contain drop-shadow-xl rounded-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/10 dark:from-black/30 dark:via-transparent dark:to-black/10 pointer-events-none rounded-xl" />
      </div>

      <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
        404 — Page Not Found
      </h1>

      <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-6 leading-relaxed">
        Oops! You’ve reached a page that doesn’t exist. The page may have been moved or deleted.
        Let’s get you back to the right place.
      </p>

      <Link
        to="/"
        className="px-6 py-3 rounded-full bg-[#C61F1F] text-white font-semibold shadow-lg hover:bg-red-800 transition-all duration-300 transform hover:scale-105"
      >
         Back to Home
      </Link>

      <div className="mt-10 text-sm text-gray-400 dark:text-gray-500">
        If you believe this is an error, please{" "}
        <a
          href="mailto:support@yourdomain.com"
          className="underline hover:text-[#C61F1F] transition"
        >
          contact support
        </a>
        .
      </div>
    </div>
  );
};

export default React.memo(NotFound);


