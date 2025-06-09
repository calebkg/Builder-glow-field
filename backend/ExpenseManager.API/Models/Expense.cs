﻿namespace ExpenseManager.API.Models
{
    public class Expense
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public decimal Amount { get; set; }
        public string? Description { get; set; }
        public DateTime ExpenseDate { get; set; }
        public DateTime CreatedAt { get; set; }

        public User? User { get; set; }
        public ExpenseCategory? Category { get; set; }
    }
}
