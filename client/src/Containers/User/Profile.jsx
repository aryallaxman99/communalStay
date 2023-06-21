import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FaFacebookSquare } from "react-icons/fa";

import Button from "../../widgets/button/Button";
import Input from "../../widgets/input/Input";
import requests from "../../Requests";
import { setUserDetails } from "../../reducers/userSlice";
import ProfilePicture from "../../Components/Photo/ProfilePicture";

const Profile = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [socialMediaAccountLink, setSocialMediaAccountLink] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const cookie = Cookies.get();

  const saveProfile = () => {
    setIsEditing(false);
    if (loading) {
      return;
    }
    setLoading(true);
    if (cookie.accessToken) {
      const data = {
        bio,
        firstName,
        lastName,
        address,
        phoneNumber,
        socialMediaAccountLink,
      };
      axios
        .put(requests.userProfile, data)
        .then((res) => {
          if (res.data) {
            dispatch(
              setUserDetails(res.data.userName, res.data.profilePicture)
            );
            toast[res.data.type](res.data.msg);
          }
        })
        .catch((error) => {
          toast[error.response.data.type](error.response.data.msg);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    axios.get(requests.userProfile).then((res) => {
      setBio(res.data.userDetails.bio);
      setFirstName(res.data.userDetails.firstName);
      setLastName(res.data.userDetails.lastName);
      setAddress(res.data.userDetails.address);
      setPhoneNumber(res.data.userDetails.phoneNumber);
      setSocialMediaAccountLink(res.data.userDetails.socialMediaAccountLink);
      setProfilePicture(res.data.userDetails.profilePicture);
    });
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center">
        <ProfilePicture
          profilePicture={profilePicture}
          setProfilePicture={setProfilePicture}
        />
        <div className="ml-4">
          <h2 className="text-2xl font-semibold">
            {`${firstName} ${lastName}`}
          </h2>
          <p className="text-gray-500">Location: {address}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">About</h3>
        {isEditing ? (
          <>
            <div>
              <textarea
                className="border rounded p-2 w-full"
                value={bio}
                placeholder="About"
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="gap-10 flex">
                <div>
                  <h4 className="text-sm font-semibold">First Name</h4>
                  <Input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Last Name</h4>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Address</h4>

                  <Input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Phone Number</h4>

                  <Input
                    type="Number"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-semibold">Social Media</h3>
                <div className="mt-4 gap-2 flex">
                  <FaFacebookSquare className="h-11 w-11 text-blue-700" />

                  <Input
                    type="text"
                    placeholder="Profile Link"
                    value={socialMediaAccountLink}
                    onChange={(e) => setSocialMediaAccountLink(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Button className="bg-secondary" onClick={saveProfile}>
                Save
              </Button>
            </div>
          </>
        ) : (
          <>
            <div>
              <p>{bio}</p>
            </div>

            <div className="mt-8 ">
              <h3 className="text-lg font-semibold">Contact Information </h3>
              <div className="gap-10 mt-3 flex">
                <div>
                  <h4 className="text-sm font-semibold">First Name</h4>
                  {firstName}
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Last Name</h4>
                  {lastName}
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Address</h4>
                  {address}
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Phone Number</h4>
                  {phoneNumber}
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold">Social Media</h3>
              <div className="mt-4 gap-2 flex">
                <FaFacebookSquare className="h-7 w-7 text-blue-700" />
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={socialMediaAccountLink}
                >
                  {socialMediaAccountLink}
                </a>
              </div>
            </div>

            <div className="mt-8">
              <Button
                className="bg-secondary position-fixed"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
