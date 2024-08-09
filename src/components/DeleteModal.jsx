/* eslint-disable react/prop-types */
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';

import "./../styles/deleteModal.css";

import { deleteRestaurant } from '../store/slices/restaurantsSlice';
import { BASE_URL } from "../helper/constent";

import Modal from "./Modal";
import Button from "./Button";

const DeleteModal = ({ isVisible, handleModalClose, deleteResData }) => {
  const dispatch = useDispatch()

  const handleDeleteConfirmPress = async () => {
    try {
      const res = await fetch(`${BASE_URL}${deleteResData.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(null),
      });
      const data = await res.json()
      dispatch(deleteRestaurant(data.id))
    } catch (error) {
      console.error(error)
    } finally {
      handleModalClose()
    }
  }

  return (
    <Modal isVisible={isVisible}>
      <div className='delete-box'>
        <MdDelete size={26} />
        <div className='delete-text'>
         Are you sure you want to delete this restaurant ?
        </div>
        <div className='delete-btns'>
          <Button btnStyle='del-btn' onClick={handleDeleteConfirmPress}>Yes</Button>
          <Button btnStyle='del-btn no-btn' onClick={handleModalClose}>No</Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal