const Features = ({ setFeatures, features }) => {
  const handleChange = (event) => {
    const { checked, name } = event.target;
    checked
      ? setFeatures([...features, name])
      : setFeatures([...features.filter((items) => items !== name)]);
  };

  return (
    <div>
      <label className="mb-1 border p-4 flex rounded-2xl cursor-pointer gap-2 items-center">
        <input
          name="wifi"
          type="checkbox"
          checked={features.includes("wifi")}
          onChange={handleChange}
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
          />
        </svg>
        <span>Wifi</span>
      </label>
      <label className="mb-1 border p-4 flex rounded-2xl cursor-pointer gap-2 items-center">
        <input
          name="electricity"
          type="checkbox"
          checked={features.includes("electricity")}
          onChange={handleChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>

        <span>Electricity</span>
      </label>
      <label className="mb-1 border p-4 flex rounded-2xl gap-2 cursor-pointer items-center">
        <input
          name="shower"
          type="checkbox"
          checked={features.includes("shower")}
          onChange={handleChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 512 512"
        >
          <path d="M64 131.9C64 112.1 80.1 96 99.9 96c9.5 0 18.6 3.8 25.4 10.5l16.2 16.2c-21 38.9-17.4 87.5 10.9 123L151 247c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0L345 121c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-1.3 1.3c-35.5-28.3-84.2-31.9-123-10.9L170.5 61.3C151.8 42.5 126.4 32 99.9 32C44.7 32 0 76.7 0 131.9V448c0 17.7 14.3 32 32 32s32-14.3 32-32V131.9zM256 352a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm64 64a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-128a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm64 64a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-128a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm64 64a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm32-32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
        </svg>
        <span>Shower</span>
      </label>
      <label className="mb-1 border p-4 flex rounded-2xl gap-2 cursor-pointer items-center">
        <input
          name="mountain View"
          type="checkbox"
          checked={features.includes("mountain View")}
          onChange={handleChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 640 512"
        >
          <path d="M560 160A80 80 0 1 0 560 0a80 80 0 1 0 0 160zM55.9 512H381.1h75H578.9c33.8 0 61.1-27.4 61.1-61.1c0-11.2-3.1-22.2-8.9-31.8l-132-216.3C495 196.1 487.8 192 480 192s-15 4.1-19.1 10.7l-48.2 79L286.8 81c-6.6-10.6-18.3-17-30.8-17s-24.1 6.4-30.8 17L8.6 426.4C3 435.3 0 445.6 0 456.1C0 487 25 512 55.9 512z" />
        </svg>
        <span>Mountain view</span>
      </label>
      <label className="mb-1 border p-4 flex rounded-2xl gap-2 cursor-pointer items-center">
        <input
          name="tv"
          type="checkbox"
          checked={features.includes("tv")}
          onChange={handleChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
        <span>Tv</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          name="indoor fireplace: gas"
          type="checkbox"
          checked={features.includes("indoor fireplace: gas")}
          onChange={handleChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 32 32"
          strokeWidth={1.25}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path d="M31 6v2h-1v23h-6V13H8v18H2V8H1V6zm-15.37 9 .96.7c3.32 2.42 5.14 5.06 5.38 7.93l.02.28v.21l.01.14c0 3.18-2.7 5.74-6 5.74a5.9 5.9 0 0 1-5.99-5.39v-.21l-.01-.15a9.3 9.3 0 0 1 1.64-4.99l.22-.34.68-.98 1.24.79zM28 8H4v21h2V13a2 2 0 0 1 1.7-1.98l.15-.01L8 11h16a2 2 0 0 1 2 1.85V29h2zM16 25.36l-.1.09c-.61.65-.9 1.23-.9 1.72 0 .42.41.83 1 .83s1-.4 1-.83c0-.45-.24-.97-.76-1.56l-.15-.16zm.35-7.32-1.77 3.56-1.46-.93-.15.27a7.28 7.28 0 0 0-.94 2.75l-.02.29-.01.26v.12c.03.92.4 1.76 1.03 2.4.14-1.14.86-2.24 2.1-3.33l.23-.2.64-.53.64.53c1.38 1.16 2.19 2.32 2.33 3.53A3.6 3.6 0 0 0 20 24.49l.01-.22V24c-.1-1.86-1.12-3.7-3.13-5.5l-.27-.24zM31 2v2H1V2z"></path>
        </svg>

        <span>Indoor fireplace: gas</span>
      </label>
    </div>
  );
};

export default Features;
