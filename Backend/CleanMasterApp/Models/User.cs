using System.ComponentModel.DataAnnotations;

namespace CleanMasterApp.Models
{
    public class User : BaseEntity
    {
        [Required]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string Phone { get; set; }

        [Required]
        public string Password { get; set; }
    }
}