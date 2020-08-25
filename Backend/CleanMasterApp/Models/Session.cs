namespace CleanMasterApp.Models
{
    public class Session : BaseEntity
    {
        public string Token { get; set; }
        public int UserId { get; set; }
    }
}