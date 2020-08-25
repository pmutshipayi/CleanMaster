using System.ComponentModel.DataAnnotations;

namespace CleanMasterApp.Models
{
    public class BaseEntity
    {
        [Key]
        public int Id { get; set; }
    }
}