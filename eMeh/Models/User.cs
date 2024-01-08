namespace eMeh.Models
{
    public class User
    {
        [MongoDB.Bson.Serialization.Attributes.BsonElement("_id")]
        public MongoDB.Bson.ObjectId Id { get; set; }

        public string? Name { get; set; }

        public string? Surname { get; set; }

        public string? Country { get; set; }

        public string? City { get; set; }

        public string? Address { get; set; }

        public string? PostalCode { get; set; }

        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }
        public string? Password { get; set; }
    }
}
