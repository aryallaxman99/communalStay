import { useState } from "react";
import axios from "axios";
import { Skeleton } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";

import Input from "../input/Input";
import Button from "../button/Button";
import requests from "../../Requests";

const Booking = ({ place }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  let totalStayingPeriods = 0;

  if (checkIn && checkOut) {
    totalStayingPeriods =
      (checkOut.$y - checkIn.$y) * 360 +
      (checkOut.$M - checkIn.$M) * 30 +
      (checkOut.$D - checkIn.$D);
  }

  const totalPrice = place
    ? place.price * totalStayingPeriods * numberOfGuests
    : null;

  const reserve = () => {
    const data = {
      checkIn: checkIn,
      checkOut: checkOut,
      numberOfGuests: numberOfGuests,
      totalPrice: totalPrice,
      placeid: id,
    };

    if (totalPrice) {
      if (document.cookie.split(";")[0].split("=")[1]) {
        axios
          .post(requests.reserve, data)
          .then((res) => {
            if (res.data.status) {
              toast[res.data.type](res.data.msg);
              navigate("/account/bookings");
            } else {
              toast[res.data.type](res.data.msg);
            }
          })
          .catch((error) => {
            toast[error.response.data.type](error.response.data.msg);
          });
      } else {
        navigate("/login");
      }
    } else {
      toast.warning("Enter check-In/out dates");
    }
  };

  return (
    <div className="mt-2">
      {place ? (
        <>
          <div className="shadow p-4 rounded-2xl ">
            <div className="text-2xl place-content-center flex gap-1">
              Price :<TbCurrencyRupeeNepalese className="h-6 w-6 mt-1.5" />
              {place.price}/ night
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
                    minDate={checkIn}
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
            <Button className="mt-4 bg-secondary" onClick={reserve}>
              Reserve
            </Button>
            {totalStayingPeriods !== 0 ? (
              <>
                <div className="mt-2 text-center">
                  <div className="font-light">
                    You won't be charged yet. Price shown is the total price
                    <br />
                    <div className="place-content-center underline underline-offset-auto flex	gap-1">
                      <TbCurrencyRupeeNepalese className="mt-1.5" />
                      {`${place.price} X ${totalStayingPeriods} nights`}
                    </div>
                  </div>
                </div>
                <div className="h-px  my-3 bg-gray-300" />
                <div className="font-semibold grid grid-cols-[1fr_1fr]">
                  <div className="text-start"> Total </div>
                  <div className="place-content-end flex gap-1">
                    <TbCurrencyRupeeNepalese className="mt-1" />
                    {totalPrice}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </>
      ) : (
        <Skeleton variant="rounded" height={350} width={300} />
      )}
    </div>
  );
};

export default Booking;
