using eMeh.Models;
using Newtonsoft.Json;
using System.Text.Json.Nodes;
using System.Text.RegularExpressions;

namespace eMeh.Extensions
{
    internal static class ValidationExtensions
    {
        internal static User DeserializedAndValidated(this JsonValue userJson)
        {
            if (userJson == null)
                throw new NullReferenceException("JsonValue received from the request body is null.");

            var user = JsonConvert.DeserializeObject<User>(userJson.ToString());

            if (user == null)
                throw new JsonException($"Failed to deserialize JSON: {nameof(userJson)}");


            ValidateField(user.Name, "Name");
            ValidateField(user.Surname, "Surname");
            ValidateField(user.Country, "Country");
            ValidateField(user.City, "City");
            ValidateField(user.Address, "Address");
            ValidateField(user.PostalCode, "PostalCode");
            ValidateEmail(user.Email, "Email");
            ValidatePhoneNumber(user.PhoneNumber, "PhoneNumber");

            return user;
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
