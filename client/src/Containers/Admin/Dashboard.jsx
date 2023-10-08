import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../../Requests";
import { toast } from "react-toastify";
import {
  MdOutlineRemoveRedEye,
  MdDeleteSweep,
  MdOutlineCheck,
} from "react-icons/md";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState(null);

  const getPlaceData = () => {
    axios
      .get(requests.getAllPlaces)
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        toast.error("something went wrong");
      });
  };

  const Delete = (id) => {
    axios
      .delete(requests.deletePlaceById + id)
      .then((res) => {
        if (res.data) {
          toast[res.data.type](res.data.msg);
        }
      })
      .catch((error) => {
        toast.error("something went wrong");
      });
  };

  const changeStatus = (id) => {
    const values = {
      status: "accepted",
      _id: id,
    };
    axios
      .put(requests.updatePlaces, values)
      .then((res) => {
        if (res.data.status === true) {
          toast.success("accepted");
        }
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    getPlaceData();
  }, []);

  return (
    <div className="flex gap-6">
      <table className="table-fixed border-separate	 border border-slate-500 border-spacing-2">
        <thead>
          <tr>
            <th>Stay ID</th>
            <th>Owner ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {data
            ? data.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.owner}</td>
                    <td>{item.title}</td>
                    <td>{item.address}</td>
                    <td>NPR. {item.price}</td>
                    <td>
                      <Link to={`/listings/${item._id}`} target="_blank">
                        <MdOutlineRemoveRedEye className="h-6 w-6 text-gray-700" />
                      </Link>
                    </td>
                    <td>
                      <button
                        className="bg-inherit"
                        onClick={() => Delete(item._id)}
                      >
                        <MdDeleteSweep className="h-6 w-6 text-gray-700" />
                      </button>
                    </td>
                    <td>
                      {item.status === "pending" ? (
                        <button
                          className="bg-inherit"
                          onClick={() => changeStatus(item._id)}
                        >
                          <MdOutlineCheck className="h-6 w-6 text-gray-700" />
                        </button>
                      ) : null}
                    </td>
                  </tr>
                );
              })
            : "data not found"}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
