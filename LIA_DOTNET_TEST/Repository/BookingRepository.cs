using LIA_DOTNET_TEST.Database;
using LIA_DOTNET_TEST.Interfaces;
using LIA_DOTNET_TEST.Models;
using Microsoft.EntityFrameworkCore;

namespace LIA_DOTNET_TEST.Repository
{
	public class BookingRepository : IBookingRepository
    {
        public void Seed()
        {
            using Context context = new();

            ICollection<TimeSlot> timeSlots = ProduceTimeSlots();

            TimeSlot timeSlot = timeSlots.FirstOrDefault();

            ICollection<Booking> bookings = ProduceBookings(timeSlot);


            context.TimeSlots.AddRange(timeSlots);
            context.Bookings.AddRange(bookings);

            context.SaveChanges();
        }

        public ICollection<Booking> GetAllBookings()
        {
            using Context context = new();
            return context.Bookings.Include(ts => ts.User).Include(ts => ts.TimeSlot).ToList();
        }

        public ICollection<TimeSlot> GetAllTimeSlots()
        {
            using Context context = new();
            return context.TimeSlots.ToList();
        }

		public Booking AddBooking(int day, TimeSpan startTime, string userName)
		{
			using Context context = new();

			User user = new User() { Name = userName };
			TimeSlot timeSlot = context.TimeSlots.SingleOrDefault(ts => ts.StartTime == startTime);

            if (timeSlot != null)
            {
                Booking booking = new Booking() { Day = day, User = user, TimeSlot = timeSlot };
                context.Bookings.Add(booking);
                context.SaveChanges();

                return booking;
            }
            return null;
        }

        public void RemoveBooking(int bookingId)
        {
            using Context context = new();

            Booking bookingToRemove = context.Bookings.Find(bookingId);

            if (bookingToRemove != null)
            {
                context.Bookings.Remove(bookingToRemove);
                context.SaveChanges();
            }
        }

		public async Task<Booking> MoveBookingAsync(MoveBookingDTO moveBookingDto)
		{
			using Context context = new();

			var booking = await context.Bookings
				.Include(b => b.User)
				.Include(b => b.TimeSlot)
				.FirstOrDefaultAsync(b => b.Id == moveBookingDto.BookingId);

			if (booking == null)
			{
				return null;
			}

			booking.Day = moveBookingDto.NewDay;

			var newTimeSlot = await context.TimeSlots
				.FirstOrDefaultAsync(ts => ts.StartTime == moveBookingDto.NewStartTime);

			if (newTimeSlot == null)
			{
				return null;
			}

			booking.TimeSlot = newTimeSlot;

			await context.SaveChangesAsync();

			return booking;
		}

        public async Task<bool> CheckTimeSlot(int day, TimeSpan startTime)
        {
            using Context context = new();

			var newTimeSlot = await context.TimeSlots
				.FirstOrDefaultAsync(ts => ts.StartTime == startTime);

			var isTimeSlotBooked = await context.Bookings
		        .AnyAsync(b =>
			        b.Day == day &&
			        b.TimeSlot.StartTime == newTimeSlot.StartTime &&
			        b.TimeSlot.EndTime == newTimeSlot.EndTime);

            if (isTimeSlotBooked)
            {
                return false;
            }
            return true;
		}

		private static ICollection<TimeSlot> ProduceTimeSlots()
        {
            return new List<TimeSlot>()
                {
                    new TimeSlot()
                    {
                         StartTime = new TimeSpan(9, 0,0),
                         EndTime = new TimeSpan(12, 0,0),
                    },
                    new TimeSlot()
                    {
                         StartTime = new TimeSpan(12, 0,0),
                         EndTime = new TimeSpan(14, 0,0),
                    },
                    new TimeSlot()
                    {
                         StartTime = new TimeSpan(14, 0,0),
                         EndTime = new TimeSpan(16, 0,0),
                    },
                    new TimeSlot()
                    {
                         StartTime = new TimeSpan(16, 0,0),
                         EndTime = new TimeSpan(20, 0,0),
                    },
                   
                };
        }

        private static ICollection<Booking> ProduceBookings(TimeSlot timeSlot)
        {
            return new List<Booking>()
            {
                new Booking()
                {
                    Day= 1,
                    User = new User()
                    {
                        Name = "Sean Connery"
                    },
                    TimeSlot = timeSlot
                },
			};
        }
    }
}
