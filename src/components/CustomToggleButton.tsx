import React, { useEffect, useState } from "react";
interface CustomToggleButtonProps {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

const CustomToggleButton = ({
  isActive,
  setIsActive,
}: CustomToggleButtonProps) => {
  useEffect(() => {
    // console.log("isActive:", isActive);
  }, [isActive]);
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <div className="absolute right-6">
        <input
          onChange={(e) => setIsActive(e.target.checked)}
          checked={isActive}
          type="checkbox"
          className="sr-only "
        />
        <div
          className="w-12 h-2 absolute top-2 left-1 bg-gray-300
         rounded-full transition-colors duration-300"
        ></div>
        <span
          className={`absolute left-2 top-1 w-4 h-4 rounded-full transition-all
             duration-300 ${
               isActive
                 ? "translate-x-6 bg-red-500"
                 : "translate-x-0 bg-red-200"
             }`}
        ></span>
      </div>
    </label>
  );
};

export default CustomToggleButton;


// import React, { useEffect, useState } from "react";

// const CustomToggleButton = () => {
//   const [isActive, setIsActive] = useState(false);
//   useEffect(() => {
//     console.log(isActive);
//   }, [isActive]);
//   return (
//     <label className="relative inline-flex items-center cursor-pointer">
//       <div className="absolute right-6">
//         <input
//           onChange={(e) => setIsActive(e.target.checked)}
//           checked={isActive}
//           type="checkbox"
//           className="sr-only peer"
//         />
//         <div className="w-12 h-2 absolute top-2 left-1 bg-gray-300 peer-focus:ring-0
//  rounded-full peer peer-checked:bg-gray-300 transition-colors duration-300"></div>
//         <span className="absolute left-2 top-1 w-4 h-4 bg-red-200 rounded-full transition-all duration-300 peer-checked:bg-red-500 peer-checked:translate-x-6"></span>
//       </div>
//     </label>
//   );
// };

// export default CustomToggleButton;

// <label className="relative inline-flex items-center cursor-pointer">
// <input
//       onChange={(e) => setIsActive(e.target.checked)}
//       checked={isActive}
//       type="checkbox"
//       className="sr-only peer"
//     />
//   <div className="w-12 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-gray-300 rounded-full peer peer-checked:bg-red-500 transition-colors duration-300"></div>
//   <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-6"></span>
// </label>
