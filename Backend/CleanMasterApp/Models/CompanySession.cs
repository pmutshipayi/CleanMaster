using System.ComponentModel.DataAnnotations.Schema;

namespace CleanMasterApp.Models
{
    public class CompanySession : Session
    {
        [ForeignKey(nameof(UserId))]
        public CompanyUser User { get; set; }
    }
}