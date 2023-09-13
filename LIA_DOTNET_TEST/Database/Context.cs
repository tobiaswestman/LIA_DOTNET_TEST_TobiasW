using LIA_DOTNET_TEST.Models;
using Microsoft.EntityFrameworkCore;

namespace LIA_DOTNET_TEST.Database
{
    public class Context : DbContext
    {
        protected override void OnConfiguring
       (DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "BookingDb");
        }
        public DbSet<TimeSlot> TimeSlots { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Booking> Bookings { get; set; }
    }
}
