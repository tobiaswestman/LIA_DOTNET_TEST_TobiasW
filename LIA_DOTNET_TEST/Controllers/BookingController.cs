using LIA_DOTNET_TEST.Data;
using LIA_DOTNET_TEST.Interfaces;
using LIA_DOTNET_TEST.Models;
using Microsoft.AspNetCore.Mvc;

namespace LIA_DOTNET_TEST.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class BookingController : ControllerBase
	{

		readonly IBookingRepository _bookingRepository;

		public BookingController(IBookingRepository bookingRepository)
		{
			_bookingRepository = bookingRepository;
		}

		[HttpGet]
		public ActionResult<ICollection<Booking>> GetAll()
		{
			try
			{
				ICollection<Booking> bookings = _bookingRepository.GetAllBookings();

				return Ok(bookings);
			}
			catch (Exception exception)
			{

				return BadRequest(new { exception.Message });
			}
		}


		[HttpGet("timeslots")]
		public ActionResult<ICollection<TimeSlot>> GetTimeSlots()
		{
			try
			{
				ICollection<TimeSlot> timeSlots = _bookingRepository.GetAllTimeSlots();

				return Ok(timeSlots);
			}
			catch (Exception exception)
			{

				return BadRequest(new { exception.Message });
			}

		}

		[HttpPost]
		public ActionResult<Booking> AddBooking([FromBody] BookingDTO dto)
		{
			try
			{
				Booking newBooking = _bookingRepository.AddBooking(dto.Day, dto.StartTime, dto.UserName);
				return Ok(newBooking);
			}
			catch (Exception exception)
			{
				return BadRequest(new { exception.Message });
			}
		}

		[HttpDelete("{id}")]
		public ActionResult RemoveBooking(int id)
		{
			try
			{
				_bookingRepository.RemoveBooking(id);
				return Ok();
			}
			catch (Exception exception)
			{
				return BadRequest(new { exception.Message });
			}
		}

		[HttpPut("move")]
		public async Task<IActionResult> MoveBooking([FromBody] MoveBookingDTO moveBookingDto)
		{
			var timeSlotAvailable = _bookingRepository.CheckTimeSlot(moveBookingDto.NewDay, moveBookingDto.NewStartTime);

			if(! await timeSlotAvailable)
			{
				return BadRequest("TimeSlot is already booked.");
			}

			var updatedBooking = await _bookingRepository.MoveBookingAsync(moveBookingDto);

			if (updatedBooking == null)
			{
				return NotFound("The booking could not be updated");
			}

			return Ok(updatedBooking);
		}
	}
}
