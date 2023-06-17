import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogActions, DialogContent, Skeleton } from "@mui/material";
import { toast } from "react-toastify";
import { HiOutlineLocationMarker, HiArrowRight } from "react-icons/hi";
import { HiOutlineCalendarDays, HiOutlineCreditCard } from "react-icons/hi2";
import Account from "../User/Account";
import requests from "../../Requests";
import Button from "../../widgets/button/Button";

const BookingPage = () => {
  const [bookings, setBookings] = useState();
  const [open, setOpen] = useState(false);
  const [reservationId, setReservationId] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
              <div className="mt-10 flex bg-gray-200 rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {items.placeid.photos
                  ? items.placeid.photos.length > 0 && (
                      <div className="w-full h-full">
                        <img
                          src={`http://localhost:8000/uploads/${items.placeid.photos[0]}`}
                          alt=""
                        />
                      </div>
                    )
                  : null}
                <div>
                  <h2 className="mt-4 text-xl">{items.placeid.title}</h2>
                  <div className="flex">
                    <HiOutlineLocationMarker className="h-5 w-5" />
                    <a
                      className="text-sm underline"
                      target="_blank"
                      rel="noreferrer"
                      href={`https://maps.google.com/?q=${items.placeid.address}`}
                    >
                      {items.placeid.address}
                    </a>
                  </div>
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

                    <span className="font-semibold">
                      {`Total price: NPR ${items.totalPrice}`}
                    </span>
                  </div>
                  <Button
                    onClick={handleClickOpen}
                    className="mt-2 bg-secondary"
                  >
                    Cancel reservation
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                      Are you sure you want to cancel this reservation?
                    </DialogContent>
                    <DialogActions>
                      <Button className="bg-secondary" onClick={handleClose}>
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
