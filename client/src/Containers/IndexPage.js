import { Link } from "react-router-dom";
import { Skeleton, Box } from "@mui/material";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";
import ImageViewer from "../utils/ImageViewer";
import { useGetPlaceData } from "../hooks/useGetPlaceData";

const IndexPage = () => {
  const { error, loading, places } = useGetPlaceData();

  if (loading) {
    return (
      <div className="flex space-x-5">
        {new Array(3).fill(1).map((_, index) => {
          return (
            <div key={index}>
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
        })}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error.data.msg}</p>;
  }

  if (!places || !places.length) {
    return (
      <p className="text-yellow-500">
        Currently we donnot have any places in our listing.
      </p>
    );
  }

  return (
    <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-10">
      {places.map((items) => (
        <Link
          key={items._id}
          to={`/listings/${items._id}`}
          className="border rounded-2xl shadow-md hover:scale-110 transition translate ease-in-out"
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
      ))}
    </div>
  );
};

export default IndexPage;
