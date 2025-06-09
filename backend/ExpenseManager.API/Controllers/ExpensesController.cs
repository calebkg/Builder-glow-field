using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExpenseManager.API.Data;
using ExpenseManager.API.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace ExpenseManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ExpensesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ExpensesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Expense>>> GetExpenses()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized();
            
            int userId = int.Parse(userIdClaim.Value);
            var expenses = await _context.Expenses
                .Include(e => e.Category)
                .Where(e => e.UserId == userId)
                .ToListAsync();
            return Ok(expenses);
        }

        [HttpPost]
        public async Task<ActionResult<Expense>> AddExpense([FromBody] Expense expense)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized();
            
            int userId = int.Parse(userIdClaim.Value);
            expense.UserId = userId;
            // For now, assign a default user and category if needed
            if (expense.CategoryId == 0 && expense.Category != null && !string.IsNullOrEmpty(expense.Category.Name))
            {
                var category = await _context.ExpenseCategories.FirstOrDefaultAsync(c => c.Name == expense.Category.Name);
                if (category != null)
                    expense.CategoryId = category.Id;
                else
                    expense.CategoryId = 1; // fallback
            }
            expense.CreatedAt = System.DateTime.UtcNow;
            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();
            return Ok(expense);
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized();
            
            int userId = int.Parse(userIdClaim.Value);
            var expenses = await _context.Expenses
                .Include(e => e.Category)
                .Where(e => e.UserId == userId)
                .ToListAsync();
            var totalExpenses = expenses.Sum(e => e.Amount);
            var monthlyTotal = expenses
                .Where(e => e.CreatedAt.Month == System.DateTime.UtcNow.Month && e.CreatedAt.Year == System.DateTime.UtcNow.Year)
                .Sum(e => e.Amount);

            var categoriesBreakdown = expenses
                .GroupBy(e => e.Category?.Name ?? "Unknown")
                .ToDictionary(g => g.Key, g => g.Sum(e => e.Amount));

            var recentTransactions = expenses
                .OrderByDescending(e => e.CreatedAt)
                .Take(5)
                .ToList();

            return Ok(new
            {
                totalExpenses,
                monthlyTotal,
                categoriesBreakdown,
                recentTransactions
            });
        }
    }
} 