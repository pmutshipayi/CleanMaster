using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CleanMasterApp.Models
{
    public class CompanyService : BaseEntity
    {
        public int CompanyId { get; set; }

        [ForeignKey(nameof(CompanyId))]
        public Company Company { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }
    }
}