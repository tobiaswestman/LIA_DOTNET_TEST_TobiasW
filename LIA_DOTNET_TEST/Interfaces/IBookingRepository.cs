using LIA_DOTNET_TEST.Models;
using Microsoft.AspNetCore.Mvc;

namespace LIA_DOTNET_TEST.Interfaces
{
	public interface IBookingRepository
	{
		public ICollection<Booking> GetAllBookings();
		public ICollection<TimeSlot> GetAllTimeSlots();
		public Booking AddBooking(int day, TimeSpan startTime, string userName);
		public void RemoveBooking(int bookingId);
		Task<Booking> MoveBookingAsync( MoveBookingDTO moveBookingDto);
		Task<bool> CheckTimeSlot(int day, TimeSpan startTime);

		// Add AddBooking
	}
}
