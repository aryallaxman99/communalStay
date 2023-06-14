import React, { useState } from "react";
import Button from "../../widgets/button/Button";
import Input from "../../widgets/input/Input";

const Profile = () => {
  const profilePicture =
    "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";
  const [bio, setBio] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  );
  const phoneNumber = 987883287;
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const saveProfile = () => {
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center">
        <img
          src={profilePicture}
          alt="Profile"
          className="w-16 h-16 rounded-full"
        />
        <div className="ml-4">
          <h2 className="text-2xl font-semibold">Test Test</h2>
          <p className="text-gray-500">Location: Butwal, Nepal</p>
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
                    value={phoneNumber}
                    onChange={(e) => console.log(e.target.value)}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Last Name</h4>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    value={phoneNumber}
                    onChange={(e) => console.log(e.target.value)}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Address</h4>

                  <Input
                    type="text"
                    placeholder="Address"
                    value={phoneNumber}
                    onChange={(e) => console.log(e.target.value)}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Phone Number</h4>

                  <Input
                    type="Number"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => console.log(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-semibold">Social Media</h3>
                <div className="mt-4 gap-2 flex">
                  <img
                    className="h-11 w-11"
                    src="https://img.icons8.com/?size=512&id=BsoWS6BDZrHp&format=png"
                    alt=""
                  />
                  <Input
                    type="text"
                    placeholder="Profile Link"
                    value={phoneNumber}
                    onChange={(e) => console.log(e.target.value)}
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
                  {phoneNumber}
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Last Name</h4>
                  {phoneNumber}
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Address</h4>
                  {phoneNumber}
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
                <img
                  className="h-6 w-6"
                  src="https://img.icons8.com/?size=512&id=BsoWS6BDZrHp&format=png"
                  alt=""
                />
                <a target="_blank" rel="noreferrer" href={phoneNumber}>
                  {phoneNumber}
                </a>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold">Listings</h3>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold">Booking History</h3>
            </div>

            <div className="mt-8">
              <Button className="bg-secondary" onClick={handleEditProfile}>
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
