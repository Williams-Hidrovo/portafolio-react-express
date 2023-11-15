import React from "react";

function Loader() {
  return (
    <div className="h-screen flex items-center justify-center fixed inset-0 bg-primary z-10">
      <div className="flex gap-5 text-5xl font-semibold sm:text-3xl">
        <h1 className="text-secondary w">W</h1>
        <h1 className="text-white h">H</h1>
        <h1 className="text-tertiary b">B</h1>
      </div>
    </div>
  );
}

export default Loader;
