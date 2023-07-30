import React from "react";
import { Link, useLocation } from "react-router-dom";
import ImageViewer from "../../utils/ImageViewer";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";

const SearchResultPage = () => {
  const { state } = useLocation();

  return (
    <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {state.places && state.places.length > 0 ? (
        state.places.map((items) => (
          <Link
            key={items.item._id}
            to={`/listings/${items.item._id}`}
            className="border rounded-2xl shadow-md hover:scale-110"
          >
            <div className="flex mb-2">
              {items.item.photos?.[0] && (
                <ImageViewer
                  imageName={items.item.photos[0]}
                  styling={
                    "rounded-t-2xl object-cover w-full h-full aspect-square "
                  }
                />
              )}
            </div>
            <div className="p-2">
              <h5 className="truncate">{items.item.title}</h5>
              <h6 className="text-sm text-gray-600">{items.item.address}</h6>
              <div className="mt-1 flex gap-1">
                <TbCurrencyRupeeNepalese className="h-5 w-5 mt-1" />
                <b>{items.item.price} </b> night
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div>
          <p className="text-start">No any results found.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultPage;
