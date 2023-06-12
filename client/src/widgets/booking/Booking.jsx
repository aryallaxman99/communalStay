import { useState } from "react";
import { Skeleton } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Input from "../input/Input";
import Button from "../button/Button";

const Booking = ({ place }) => {
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [numberOfGuests, setNumberOfGuests] = useState();

  if (checkIn && checkOut && numberOfGuests) {
    const totalPrice =
      ((checkOut.$y - checkIn.$y) * 360 +
        (checkOut.$M - checkIn.$M) * 30 +
        (checkOut.$D - checkIn.$D)) *
      place.price *
      numberOfGuests;

    console.log(totalPrice);
  }

  return (
    <div className="mt-2">
      {place ? (
        <>
          <div className="shadow p-4 rounded-2xl ">
            <div className="text-2xl text-center">
              Price :NPR. ${place.price}/ night
            </div>
            <div className="border px-4 rounded-2xl mt-4">
              <div className=" mt-2 ">
                <label className="font-semibold">Check In </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format="YYYY/MM/DD"
                    className="w-full"
                    disablePast={true}
                    value={checkIn}
                    onChange={setCheckIn}
                  />
                </LocalizationProvider>
              </div>
              <div className="py-2">
                <label className="font-semibold">Check Out </label>

                <LocalizationProvider
                  className="rounded-2xl"
                  dateAdapter={AdapterDayjs}
                >
                  <DatePicker
                    format="YYYY/MM/DD"
                    className="w-full"
                    value={checkOut}
                    onChange={setCheckOut}
                  />
                </LocalizationProvider>
              </div>
              <div className="py-2">
                <label className="font-semibold">Number of guests</label>
                <Input
                  type="number"
                  value={numberOfGuests}
                  onChange={(e) => setNumberOfGuests(e.target.value)}
                />
              </div>
            </div>
            <Button className="mt-2 bg-secondary" value={1}>
              Reserve
            </Button>
          </div>
        </>
      ) : (
        <Skeleton variant="rounded" height={350} width={300} />
      )}
    </div>
  );
};

export default Booking;
