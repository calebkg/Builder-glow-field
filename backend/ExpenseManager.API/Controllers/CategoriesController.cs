using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ExpenseManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetCategories()
        {
            // Return some default categories for now
            var categories = new List<object>
            {
                new { id = 1, name = "Food", icon = "restaurant", color = "#ff9800" },
                new { id = 2, name = "Transport", icon = "directions_car", color = "#2196f3" },
                new { id = 3, name = "Utilities", icon = "receipt", color = "#f44336" },
                new { id = 4, name = "Entertainment", icon = "movie", color = "#9c27b0" },
                new { id = 5, name = "Healthcare", icon = "local_hospital", color = "#4caf50" },
                new { id = 6, name = "Education", icon = "school", color = "#795548" },
                new { id = 7, name = "Shopping", icon = "shopping_cart", color = "#e91e63" },
                new { id = 8, name = "Other", icon = "category", color = "#607d8b" }
            };
            return Ok(categories);
        }
    }
} 