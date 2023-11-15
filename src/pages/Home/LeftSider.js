import React from "react";

function LeftSider() {
  return (
    <div className="fixed left-0 bottom-0 px-10 sm:static">
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-3 sm:flex-row sm:mb-1 sm:gap-5">
          <a href="https://www.facebook.com/WilliamsAntonioXX" target="_blank">
            <i className="ri-facebook-circle-fill text-xl text-gray-400"></i>
          </a>
          <a href="">
            <i className="ri-mail-fill text-xl text-gray-400"></i>
          </a>
          <a href="">
            <i className="ri-instagram-fill text-xl text-gray-400"></i>
          </a>
          <a href="">
            <i className="ri-linkedin-box-fill text-xl text-gray-400"></i>
          </a>
          <a href="">
            <i className="ri-github-fill text-xl text-gray-400"></i>
          </a>
        </div>

        <div className="w-[1px] h-32 bg-[#125f63] sm:hidden"></div>
      </div>
    </div>
  );
}

export default LeftSider;
