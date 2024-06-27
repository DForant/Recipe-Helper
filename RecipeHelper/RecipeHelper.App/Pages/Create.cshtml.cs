using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using RecipeHelper.App.Data;
using RecipeHelper.App.Models;

namespace RecipeHelper.App.Pages
{
    public class CreateModel : PageModel
    {
        private readonly RecipeDbContext _context;

        public CreateModel(RecipeDbContext context)
        {
            _context = context;
        }

        [BindProperty]
        public Recipe Recipe { get; set; }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
                return Page();

            _context.Recipes.Add(Recipe);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index"); // Redirect to the recipe list page
        }
    }

}
