using eMeh.Models;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using MongoDB.EntityFrameworkCore.Extensions;

namespace eMeh.DBContext
{
    public class EmehDbContext : DbContext
    {
        public DbSet<User> Users { get; init; }
        public DbSet<Product> Products { get; init; }

        public static EmehDbContext Create(IMongoDatabase database) =>
            new(new DbContextOptionsBuilder<EmehDbContext>()
                .UseMongoDB(database.Client, database.DatabaseNamespace.DatabaseName)
                .Options);

        public EmehDbContext(DbContextOptions options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().ToCollection("users");
            modelBuilder.Entity<Product>().ToCollection("products");
        }
    }
}
