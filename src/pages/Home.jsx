import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Select from "react-select";
import { Link } from "react-router-dom";
import { GlobalContext } from "../GlobalContext/GlobalContext";
import "./Loading.css";
import MaleChart from "./MaleChart";
import FemaleChart from "./FemaleChart";
import OverallChart from "./OverallChart";

import conditions from "../data/conditions.json";
import patients from "../data/patients.json";

const Home = () => {
  // const [options, setOptions] = useState([]);

  let options = [];

  conditions.map((con) =>
    options.push({
      value: con.resource?.code?.coding[0].display,
      label: con.resource?.code?.coding[0].display,
    })
  );

  options = Array.from(new Set(options.map((obj) => obj.label))).map(
    (label) => {
      return options.find((obj) => obj.label === label);
    }
  );

  const {
    apiBaseUrl,
    diseaseDataHandler,
    diseaseData,
    currentData,
    currentDataHandler,
  } = useContext(GlobalContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const [data, setData] = useState(null);
  //   console.log(apiBaseUrl);

  const [Loader, setLoadder] = useState(false);

  const [selectedOptionPage, setSelectedOptionPage] = useState("overrall");

  const handleOptionClick = (option) => {
    setSelectedOptionPage(option);
  };

  useEffect(() => {
    if (selectedOption) {
      // currentDataHandler(selectedOption);
      const selectCondition = conditions.filter(
        (con) => con.resource?.code?.coding[0].display === selectedOption.value
      );

      let patient_details = [];
      let pateint_inner = [];
      const overall_data = [
        { ageRange: "10-20", value: 0 },
        { ageRange: "21-40", value: 0 },
        { ageRange: "41-60", value: 0 },
        { ageRange: "61-80", value: 0 },
        { ageRange: "81-100", value: 0 },
        { ageRange: "100-150", value: 0 },
      ];
      const male_data = [
        { ageRange: "10-20", value: 0 },
        { ageRange: "21-40", value: 0 },
        { ageRange: "41-60", value: 0 },
        { ageRange: "61-80", value: 0 },
        { ageRange: "81-100", value: 0 },
        { ageRange: "100-150", value: 0 },
      ];

      const female_data = [
        { ageRange: "10-20", value: 0 },
        { ageRange: "21-40", value: 0 },
        { ageRange: "41-60", value: 0 },
        { ageRange: "61-80", value: 0 },
        { ageRange: "81-100", value: 0 },
        { ageRange: "100-150", value: 0 },
      ];

      for (let i = 0; i <= selectCondition.length; i++) {
        console.log(i);
        console.log(selectCondition[i]?.resource?.subject?.reference);

        let st = selectCondition[i]?.resource?.subject?.reference;

        if (st) {
          let split = st.split("/");
          console.log(split[1]);

          let patient_detail = patients.filter((pa) => pa.id === split[1]);

          patient_detail = Array.from(
            new Set(patient_detail.map((obj) => obj.id))
          ).map((id) => {
            return patient_detail.find((obj) => obj.id === id);
          });

          patient_details.push(...patient_detail);
        }
      }

      for (let i = 0; i <= patient_details.length; i++) {
        console.log(patient_details[i]);

        if (patient_details[i]) {
          let age = patient_details[i].birthDate;
          let gender = patient_details[i].gender;

          console.log(age);
          console.log(gender);

          var dob = new Date(age);
          var month_diff = Date.now() - dob.getTime();
          var age_dt = new Date(month_diff);
          var year = age_dt.getUTCFullYear();
          age = Math.abs(year - 1970);

          function overallUpdateValueForNumber(number) {
            // Find the range that the number belongs to
            const matchingRange = overall_data.find((entry) => {
              const [min, max] = entry.ageRange.split("-").map(Number);
              return number >= min && (number <= max || !max);
            });

            // If a matching range is found, increment its value
            if (matchingRange) {
              matchingRange.value += 1;
              console.log(
                `Number ${number} belongs to range ${matchingRange.range}. Updated value: ${matchingRange.value}`
              );
            } else {
              console.log(
                `Number ${number} does not belong to any defined range.`
              );
            }
          }
          overallUpdateValueForNumber(age);

          if (gender == "male") {
            function maleUpdateValueForNumber(number) {
              // Find the range that the number belongs to
              const matchingRange = male_data.find((entry) => {
                const [min, max] = entry.ageRange.split("-").map(Number);
                return number >= min && (number <= max || !max);
              });

              // If a matching range is found, increment its value
              if (matchingRange) {
                matchingRange.value += 1;
                console.log(
                  `Number ${number} belongs to range ${matchingRange.range}. Updated value: ${matchingRange.value}`
                );
              } else {
                console.log(
                  `Number ${number} does not belong to any defined range.`
                );
              }
            }
            maleUpdateValueForNumber(age);
          } else if (gender == "female") {
            function femaleUpdateValueForNumber(number) {
              // Find the range that the number belongs to
              const matchingRange = female_data.find((entry) => {
                const [min, max] = entry.ageRange.split("-").map(Number);
                return number >= min && (number <= max || !max);
              });

              // If a matching range is found, increment its value
              if (matchingRange) {
                matchingRange.value += 1;
                console.log(
                  `Number ${number} belongs to range ${matchingRange.range}. Updated value: ${matchingRange.value}`
                );
              } else {
                console.log(
                  `Number ${number} does not belong to any defined range.`
                );
              }
            }
            femaleUpdateValueForNumber(age);
          }

          let pp = { age, gender };

          pateint_inner.push(pp);
        }
      }

      diseaseDataHandler({ overall_data, male_data, female_data });
    }
  }, [selectedOption]);

  const OverralContent = () => {
    return (
      <div>
        <OverallChart />
      </div>
    );
  };

  const MaleContent = () => {
    return (
      <div>
        <MaleChart />
      </div>
    );
  };

  const FemaleContent = () => {
    return (
      <div className="w-full">
        <FemaleChart />
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center h-auto py-32 bg-gray-100 w-[100%] ">
      <div className=" w-[50%]">
        <h1 className="text-4xl font-bold mb-4 text-center">Disage Analysis</h1>
        <div className="flex justify-center items-center">
          <div className="">
            <p className="">
              Your one-stop platform for
              enlightening data visualizations on the age distribution of
              patients with specific medical conditions. Our user-friendly
              interface, designed with healthcare data analysts in
              consideration, lets you choose diseases of interest and displays
              an overall bar charts and  gender-based bar charts. This gives you
              the ability to decide how best to allocate resources and implement
              patient care plans depending on the particular age distributions
              associated with each disease.
            </p>
          </div>
        </div>
        <p className="text-gray-600 mb-8">
          Explore and analyze disease data for better insights.
        </p>
        <div className="w-84 mx-auto mb-4">
          <Select
            options={options}
            value={selectedOption}
            onChange={setSelectedOption}
          />
        </div>
        {data && (
          <div className="text-left">
            <h2 className="text-lg font-bold mb-2">Selected Data:</h2>
            <pre className="bg-gray-200 p-4 rounded-md">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}

        {diseaseData.length !== 0 ? (
          <>
            {" "}
            <h1>{currentData}</h1>
            {/* <div className="space-x-4">
              <Link to="/overallChart">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Overall Chart
                </button>
              </Link>
              <Link to="/maleChart">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Male Chart
                </button>
              </Link>
              <Link to="/femaleChart">
                <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">
                  Female Chart
                </button>
              </Link>
            </div> */}
            <section className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
              <div>
                {/* Main Settings Section */}
                <div className="bg-gray-200 p-4">
                  <h2 className="text-xl font-semibold mb-4">Chart</h2>

                  {/* Subnavigation */}
                  <nav className="flex">
                    <button
                      className={`py-2 px-4 mr-4 ${
                        selectedOptionPage === "profile"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                      onClick={() => handleOptionClick("overrall")}
                    >
                      Overrall Chart
                    </button>

                    <button
                      className={`py-2 px-4 mr-4 ${
                        selectedOptionPage === "changePassword"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                      onClick={() => handleOptionClick("male")}
                    >
                      Male Chart
                    </button>

                    <button
                      className={`py-2 px-4 mr-4 ${
                        selectedOptionPage === "changePassword"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                      onClick={() => handleOptionClick("female")}
                    >
                      Female
                    </button>
                  </nav>
                </div>

                {/* Content based on the selected option */}
                <div className="p-4">
                  {selectedOptionPage === "overrall" && <OverralContent />}
                  {selectedOptionPage === "male" && <MaleContent />}
                  {selectedOptionPage === "female" && <FemaleContent />}
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            {Loader ? (
              <>
                {" "}
                <div className="loading-container">
                  <div className="loader"></div>
                  <p className="loading-text">Please wait...</p>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-3xl text-center my-7">
                  Select the condition type
                </h1>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Home;
