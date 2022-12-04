import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from 'react'
import './Reserve.css';
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Reserve = ({ setOpen, hotelId }) => {
  const navigate = useNavigate();
  const [selectRooms, setSelectRooms] = useState([])
  const { data, loading, error } = useFetch(`http://localhost:8000/api/hotels/rooms/${hotelId}`);
  const { dates } = useContext(SearchContext)

  const getDatesRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());
    const dates = []
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1)
    }
    return dates;
  }
  const allDates = getDatesRange(dates[0].startDate, dates[0].endDate)

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime()))
    return !isFound;
  }

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectRooms(checked ? [...selectRooms, value] : selectRooms.filter((item) => item !== value))
  }

  const handleClick =async (e) => {
    e.preventDefault();
      try {
        await Promise.all(
          selectRooms.map((roomId) => {
            const res = axios.put(`http://localhost:8000/api/rooms/availablelity/${roomId}`, {
              dates: allDates,
            });
            console.log(res.data)
            return res.data;
          })
        );
        setOpen(false);
        // navigate("/");
      
      } catch (err) {console.log(err)}
  }
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) =>
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{data.title}</div>
              <div className="rDesc">{data.desc}</div>
              <div className="rMax">
                Max people: <b> {item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {
                item.roomNumbers.map((roomNumber) => (
                  <div className="room" key={roomNumber._id}>
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                    />
                  </div>
                ))
              } 
            </div>
          </div>
        )}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  )
}

export default Reserve