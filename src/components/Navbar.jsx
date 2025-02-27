import React, { useEffect, useRef } from "react";

const Navbar = () => {
  return (
    <>
      <nav className="bg-[#FED36A] text-black flex items-center justify-center p-3 sm:px-4 md:px-6 lg:px-8 rounded-b-md lg:rounded-b-lg text-sm lg:text-base selection:bg-black selection:text-[#FED36A]">
        <div className="logo cursor-pointer font-bold tracking-wide">doTodo</div>
      </nav>
    </>
  );
};

export default Navbar;
