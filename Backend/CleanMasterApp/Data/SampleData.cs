using CleanMasterApp.Models;
using System.Collections.Generic;

namespace CleanMasterApp.Data
{
    public class SampleData
    {
        public static IList<Company> GetSampleData()
        {
            return new List<Company>
            {
                new Company
                {
                    Name = "bitvest",
                    Email = "bitvest@gmail.com",
                    Services = new List<CompanyService>
                    {
                        new CompanyService
                        {
                            Title = "House cleaning",
                            Description = "We do house cleaning"
                        },
                        new CompanyService
                        {
                            Title = "Laundy"
                        }
                    },
                    Users = new List<CompanyUser>
                    {
                        new CompanyUser
                        {
                            FullName = "oftsent",
                            Username = "makuna",
                            Password = "123456789"
                        }
                    }
                },
                new Company
                {
                    Name = "Dry clean INC",
                    Address = "32 joe solvo, johannesbourg",
                    Email = "dry-clean@gmail.co.za",
                    Phone = "+27 11 125 3652 41",
                    Services = new List<CompanyService>
                    {
                        new CompanyService
                        {
                            Title = "House, room cleaning",
                            Description = "Do you want professional cleaning? we do blah blah"
                        },
                        new CompanyService
                        {
                            Title = "Car wash",
                            Description = "We do all types of car wash"
                        }
                    },
                    Users = new List<CompanyUser>
                    {
                        new CompanyUser
                        {
                            FullName = "john", 
                            Username = "Sholo",
                            Password = "123456789"
                        }
                    }
                },
                new Company
                {
                    Name = "Mama laundry",
                    Address = "17 alberton, soweto",
                    Email = "mama-laundry@gmail.com",
                    Services = new List<CompanyService>
                    {
                        new CompanyService
                        {
                            Title = "laundry"
                        }
                    },
                    Users = new List<CompanyUser>
                    {
                        new CompanyUser
                        {
                            FullName = "phillip",
                            Username = "makama",
                            Password = "123456789"
                        }
                    }
                }
            };
        }
    }
}
