/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosStarOutline, IoIosStar } from "react-icons/io";
import { Oval } from "react-loader-spinner";
import Rating from "react-rating";
import TimePicker from "react-time-picker";
import { v6 as uuidv6 } from "uuid";

import "./../styles/restaurantEditBox.css";
import "react-time-picker/dist/TimePicker.css";

import Modal from "./Modal";
import Button from "./Button";
import InputBox from "./InputBox";

import {
  addRestaurant,
  updateRestroDetail,
} from "../store/slices/restaurantsSlice";

import { validateObjectFields } from "../helper";
import { BASE_URL } from "../helper/constent";

const RestaurantEditBox = ({
  isVisible,
  resData = {
    name: "",
    cuisine: "",
    address: "",
    ratings: "",
    opensAt: "",
    restroImage: "",
  },
  handleClose,
}) => {
  const dispatch = useDispatch();
  const [restaurantData, setRestaurantData] = useState(resData);
  const [fieldError, setFieldError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResUpdate = (update, key) => {
    setFieldError(false);
    setRestaurantData((prevState) => ({ ...prevState, [key]: update }));
  };

  const handleNewRestroAdd = async () => {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...restaurantData, id: uuidv6() }),
      });
      const data = await res.json();
      dispatch(addRestaurant(data));
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
    }
  };

  const handleRestroUpdate = async () => {
    try {
      const res = await fetch(`${BASE_URL}${resData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(restaurantData),
      });
      const data = await res.json();
      dispatch(updateRestroDetail(data));
    } catch (error) {
      console.log("error", error);
    } finally {
      handleClose();
    }
  };

  const handleDoneClick = () => {
    if (!validateObjectFields(restaurantData)) {
      setFieldError(true);
      return;
    }
    setIsLoading(true);
    if (resData?.name) {
      handleRestroUpdate();
    } else {
      handleNewRestroAdd();
    }
  };

  return (
    <Modal isVisible={isVisible}>
      <div className="res-edit-box">
        {isLoading && (
          <div className="loading-box">
            <Oval
              visible={true}
              height="50"
              width="50"
              color="#ef4f5f"
              secondaryColor="red"
              strokeWidth="5"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
        <div className="close-box">
          <IoCloseSharp
            size={25}
            className="close-icon"
            onClick={handleClose}
          />
        </div>
        <div className="res-info">
          <InputBox
            type="text"
            value={restaurantData?.name ?? ""}
            onChange={(e) => handleResUpdate(e.target.value, "name")}
            label={"Name"}
            isRequired={true}
          />
        </div>
        <div className="res-info">
          <InputBox
            type="text"
            value={restaurantData?.cuisine ?? ""}
            onChange={(e) => handleResUpdate(e.target.value, "cuisine")}
            label={"Cuisines"}
            inputId={"cuisine"}
            isRequired={true}
          />
        </div>
        <div className="res-info">
          <InputBox
            type="text"
            value={restaurantData?.address ?? ""}
            onChange={(e) => handleResUpdate(e.target.value, "address")}
            label="Address"
            isRequired={true}
          />
        </div>
        <div className="res-info">
          <div>
            <span className="rating-label">Rating</span>
            <span className="error-text">*</span>
          </div>
          <Rating
            onChange={(rate) => handleResUpdate(rate, "ratings")}
            initialRating={restaurantData?.ratings ?? ""}
            emptySymbol={<IoIosStarOutline size={30} color="#ee4e62" />}
            fullSymbol={<IoIosStar size={30} color="#ee4e62" />}
            fractions={2}
            className="rating-box"
            isRequired={true}
          />
        </div>
        <div className="res-info">
          <div>
            <span>Opens at</span>
            <span className="error-text">*</span>
          </div>
          <TimePicker
            onChange={(time) => handleResUpdate(time, "opensAt")}
            value={restaurantData?.opensAt ?? ""}
            isOpen={false}
            disableClock
          />
        </div>
        <div className="res-info">
          <InputBox
            type="text"
            value={restaurantData?.restroImage ?? ""}
            onChange={(e) => handleResUpdate(e.target.value, "restroImage")}
            label={"Image URL"}
            inputId={"restroImage"}
            isRequired={true}
          />
        </div>
        <div className="done-btn">
          <Button onClick={handleDoneClick}>Done</Button>
        </div>
        {fieldError && (
          <div className="error-box">
            <span className="error-text">* Fields are required</span>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default RestaurantEditBox;
