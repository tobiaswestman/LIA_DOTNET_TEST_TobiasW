import React, { useContext } from "react";
import TimeSlot from "./TimeSlot";
import { AppContext } from "../Context";

const DayRow = ({ dayName, day, bookings }) => {

    const {
        timeSlots,
    } = useContext(AppContext);

    return (
        <div className="booking-row">
            <div className="booking-title">{dayName}</div>
            <div className="timeslot-list">
                {timeSlots?.map(({ startTime, endTime }) => (
                    <TimeSlot
                        key={`${dayName}_${startTime}_${endTime}`}
                        day={day}
                        startTime={startTime}
                        endTime={endTime}
                        booking={bookings.find(
                            ({ timeSlot }) => timeSlot.startTime === startTime && timeSlot.endTime === endTime
                        )}
                    />
                ))}
            </div>
        </div>
    );
};

export default DayRow;