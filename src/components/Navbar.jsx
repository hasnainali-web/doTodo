import React, { useEffect, useRef } from "react";

const Navbar = () => {
  return (
    <>
      <nav className="bg-[#FED36A] text-black flex items-center justify-between p-3 sm:px-4 md:px-6 lg:px-8 rounded-b-md lg:rounded-b-lg text-sm lg:text-base ">
        <div className="logo cursor-pointer font-bold tracking-wide">doTodo</div>
        <ul className="flex space-x-4">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Tasks</li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
