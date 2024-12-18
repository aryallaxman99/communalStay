import React, { useEffect, useRef, useState } from "react";
import OtpInput from "react-otp-input";
import Button from "../../widgets/button/Button";
import axios from "axios";
import requests from "../../Requests";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const OTP = () => {
  const Ref = useRef(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [otp, setOtp] = useState(null);
  const [timer, setTimer] = useState("00:00");
  const [loading, setLoading] = useState(false);

  const startCountdown = (time) => {
    setTimer("00:30");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      const total = Date.parse(time) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      if (total >= 0) {
        setTimer(
          (minutes > 9 ? minutes : "0" + minutes) +
            ":" +
            (seconds > 9 ? seconds : "0" + seconds)
        );
      }
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 30);
    return deadline;
  };

  const resendOTP = async () => {
    startCountdown(getDeadTime());
    if (loading) {
      return;
    }
    setLoading(true);
    await axios
      .post(requests.verifyEmail, state)
      .then((res) => {
        if (res.data.status) {
          toast[res.data.type](res.data.msg);
        }
      })
      .catch((error) => {
        if (!error.response.data.status) {
          toast[error.response.data.type](error.response.data.msg);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const verifyOTP = () => {
    if (otp && otp.length === 6) {
      if (loading) {
        return;
      }
      setLoading(true);
      axios
        .post(requests.verifyOTP, { otp })
        .then((res) => {
          if (res.data.status) {
            navigate("/resetPassword", {
              state: {
                fromOTP: true,
                otp: otp,
                randomValue: res.data.randomValue,
              },
            });
          }
        })
        .catch((error) => {
          if (!error.response.data.status) {
            toast[error.response.data.type](error.response.data.msg);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.error("Enter an OTP");
    }
  };

  useEffect(() => {
    startCountdown(getDeadTime());
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h4>Verify OTP</h4>
      <div className="border-2 shadow p-9 mt-4">
        <p>An OTP has been sent to your Device</p>
        <div className="flex-col items-baseline ">
          <p className="font-medium">Enter your Code here</p>
          <div className=" mt-4 ">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              shouldAutoFocus={true}
              inputStyle={{
                border: "1px solid",
                borderRadius: "8px",
                width: "40px",
                height: "40px",
                fontSize: "20px",
                borderColor: "gray",
              }}
              renderSeparator={<span className="w-5" />}
              renderInput={(props) => <input {...props} />}
            />
          </div>
        </div>
        <div className="mt-4">
          <p className="p3">Didn't receive the code?</p>
          <div className="flex space-x-6">
            <Button
              className="underline text-lg cursor-pointer hover:text-red-500 bg-transparent	text-black w-auto"
              onClick={() => resendOTP()}
              disabled={timer !== "00:00"}
            >
              Resend
            </Button>
            <div className="text-xl mt-2 text-gray-500">{timer}</div>
          </div>
        </div>
        <Button className="bg-secondary mt-4" onClick={() => verifyOTP()}>
          Verify
        </Button>
      </div>
    </div>
  );
};

export default OTP;
