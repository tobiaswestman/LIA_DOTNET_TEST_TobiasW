namespace LIA_DOTNET_TEST.Models
{
	public class MoveBookingDTO
	{
		public int BookingId { get; set; }
		public int NewDay { get; set; }
		public TimeSpan NewStartTime { get; set; }
	}
}
