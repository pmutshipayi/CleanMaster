using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace CleanMasterApp.ViewModels
{
    public class CompanyCreateViewModel
    {
        [Required]
        public string Name { get; set; }
        public string Address { get; set; }
        [Required]
        [EmailAddress]
        [Display(Name = "Company email address")]
        public string Email { get; set; }
        [Required]
        [Display(Name = "Full name")]
        public string FullName { get; set; }
        [Required]
        [MinLength(3)]
        public string Username { get; set; }
        [Required]
        [MinLength(5)]
        public string Password { get; set; }
        public IFormFile File { get; set; }
    }
}
