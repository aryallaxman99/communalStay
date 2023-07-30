import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";
import { MdAlternateEmail } from "react-icons/md";
import { HiArrowRight } from "react-icons/hi";
import {
  HiOutlineCalendarDays,
  HiOutlineCreditCard,
  HiOutlinePhoneArrowUpRight,
} from "react-icons/hi2";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";

import requests from "../../Requests";
import ImageViewer from "../../utils/ImageViewer";
import LocationFinder from "../../Components/maps/LocationFinder";
import Account from "../User/Account";

const ReservedPlaces = () => {
  const [bookingPlaces, setBookingPlaces] = useState([]);

  useEffect(() => {
    axios
      .get(requests.reservedPlaces)
      .then((res) => {
        setBookingPlaces([
          ...res.data.filter(
            (items) =>
              items.checkOut.split("T")[0] >=
              new Date().toISOString().split("T")[0]
          ),
        ]);
      })
      .catch((error) => {
        if (!error.response.data.status) {
          toast[error.response.data.type](error.response.data.msg);
        }
      });
  }, []);

  return (
    <div>
      <Account />
      {bookingPlaces ? (
        bookingPlaces.length > 0 ? (
          bookingPlaces.map((items) => (
            <div key={items._id}>
              {items.checkOut.split("T")[0] >
                new Date().toISOString().split("T")[0] && (
                <div className="mt-10 bg-gray-200 rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  <div className="w-full h-full">
                    <ImageViewer imageName={items.placeid.photos[0]} />
                  </div>
                  <div>
                    <h2 className="mt-4 text-xl">{items.placeid.title}</h2>
                    <LocationFinder
                      styling={"text-sm underline"}
                      location={items.placeid.address}
                    />
                    <div className="h-px w-400 my-2 bg-gray-300" />
                    <div className="text-sm text-gray-700">
                      <div className="flex gap-2">
                        <MdAlternateEmail className="h-5 w-5" />
                        {items.email}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <HiOutlinePhoneArrowUpRight className="h-5 w-5" />
                        {items.phoneNumber}
                      </div>
                    </div>
                    <div className="text-sm gap-2 flex text-gray-700 mt-2">
                      <div className="flex">
                        <HiOutlineCalendarDays className="h-5 w-5" />
                        {items.checkIn.split("T")[0]}
                      </div>
                      <HiArrowRight className="h-6 w-6" />
                      <div className="flex">
                        <HiOutlineCalendarDays className="h-5 w-5" />
                        {items.checkOut.split("T")[0]}
                      </div>
                    </div>
                    <div className="mt-2 flex">
                      <HiOutlineCreditCard className="h-6 w-6" />
                      <div className="font-semibold flex gap-2">
                        Total price:
                        <TbCurrencyRupeeNepalese className="h-5 w-5 mt-1" />
                        {items.totalPrice}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-5">
            <h3 className="font-semibold">No bookings found </h3>
            <h5>Looks like users haven't reserved any stays </h5>
          </div>
        )
      ) : (
        <div>
          <Skeleton height={200} animation="pulse" />
          <Skeleton height={200} animation="wave" />
        </div>
      )}
    </div>
  );
};

export default ReservedPlaces;
