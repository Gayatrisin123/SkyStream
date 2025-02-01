// import { useState } from 'react'

// function App() {
//   return (
//     <>
//       <h1 style={{alignContent: 'center', justifyContent: 'center'}}>Vite + React</h1>
//     </>
//   )
// }

// export default App



import React from "react";
import { Button } from "../src/@/components/ui/button";

const ExampleButton = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
        Click Me
      </Button>
    </div>
  );
};

export default ExampleButton;
