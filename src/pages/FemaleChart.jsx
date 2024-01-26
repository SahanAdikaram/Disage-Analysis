import React, { useContext } from "react";
import Barchart from "../Barchart";
import { GlobalContext } from "../GlobalContext/GlobalContext";

const FemaleChart = () => {
  const { diseaseData, currentData } = useContext(GlobalContext);

  // console.log(diseaseData.female_data);

  // console.log(initialData)
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 w-[100%]">
    <div className="text-center w-[70%]">
        <h1 className="text-2xl font-bold mb-4">{currentData}</h1>
        <h1 className="text-4xl font-bold mb-4">Disage Analysis</h1>
        <p className="text-gray-600 mb-8">
          Explore and analyze disease data for better insights.
        </p>

        <Barchart data={diseaseData.female_data} />

        <div className=" p-4 bg-white shadow-md rounded-md mt-5 ">
          <h2 className="text-xl font-bold mb-4">Chart Description</h2>
          <p>This chart visualizes patient data where:</p>
          <ul className="list-disc ml-6">
            <li>
              <span className="font-semibold">X-axis:</span> Represents the age
              range of patients.
            </li>
            <li>
              <span className="font-semibold">Y-axis:</span> Represents the
              number of patients in that age range.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FemaleChart;
