/* eslint-disable react/prop-types */
import { MdOutlineModeEditOutline } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import { IoIosStar } from "react-icons/io";

import "./../styles/restaurantBox.css";

import { compareTime } from "../helper";

function RestaurantBox({
  resData,
  handleEditClick,
  handleRestaurantDeletePress,
}) {
  const {
    name,
    address,
    restroImage,
    ratings,
    opensAt,
  } = resData;

  return (
    <div className="restaurant-box">
      <div className="restaurant-img-box">
        <img src={restroImage} alt="" className="restro-img" />
        <div className="action-icons">
          <div
            className="icon-box edit-box"
            onClick={() => handleEditClick(resData)}
          >
            <MdOutlineModeEditOutline size={20} className="ic-icon" />
          </div>
          <div
            className="icon-box del-box"
            onClick={() => handleRestaurantDeletePress(resData)}
          >
            <HiOutlineTrash size={20} className="ic-icon" />
          </div>
        </div>
      </div>
      <div className="restaurant-info">
        <div className="res-title">
          <div className="res-name">{name}</div>
          <div className="res-rating">
            <div className="rating">{ratings}</div>
            <IoIosStar size={10} color="white" />
          </div>
        </div>
        <div className="res-address">{address}</div>
        <div className="res-timing">Opens at {compareTime(opensAt)}</div>
      </div>
    </div>
  );
}

export default RestaurantBox;
