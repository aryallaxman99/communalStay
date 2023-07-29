import { HiOutlineWifi, HiOutlineKey } from "react-icons/hi";
import { HiOutlineBolt } from "react-icons/hi2";
import { FaShower, FaMountain, FaTv, FaFireExtinguisher } from "react-icons/fa";
import { GiFireplace, GiButterflyFlower } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";
import { BiCctv } from "react-icons/bi";
import { RiFridgeLine } from "react-icons/ri";

const DisplayFeatures = ({ place }) => {
  return (
    <div>
      {place ? (
        <>
          <h2 className="font-semibold text-2xl">What this place offers</h2>
          <div className="grid mt-2 grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
            {place.features.map((item) => (
              <div key={item} className="flex gap-2 mt-4">
                {item === "wifi" && (
                  <>
                    <HiOutlineWifi className="h-6 w-6" />
                    <span>Wifi</span>
                  </>
                )}
                {item === "electricity" && (
                  <>
                    <HiOutlineBolt className="h-6 w-6" />
                    <span>Electricity</span>
                  </>
                )}
                {item === "shower" && (
                  <>
                    <FaShower className="h-6 w-6" />
                    <span>Shower</span>
                  </>
                )}
                {item === "mountain View" && (
                  <>
                    <FaMountain className="h-6 w-6" />
                    <span>Mountain view</span>
                  </>
                )}
                {item === "tv" && (
                  <>
                    <FaTv className="h-6 w-6" />
                    <span>Tv</span>
                  </>
                )}
                {item === "indoor fireplace: gas" && (
                  <>
                    <GiFireplace className="h-6 w-6" />
                    <span>Indoor fireplace: gas</span>
                  </>
                )}
                {item === "gardenView" && (
                  <>
                    <GiButterflyFlower className="h-6 w-6" />

                    <span>Garden View</span>
                  </>
                )}
                {item === "lakeView" && (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                      className="h-6 w-6"
                    >
                      <path d="M28 2a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2H4v15.5h.19c.37-.04.72-.17 1-.38l.14-.11A3.98 3.98 0 0 1 8 18c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 18c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 18c.99 0 1.94.35 2.67 1 .35.33.83.5 1.33.5v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 20c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 20c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 20c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1v3h.19c.37-.04.72-.17 1-.38l.14-.11A3.98 3.98 0 0 1 8 23c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.97 3.97 0 0 1 16 23c.99 0 1.95.35 2.67 1 .35.33.83.5 1.33.5.5 0 .98-.17 1.33-.5A3.98 3.98 0 0 1 24 23c.99 0 1.94.35 2.67 1 .35.33.83.5 1.33.5v2h-.23a3.96 3.96 0 0 1-2.44-1A1.98 1.98 0 0 0 24 25c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 16 25c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1 3.98 3.98 0 0 1-2.67-1A1.98 1.98 0 0 0 8 25c-.5 0-.98.17-1.33.5a3.98 3.98 0 0 1-2.67 1V28h24zm-6 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                    </svg>

                    <span>Lake View</span>
                  </>
                )}
                {item === "ac" && (
                  <>
                    <TbAirConditioning className="h-6 w-6" />
                    <span>AC - Split-type ductless system</span>
                  </>
                )}
                {item === "CCTV" && (
                  <>
                    <BiCctv className="h-6 w-6" />
                    <span>Security Camera</span>
                  </>
                )}
                {item === "fireExtinguisher" && (
                  <>
                    <FaFireExtinguisher className="h-6 w-6" />
                    <span>Fire extinguisher</span>
                  </>
                )}
                {item === "Refrigerator" && (
                  <>
                    <RiFridgeLine className="h-6 w-6" />
                    <span>Refrigerator</span>
                  </>
                )}
                {item === "outdoorDiningArea" && (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                      className="h-6 w-6"
                    >
                      <path d="M29 15v16h-2v-6h-6v6h-2v-6.15a2 2 0 0 1 1.84-1.84L21 23h6v-8zM5 15v8h6a2 2 0 0 1 2 1.85V31h-2v-6H5v6H3V15zM16 1a15 15 0 0 1 13.56 8.57 1 1 0 0 1-.8 1.42l-.1.01H17v8h8v2h-8v10h-2V21H7v-2h8v-8H3.35a1 1 0 0 1-.95-1.32l.04-.1A15 15 0 0 1 16 1zm0 2A13 13 0 0 0 5.4 8.47l-.2.28-.16.25h21.92l-.17-.25a13 13 0 0 0-10.1-5.73L16.34 3z"></path>
                    </svg>
                    <span>Outdoor dining area</span>
                  </>
                )}
                {item === "selfCheckIn" && (
                  <>
                    <HiOutlineKey className="h-6 w-6" />
                    <span>Self Check in</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default DisplayFeatures;
