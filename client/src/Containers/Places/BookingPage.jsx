import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    <a
                      className="text-sm underline"
                      target="_blank"
                      href={`https://maps.google.com/?q=${items.placeid.address}`}
                    >
                      {items.placeid.address}
                    </a>
                  </div>
                  <div className="h-px w-400 my-2 bg-gray-300" />

                  <div className="text-sm gap-2 flex text-gray-700">
                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                        />
                      </svg>

                      {items.checkIn.split("T")[0]}
                    </div>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      />
                    </svg>

                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                        />
                      </svg>

                      {items.checkOut.split("T")[0]}
                    </div>
                  </div>
                  <div className="mt-2 flex">
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
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
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
                  <ToastContainer position="top-center" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5">
              No any bookings found in the system
              <br />
              Booked any stays to display your booking list
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
