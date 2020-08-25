using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CleanMasterApp.Models
{
    public class Company : BaseEntity
    {
        [Required]
        public string Name { get; set; }

        public string Address { get; set; }

        [Required]
        public string Email { get; set; }

        public string Phone { get; set; }
        public string ProfilePicture { get; set; }
        public ICollection<CompanyUser> Users { get; set; }
        public ICollection<CompanyService> Services { get; set; }

        [NotMapped]
        public IFormFile File { get; set; }
    }
}