using CleanMasterApp.Models;

namespace CleanMasterApp.Services
{
    public interface ICompanySessionService
    {
        string GetProfileImage();
        bool IsAuthenticated();
        CompanyUser User();
    }
}