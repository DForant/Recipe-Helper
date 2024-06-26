using Microsoft.EntityFrameworkCore;
using RecipeHelper.API.Models;

namespace RecipeHelper.API.Data
{
public class RecipeDbContext : DbContext
{
    public RecipeContext(DbContextOptions<RecipeContext> options) : base(options) { }

    public DbSet<Recipe> Recipes { get; set; }
    // Other DbSet properties...
}
    {
        private readonly IConfiguration Configuration;

        public RecipeDbContext (IConfiguration configuration){
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = Configuration.GetConnectionString("RecipeHelperDatabase");
            optionsBuilder.UseMySQL(connectionString);
        }

        // Define your DbSets (tables) here
    }
}
