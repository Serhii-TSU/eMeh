using eMeh.Models;
using System.Text.RegularExpressions;

namespace eMeh.Extensions
{
    internal static class ValidationExtensions
    {
        internal static User Update(this User userDb, UserData userData)
        {
            if (userDb.Name != userData.Name && !string.IsNullOrEmpty(userData.Name))
                userDb.Name = userData.Name;

            if (userDb.Surname != userData.Surname && !string.IsNullOrEmpty(userData.Surname))
                userDb.Surname = userData.Surname;

            if (userDb.Country != userData.Country && !string.IsNullOrEmpty(userData.Country))
                userDb.Country = userData.Country;

            if (userDb.City != userData.City && !string.IsNullOrEmpty(userData.City))
                userDb.City = userData.City;

            if (userDb.Address != userData.Address && !string.IsNullOrEmpty(userData.Address))
                userDb.Address = userData.Address;

            if (userDb.PostalCode != userData.PostalCode && !string.IsNullOrEmpty(userData.PostalCode))
                userDb.PostalCode = userData.PostalCode;

            if (userDb.Email != userData.Email && !string.IsNullOrEmpty(userData.Email))
                userDb.Email = userData.Email;

            if (userDb.PhoneNumber != userData.PhoneNumber && !string.IsNullOrEmpty(userData.PhoneNumber))
                userDb.PhoneNumber = userData.PhoneNumber;

            if (userDb.Password != userData.Password && !string.IsNullOrEmpty(userData.Password))
                userDb.Password = userData.Password;

            return userDb;
        }

        internal static User ClearSensitiveData(this User userDb)
        {
            userDb.Password = string.Empty;

            return userDb;
        }

        internal static User ToEntity(this UserData userData)
        {
            ValidateUserData(userData);

           return new User
           {
               Name         = userData.Name,
               Surname      = userData.Surname,
               Country      = userData.Country,
               City         = userData.City,
               Address      = userData.Address,
               PostalCode   = userData.PostalCode,
               Email        = userData.Email,
               PhoneNumber  = userData.PhoneNumber,
               Password     = userData.Password,
           };
        }

        private static void ValidateUserData(UserData userData)
        {
            ValidateField(userData.Name, "Name");
            ValidateField(userData.Surname, "Surname");
            ValidateField(userData.Country, "Country");
            ValidateField(userData.City, "City");
            ValidateField(userData.Address, "Address");
            ValidateField(userData.PostalCode, "PostalCode");
            ValidateEmail(userData.Email, "Email");
            ValidatePhoneNumber(userData.PhoneNumber, "PhoneNumber");
        }

        private static void ValidateField(string? value, string fieldName)
        {
            if (string.IsNullOrEmpty(value))
            {
                throw new ArgumentException($"{fieldName} is required.", fieldName);
            }
        }

        private static void ValidateEmail(string? value, string fieldName)
        {
            if (string.IsNullOrEmpty(value))
            {
                throw new ArgumentException($"{fieldName} is required.", fieldName);
            }

            string emailPattern = @"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";
            Regex regex = new Regex(emailPattern);

            if (!regex.IsMatch(value))
            {
                throw new ArgumentException($"Invalid {fieldName.ToLower()} format.", fieldName);
            }
        }

        private static void ValidatePhoneNumber(string? value, string fieldName)
        {
            if (string.IsNullOrEmpty(value))
            {
                throw new ArgumentException($"{fieldName} is required.", fieldName);
            }

            string phonePattern = @"^\d{10}$";
            Regex regex = new Regex(phonePattern);

            if (!regex.IsMatch(value))
            {
                throw new ArgumentException($"Invalid {fieldName.ToLower()} format.", fieldName);
            }
        }
    }
}
