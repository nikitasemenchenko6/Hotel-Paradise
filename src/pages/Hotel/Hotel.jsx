import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Hotel.css';
import {
    faCircleArrowLeft,
    faCircleArrowRight,
    faCircleXmark,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';
import { photos } from './PhotosArray';
import MailList from '../../components/MailList/MailList';
import Footer from '../../components/Footer/Footer';
import useFetch from '../../hooks/useFetch';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import Reserve from '../Reserve/Reserve';
const Hotel = () => {
    const {user} = useContext(AuthContext);
    const location = useLocation().pathname.split("/")[2];
    const { data, loading, error, reFetchData } = useFetch(`http://localhost:8000/api/hotels/find/${location}`)
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    };
    const {dates, options} = useContext(SearchContext);

    const MILLISECONDS_PER_DAY = 1000*60*60*24;
    const dayDifferent = (date1, date2) => {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime())
        const dayDiff = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return dayDiff;
    }
    const days = dayDifferent(dates[0].endDate, dates[0].startDate);
    const navigate = useNavigate();
    const handleMove = (direction) => {
        let newSlideNumber;

        if (direction === "l") {
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
        } else {
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
        }

        setSlideNumber(newSlideNumber)
    };


    const handleReserve = () =>{
        if(!user)return navigate('/')
        setOpenModal(true)
    }

    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="hotelContainer">
                {open && (
                    <div className="slider">
                        <FontAwesomeIcon
                            icon={faCircleXmark}
                            className="close"
                            onClick={() => setOpen(false)}
                        />
                        <FontAwesomeIcon
                            icon={faCircleArrowLeft}
                            className="arrow"
                            onClick={() => handleMove("l")}
                        />
                        <div className="sliderWrapper">
                            <img src={photos[slideNumber].src} alt="" className="sliderImg" />
                        </div>
                        <FontAwesomeIcon
                            icon={faCircleArrowRight}
                            className="arrow"
                            onClick={() => handleMove("r")}
                        />
                    </div>
                )}
                <div className="hotelWrapper">
                    <button className="bookNow">Reserve or Book Now!</button>
                    <h1 className="hotelTitle">{data.title}</h1>
                    <div className="hotelAddress">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>Elton St 125 New york</span>
                    </div>
                    <span className="hotelDistance">
                        Excellent location – {data.distance}m from center
                    </span>
                    <span className="hotelPriceHighlight">
                        Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
                    </span>
                    <div className="hotelImages">
                        {photos.map((photo, i) => (
                            <div className="hotelImgWrapper" key={i}>
                                <img
                                    onClick={() => handleOpen(i)}
                                    src={photo.src}
                                    alt=""
                                    className="hotelImg"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="hotelDetails">
                        <div className="hotelDetailsTexts">
                            <h1 className="hotelTitle">Stay in the heart of City</h1>
                            <p className="hotelDesc">
                                {data.desc}
                            </p>
                        </div>
                        <div className="hotelDetailsPrice">
                            <h1>Perfect for a {days}-night stay!</h1>
                            <span>
                                Located in the real heart of Krakow, this property has an
                                excellent location score of 9.8!
                            </span>
                            <h2>
                                <b>${data.cheapestPrice * days * options.room}</b> ({days} nights)
                            </h2>
                            <button onClick={handleReserve}>Reserve or Book Now!</button>
                        </div>
                    </div>
                </div>
                <MailList />
                <Footer />
            </div>
            {openModal && <Reserve setOpen={setOpenModal} hotelId={location}></Reserve>}
        </div>
    )
}

export default Hotel