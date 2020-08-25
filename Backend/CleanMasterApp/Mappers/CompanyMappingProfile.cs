using AutoMapper;
using CleanMasterApp.Models;
using CleanMasterApp.ViewModels;

namespace CleanMasterApp.Mappers
{
    public class CompanyMappingProfile : Profile
    {
        public CompanyMappingProfile()
        {
            CreateMap<CompanyCreateViewModel, Company>().ReverseMap();
            CreateMap<CompanyCreateViewModel, CompanyUser>().ReverseMap();
        }
    }
}
