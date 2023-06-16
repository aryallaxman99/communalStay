import { HiOutlineWifi, HiOutlineKey } from "react-icons/hi";
import { HiOutlineBolt } from "react-icons/hi2";
import { FaShower, FaMountain, FaTv, FaFireExtinguisher } from "react-icons/fa";
import { GiFireplace, GiButterflyFlower } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";
import { BiCctv } from "react-icons/bi";
import { RiFridgeLine } from "react-icons/ri";

const Features = ({ setFeatures, features }) => {
  const handleChange = (event) => {
    const { checked, name } = event.target;
    checked
      ? setFeatures([...features, name])
      : setFeatures([...features.filter((items) => items !== name)]);
  };

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
      <label className="mb-1 border p-4 flex rounded-2xl cursor-pointer gap-2 items-center">
        <input
          name="wifi"
          type="checkbox"
          checked={features.includes("wifi")}
          onChange={handleChange}
        />

        <HiOutlineWifi className="h-6 w-6" />
        <span>Wifi</span>
      </label>
      <label className="mb-1 border p-4 flex rounded-2xl cursor-pointer gap-2 items-center">
        <input
          name="electricity"
          type="checkbox"
          checked={features.includes("electricity")}
          onChange={handleChange}
        />
        <HiOutlineBolt className="h-6 w-6" />

        <span>Electricity</span>
      </label>
      <label className="mb-1 border p-4 flex rounded-2xl gap-2 cursor-pointer items-center">
        <input
          name="shower"
          type="checkbox"
          checked={features.includes("shower")}
          onChange={handleChange}
        />
        <FaShower className="h-6 w-6" />

        <span>Shower</span>
      </label>
      <label className="mb-1 border p-4 flex rounded-2xl gap-2 cursor-pointer items-center">
        <input
          name="mountain View"
          type="checkbox"
          checked={features.includes("mountain View")}
          onChange={handleChange}
        />
        <FaMountain className="h-6 w-6" />

        <span>Mountain view</span>
      </label>
      <label className="mb-1 border p-4 flex rounded-2xl gap-2 cursor-pointer items-center">
        <input
          name="tv"
          type="checkbox"
          checked={features.includes("tv")}
          onChange={handleChange}
        />
        <FaTv className="h-6 w-6" />

        <span>Tv</span>
      </label>
      <label className="border mb-1 p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          name="indoor fireplace: gas"
          type="checkbox"
          checked={features.includes("indoor fireplace: gas")}
          onChange={handleChange}
        />
        <GiFireplace className="h-6 w-6" />

        <span>Indoor fireplace: gas</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          name="gardenView"
          type="checkbox"
          checked={features.includes("gardenView")}
          onChange={handleChange}
        />
        <GiButterflyFlower className="h-6 w-6" />

        <span>Garden View</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          name="lakeView"
          type="checkbox"
          checked={features.includes("lakeView")}
          onChange={handleChange}
        />
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
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          name="ac"
          type="checkbox"
          checked={features.includes("ac")}
          onChange={handleChange}
        />
        <TbAirConditioning className="h-6 w-6" />

        <span>AC - Split-type ductless system</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          name="CCTV"
          type="checkbox"
          checked={features.includes("CCTV")}
          onChange={handleChange}
        />
        <BiCctv className="h-6 w-6" />

        <span>Security Camera</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          name="fireExtinguisher"
          type="checkbox"
          checked={features.includes("fireExtinguisher")}
          onChange={handleChange}
        />
        <FaFireExtinguisher className="h-6 w-6" />

        <span>Fire extinguisher</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          name="Refrigerator"
          type="checkbox"
          checked={features.includes("Refrigerator")}
          onChange={handleChange}
        />
        <RiFridgeLine className="h-6 w-6" />

        <span>Refrigerator</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          name="outdoorDiningArea"
          type="checkbox"
          checked={features.includes("outdoorDiningArea")}
          onChange={handleChange}
        />
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
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          name="selfCheckIn"
          type="checkbox"
          checked={features.includes("selfCheckIn")}
          onChange={handleChange}
        />
        <HiOutlineKey className="h-6 w-6" />

        <span>Self Check in</span>
      </label>
    </div>
  );
};

export default Features;
