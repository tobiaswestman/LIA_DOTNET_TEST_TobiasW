import React, { createContext, useContext, useState, useEffect } from "react";
import { groupBy } from "./utils/utils";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [bookings, setBookings] = useState({});
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [userName, setUserName] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [newDay, setNewDay] = useState(null);
  const [newStartTime, setNewStartTime] = useState(null);
  const [moved, setMoved] = useState(false);
  const [timeSlotBooked, setTimeSlotBooked] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {
    (async () => {
        try {
            let [bookings, timeSlots] = await Promise.all([
                fetch("/booking").then((response) => response.json()),
                fetch("/booking/timeslots").then((response) => response.json())
            ]);
            setBookings(groupBy(bookings, "day"));
            setTimeSlots(timeSlots);
        } catch (error) {
            console.error(error);
        }
    })();
    }, [moved]);

   const handleFormSubmit = async ( e) => {
    e.preventDefault();
    try {
        const response = await fetch("/booking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                day: selectedDay,
                startTime: selectedTimeSlot,
                userName: userName,
            }),
        });
  
        if (response.ok) {
            const responseBody = await response.json();
            setBookings((prevBookings) => {
                const updatedBookings = { ...prevBookings };
                updatedBookings[selectedDay] = updatedBookings[selectedDay] || [];
                updatedBookings[selectedDay].push(responseBody);
                return updatedBookings;
            });
  
            setSelectedDay(null);
            setSelectedTimeSlot(null);
            setUserName("");
        } else {
            console.error("Error adding booking:", response.statusText);
        }
    } catch (error) {
        console.error(error);
    }
  };
  
   const handleRemoveBooking = async (bookingId, day) => {
    try {
        await fetch(`/booking/${bookingId}`, {
            method: "DELETE",
        });
  
        setBookings(prevBookings => {
            const updatedBookings = { ...prevBookings };
            updatedBookings[day] = updatedBookings[day].filter(booking => booking.id !== bookingId);
            return updatedBookings;
        });
        setSelectedBookingId(null);
    } catch (error) {
        console.error(error);
    }
  };
  
    const cancelBooking = () => {
        setSelectedDay(null);
        setSelectedTimeSlot(null);
        setUserName("");
    };

    const cancelMove = () => {
        setIsMoving(false)
        setNewDay(null);
    }

    const handleMoveBooking = async (bookingId) => {
         try {
            const response = await fetch(`/booking/move`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    BookingId: bookingId,
                    NewDay: newDay,
                    NewStartTime: newStartTime,
                }),
            });
    
            if (response.ok) {
                const responseBody = await response.json();
                setBookings((prevBookings) => {
                    const updatedBookings = { ...prevBookings };
                    console.log(updatedBookings);
                    console.log(updatedBookings[newDay]);
                    console.log(newDay);
                    updatedBookings[newDay] = updatedBookings[newDay] || [];
                    updatedBookings[newDay].push(responseBody);
                    return updatedBookings;
                });
    
                setTimeSlotBooked(false);
                setSelectedDay(null);
                setSelectedTimeSlot(null);
                setUserName("");
                setSelectedBookingId(null);
                setNewDay(null);
                setMoved(prev => !prev);
    
            } else if(response.status === 400) {
                console.error("Error moving booking: Timeslot not available");
                setTimeSlotBooked(true);
            } else {
                console.error("Error moving booking:", response.statusText);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const contextValue = {
        bookings,
        setBookings,
        timeSlots,
        setTimeSlots,
        selectedDay,
        setSelectedDay,
        selectedTimeSlot,
        setSelectedTimeSlot,
        userName,
        setUserName,
        selectedBookingId,
        setSelectedBookingId,
        newDay,
        setNewDay,
        newStartTime,
        setNewStartTime,
        moved,
        setMoved,
        timeSlotBooked,
        setTimeSlotBooked,
        weekDays,
        handleFormSubmit,
        handleMoveBooking,
        handleRemoveBooking,
        cancelBooking,
        isMoving,
        setIsMoving,
        cancelMove
    };

  

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};