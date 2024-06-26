using Microsoft.EntityFrameworkCore;

namespace RecipeHelper.API  .Data
{
    public class RecipeDbContext : DbContext
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
