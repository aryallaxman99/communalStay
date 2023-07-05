import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";

import Input from "../../widgets/input/Input";
import Button from "../../widgets/button/Button";
import Features from "../Features/Features";
import { PhotoUploader } from "../../Components/Photo/PhotoUploader";
import requests from "../../Requests";
import Account from "../User/Account";
import Map from "../../Components/maps/Map";

const PlacesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [price, setPrice] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [features, setFeatures] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState("1");
  const [placeId, setPlaceId] = useState();
  const [openMap, setOpenMap] = useState(false);

  const savePlace = (event) => {
    event.preventDefault();
    if (
      title &&
      address &&
      photos &&
      price &&
      descriptions &&
      features &&
      checkIn &&
      checkOut &&
      maxGuests
    ) {
      const values = {
        title,
        address,
        photos,
        price,
        descriptions,
        features,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      };
      if (!id) {
        axios.post(requests.places, values).then((res) => {
          if (res.data.status === true) {
            navigate("/account/places");
          }
          toast[res.data.type](res.data.msg);
        });
      } else {
        values._id = placeId;
        axios.put(requests.updatePlaces, values).then((res) => {
          if (res.data.status === true) {
            navigate("/account/places");
          }
          toast[res.data.type](res.data.msg);
        });
      }
    } else {
      toast.warn("Fill all the froms");
    }
  };

  useEffect(() => {
    if (id) {
      axios.get(requests.getPlacesById + id).then((res) => {
        setTitle(res.data.placeInfo.title);
        setAddress(res.data.placeInfo.address);
        setPhotos(res.data.placeInfo.photos);
        setPrice(res.data.placeInfo.price);
        setDescriptions(res.data.placeInfo.descriptions);
        setFeatures(res.data.placeInfo.features);
        setExtraInfo(res.data.placeInfo.extraInfo);
        setCheckIn(res.data.placeInfo.checkIn);
        setCheckOut(res.data.placeInfo.checkOut);
        setMaxGuests(res.data.placeInfo.maxGuests);
        setPlaceId(res.data.placeInfo._id);
      });
    }
  }, [id]);

  return (
    <div className="py-8">
      <Account />
      <form onSubmit={savePlace}>
        <h3 className="mt-4">Title</h3>
        <p className="text-gray-500 text-sm">Title for your place</p>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <h3 className="mt-4">Address</h3>
        <p className="text-gray-500 text-sm">Address to your place</p>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <Button
            type="button"
            onClick={() => setOpenMap(true)}
            className="bg-secondary"
          >
            Find on map
          </Button>
        </div>

        <PhotoUploader photos={photos} setPhotos={setPhotos} />
        <h3 className="mt-4">Description</h3>
        <p className="text-sm text-gray-500">Description of the place</p>
        <textarea
          placeholder="Description about your place"
          value={descriptions}
          onChange={(e) => setDescriptions(e.target.value)}
        />

        <h3 className="mt-4">Features</h3>
        <p className="text-sm text-gray-500">
          Select all the features of your place
        </p>

        <Features features={features} setFeatures={setFeatures} />

        <h3 className="mt-4">Extra info</h3>
        <p className="text-gray-500 text-sm">
          Extra information about your place
        </p>
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        <h3 className="mt-4">Price</h3>
        <p className="text-gray-500 text-sm">Per Night stay rate..</p>
        <Input
          type="Number"
          placeholder="Price in NPR"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <h3 className="mt-4">Check In and Check Out</h3>
        <p className="text-gray-500 text-sm">add check in and out times</p>
        <div className="grid gap-2 sm:grid-cols-3 mb-2">
          <div className="mt-2 -mb-1">
            <h5>Check In time</h5>
            <Input
              type="text"
              placeholder="12:00"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="mt-2 -mb-1">
            <h5>Check Out time</h5>
            <Input
              type="text"
              placeholder="12:00"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div className="mt-2 -mb-1">
            <h5>Number of guests</h5>
            <Input
              type="number"
              required
              min="1"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              placeholder="Guests"
            />
          </div>
        </div>
        <Button type="submit" className="bg-secondary">
          Save
        </Button>
      </form>
      <div>
        {openMap && (
          <div className="fixed inset-0 flex items-center bg-gray-600 bg-opacity-50	justify-center">
            <div className="border border-hidden px-8 relative">
              <Map
                address={address}
                setAddress={setAddress}
                setOpenMap={setOpenMap}
              />
              <Button
                className="absolute -top-2 right-0 bg-opacity-0 w-auto"
                onClick={() => setOpenMap(false)}
              >
                <IoCloseSharp className="h-6 w-6" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacesForm;
