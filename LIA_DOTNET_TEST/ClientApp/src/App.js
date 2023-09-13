import React, { useContext } from "react";
import DayRow from "./components/DayRow";
import "./custom.css";
import { AppContext } from "./Context";
import inadra from "./assets/images/inadra logo.png"

export default function App() {

    const {
        bookings,
        weekDays
    } = useContext(AppContext);

    return (
        <div className="background">
            <div className="booking-table">
                <div className="header">
                    <h1>Booking System</h1>
                    <img className="logo" src={inadra} alt="" />
                </div> 
                <div className="top-row"></div>
                {weekDays.map((dayName, i) => {
                    const day = i + 1;
                    const booking = bookings[day] || [];
                    return (
                        <DayRow
                            key={dayName}
                            dayName={dayName}
                            day={day}
                            bookings={booking}
                        />
                    );
                })}
            </div>
        </div>
    );
}
