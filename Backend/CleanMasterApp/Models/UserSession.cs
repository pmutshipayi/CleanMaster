using System.ComponentModel.DataAnnotations.Schema;

namespace CleanMasterApp.Models
{
    public class UserSession : Session
    {
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
    }
}