using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace CleanMasterApp.Models
{
    public class ServiceBooking : BaseEntity
    {
        public int ServiceId { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;

        [ForeignKey(nameof(ServiceId))]
        public CompanyService Service { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
    }
}