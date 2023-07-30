import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogActions, DialogContent, Skeleton } from "@mui/material";
import { toast } from "react-toastify";
import { HiArrowRight } from "react-icons/hi";
import { HiOutlineCalendarDays, HiOutlineCreditCard } from "react-icons/hi2";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";
import { LuCalendarX2 } from "react-icons/lu";

import Account from "../User/Account";
import requests from "../../Requests";
import Button from "../../widgets/button/Button";
import ImageViewer from "../../utils/ImageViewer";
import LocationFinder from "../../Components/maps/LocationFinder";

const BookingPage = () => {
  const [bookings, setBookings] = useState();
  const [open, setOpen] = useState(false);
  const [reservationId, setReservationId] = useState();

  const CancelReservation = (id) => {
    if (id) {
      axios.delete(requests.cancelReservation + id).then((res) => {
        if (res.data) {
          toast[res.data.type](res.data.msg);
        }
      });
    }
    setOpen(false);
    setReservationId(id);
  };
  useEffect(() => {
    axios.get(requests.reserve).then((res) => setBookings(res.data));
  }, [reservationId]);
  return (
    <div>
      <Account />
      <div>
        {bookings ? (
          bookings.length > 0 ? (
            bookings.map((items) => (
              <div
                key={items._id}
                className="mt-10 mb-10 bg-gray-200 rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              >
                {items.placeid.photos
                  ? items.placeid.photos.length > 0 && (
                      <div className="w-full h-full">
                        <ImageViewer imageName={items.placeid.photos[0]} />
                      </div>
                    )
                  : null}
                <div>
                  <h2 className="mt-4 text-xl">{items.placeid.title}</h2>
                  <LocationFinder
                    styling={"text-sm underline"}
                    location={items.placeid.address}
                  />
                  <div className="h-px w-400 my-2 bg-gray-300" />

                  <div className="text-sm gap-2 flex text-gray-700">
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
                  {items.checkOut.split("T")[0] >
                  new Date().toISOString().split("T")[0] ? (
                    <div>
                      <Button
                        onClick={() => setOpen(true)}
                        className="bg-secondary inline-flex gap-1 py-2 px-6 mt-3 w-auto"
                      >
                        <LuCalendarX2 className="h-6 w-6" />
                        Cancel reservation
                      </Button>
                      <Dialog open={open} onClose={() => setOpen(false)}>
                        <DialogContent>
                          Are you sure you want to cancel this reservation?
                        </DialogContent>
                        <DialogActions>
                          <Button
                            className="bg-secondary"
                            onClick={() => setOpen(false)}
                          >
                            cancel
                          </Button>
                          <Button
                            className="bg-secondary"
                            autoFocus
                            onClick={() => CancelReservation(items._id)}
                          >
                            Ok
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5">
              <h3 className="font-semibold">No reservation found </h3>
              <h5>Looks like you haven't reserved any stays </h5>
            </div>
          )
        ) : (
          <div>
            <Skeleton height={200} animation="pulse" />
            <Skeleton height={200} animation="wave" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
