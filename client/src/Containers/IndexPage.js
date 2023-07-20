import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Skeleton, Box } from "@mui/material";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";
import { toast } from "react-toastify";

import requests from "../Requests";
import ImageViewer from "../utils/ImageViewer";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  const [totalDataInDB, setTotalDataInDB] = useState(null);
  const [page, setPage] = useState(1);
  let skeleton = [];

  const getPlaceData = async () => {
    if (places.length !== totalDataInDB) {
      await axios
        .get(`${requests.placeByUserReq}limit=8&page=${page}`)
        .then((res) => {
          setPlaces([...places, ...res.data.data]);
          setTotalDataInDB(res.data.total);
        });
    }
  };

  useEffect(() => {
    getPlaceData();
  }, [page]);

  const handleScroll = async () => {
    try {
      if (
        document.scrollingElement.scrollHeight + window.innerHeight + 1 >=
        document.scrollingElement.scrollTop
      ) {
        setPage((previous) => previous + 1);
      }
    } catch (error) {
      toast.error("Something went wrong. Try again...");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  for (let i = 0; i < 3; i++) {
    skeleton.push(
      <div>
        <Skeleton
          variant="rectangular"
          className="rounded-2xl"
          width={350}
          height={350}
        />
        <Box sx={{ pt: 0.5 }}>
          <Skeleton height={50} />
          <Skeleton width="60%" />
          <Skeleton width="60%" />
        </Box>
      </div>
    );
  }

  return (
    <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places && places.length > 0 ? (
        places.map((items) => (
          <Link
            to={`/listings/${items._id}`}
            className="border rounded-2xl shadow-md hover:scale-110"
          >
            <div className="flex mb-2">
              {items.photos?.[0] && (
                <ImageViewer
                  imageName={items.photos[0]}
                  styling={
                    "rounded-t-2xl object-cover w-full h-full aspect-square "
                  }
                />
              )}
            </div>
            <div className="p-2">
              <h5 className="truncate">{items.title}</h5>
              <h6 className="text-sm text-gray-600">{items.address}</h6>
              <div className="mt-1 flex gap-1">
                <TbCurrencyRupeeNepalese className="h-5 w-5 mt-1" />
                <b>{items.price} </b> night
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="flex  gap-5">{skeleton}</div>
      )}
    </div>
  );
};

export default IndexPage;
