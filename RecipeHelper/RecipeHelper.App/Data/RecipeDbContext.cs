namespace RecipeHelper.App.Data
{
    using Microsoft.EntityFrameworkCore;
    using RecipeHelper.App.Models;

    public class RecipeDbContext : DbContext
    {
        public RecipeDbContext(DbContextOptions<RecipeDbContext> options) : base(options)
        {
        }

        public DbSet<Recipe> Recipes { get; set; } // DbSet for Recipe entity
    }
}
