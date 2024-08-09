import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdAdd } from "react-icons/md";
import { SiFoodpanda } from "react-icons/si";
import { TailSpin } from "react-loader-spinner";

import "./../styles/dashboard.css";

import { addList } from "../store/slices/restaurantsSlice";

import { BASE_URL } from "../helper/constent";

import DeleteModal from "./DeleteModal";
import RestaurantBox from "./RestaurantBox";
import RestaurantEditBox from "./RestaurantEditBox";
import Header from "./Header";

const Dashboard = () => {
  const [restroList, setRestroList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  //Modals
  const [deleteModal, setDeleteModal] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);

  const [currentRestro, setCurrentRestro] = useState();

  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.restaurants);

  useEffect(() => {
    const fetchRestroList = async () => {
      try {
        const response = await fetch(BASE_URL);
        const result = await response.json();
        dispatch(addList(result));
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRestroList();
  }, []);

  useEffect(() => {
    setRestroList(list); 
  },[list])

  useEffect(() => {
   if (searchQuery) {
      const filteredList = list.filter((restro) => {
        return restro.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setRestroList(filteredList);
   } else {
      setRestroList(list)
    }
  }, [searchQuery]);

  const handleEditClick = (restaurantId) => {
    setIsEditVisible(true);
    setCurrentRestro(restaurantId);
  };

  const handleResDeletePress = (resId) => {
    setDeleteModal(true);
    setCurrentRestro(resId);
  };

  const handleEditClose = () => {
    setIsEditVisible(false);
    setCurrentRestro();
  };

  const handleDeleteClose = () => {
    setDeleteModal(false);
    setCurrentRestro();
  };

  const handleAddNewClick = () => {
    setIsEditVisible(true);
  };

  return (
    <>
      {isEditVisible && (
        <RestaurantEditBox
          isVisible={isEditVisible}
          resData={currentRestro}
          handleClose={handleEditClose}
        />
      )}
      {deleteModal && (
        <DeleteModal
          isVisible={deleteModal}
          handleModalClose={handleDeleteClose}
          deleteResData={currentRestro}
        />
      )}
      <main className="dashboard">
        <Header handleSearchInput={setSearchQuery} />
        <div className="dashboard-content">
          {!error && (<div className="add-btn" onClick={handleAddNewClick}>
            <MdAdd color="white" className="add-icon" />
            <p className="add-text">Add New</p>
          </div>)}
          {isLoading && (
            <TailSpin
              visible={true}
              height="80"
              width="80"
              color="#ee4e62"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
            />
          )}
          {!isLoading && restroList.length > 0 && (
            <div className="res-list-box">
              {restroList.map((res) => (
                <RestaurantBox
                  resData={res}
                  key={res.id}
                  handleEditClick={handleEditClick}
                  handleRestaurantDeletePress={handleResDeletePress}
                />
              ))}
            </div>
          )}
          {!isLoading && error && (<div className="list-error">
            <SiFoodpanda size={60} />
            <span className="error-message">We are facing some issue please try again later!</span>
          </div>)}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
