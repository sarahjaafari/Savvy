// Variables to store data
let totalIncome = 0;
let totalExpenses = 0;
let expenseList = [];
let budgetRule = '50-20-30';

// DOM Elements
const incomeInput = document.getElementById('incomeInput');
const totalIncomeDisplay = document.getElementById('totalIncome');
const expenseDescription = document.getElementById('expenseDescription');
const expenseAmount = document.getElementById('expenseAmount');
const expenseCategory = document.getElementById('expenseCategory');
const totalExpensesDisplay = document.getElementById('totalExpenses');
const expenseTable = document.getElementById('expenseTable');
const budgetRuleDropdown = document.getElementById('budgetRule');
const savingsAllocation = document.getElementById('savingsAllocation');
const investingAllocation = document.getElementById('investingAllocation');
const expenseAllocation = document.getElementById('expenseAllocation');
const incomePieChartElement = document.getElementById('incomePieChart');
const expenseBarChartElement = document.getElementById('expenseBarChart');

// Chart.js Instances
let incomePieChart;
let expenseBarChart;

// Set Income
document.getElementById('incomeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    totalIncome = parseFloat(incomeInput.value);
    if (isNaN(totalIncome) || totalIncome <= 0) {
        alert('Please enter a valid income.');
        return;
    }
    updateIncomeDisplay();
    updateBudgetingAllocations();
    updateCharts();
    incomeInput.value = '';
});

// Add Expense
document.getElementById('expenseForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const description = expenseDescription.value;
    const amount = parseFloat(expenseAmount.value);
    const category = expenseCategory.value;

    if (!description || isNaN(amount) || amount <= 0 || !category) {
        alert('Please fill in all expense fields correctly.');
        return;
    }

    const expense = { description, amount, category };
    expenseList.push(expense);
    totalExpenses += amount;

    updateExpenseDisplay();
    updateExpenseTable();
    updateBudgetingAllocations();
    updateCharts();

    expenseDescription.value = '';
    expenseAmount.value = '';
    expenseCategory.value = '';
});

// Update Budget Rule
budgetRuleDropdown.addEventListener('change', (e) => {
    budgetRule = e.target.value;
    updateBudgetingAllocations();
    updateCharts();
});

// Update Income Display
function updateIncomeDisplay() {
    totalIncomeDisplay.textContent = `$${totalIncome.toFixed(2)}`;
}

// Update Expense Display
function updateExpenseDisplay() {
    totalExpensesDisplay.textContent = `$${totalExpenses.toFixed(2)}`;
}

// Update Expense Table
function updateExpenseTable() {
    expenseTable.innerHTML = '';
    expenseList.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.description}</td>
            <td>${expense.category}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td><button onclick="deleteExpense(${index})">Delete</button></td>
        `;
        expenseTable.appendChild(row);
    });
}

// Delete Expense
function deleteExpense(index) {
    totalExpenses -= expenseList[index].amount;
    expenseList.splice(index, 1);
    updateExpenseDisplay();
    updateExpenseTable();
    updateBudgetingAllocations();
    updateCharts();
}

// Update Budgeting Allocations
function updateBudgetingAllocations() {
    if (budgetRule === '50-20-30') {
        savingsAllocation.textContent = `$${(totalIncome * 0.5).toFixed(2)}`;
        investingAllocation.textContent = `$${(totalIncome * 0.2).toFixed(2)}`;
        expenseAllocation.textContent = `$${(totalIncome * 0.3).toFixed(2)}`;
    } else if (budgetRule === '70-20-10') {
        savingsAllocation.textContent = `$${(totalIncome * 0.7).toFixed(2)}`;
        investingAllocation.textContent = `$${(totalIncome * 0.2).toFixed(2)}`;
        expenseAllocation.textContent = `$${(totalIncome * 0.1).toFixed(2)}`;
    } else if (budgetRule === 'Aggressive-Savings') {
        savingsAllocation.textContent = `$${(totalIncome * 0.8).toFixed(2)}`;
        investingAllocation.textContent = `$${(totalIncome * 0.1).toFixed(2)}`;
        expenseAllocation.textContent = `$${(totalIncome * 0.1).toFixed(2)}`;
    }
}

// Update Charts
function updateCharts() {
    // Update Income Pie Chart
    if (incomePieChart) incomePieChart.destroy();
    incomePieChart = new Chart(incomePieChartElement, {
        type: 'pie',
        data: {
            labels: ['Savings', 'Investing', 'Expenses'],
            datasets: [{
                data: [
                    parseFloat(savingsAllocation.textContent.slice(1)),
                    parseFloat(investingAllocation.textContent.slice(1)),
                    parseFloat(expenseAllocation.textContent.slice(1))
                ],
                backgroundColor: ['#4caf50', '#2196f3', '#ff5722']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: '#fff' }
                }
            }
        }
    });

    // Update Expense Bar Chart
    const categories = ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Other'];
    const categoryTotals = categories.map(category => {
        return expenseList
            .filter(expense => expense.category === category)
            .reduce((sum, expense) => sum + expense.amount, 0);
    });

    if (expenseBarChart) expenseBarChart.destroy();
    expenseBarChart = new Chart(expenseBarChartElement, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Expenses by Category',
                data: categoryTotals,
                backgroundColor: ['#f44336', '#2196f3', '#4caf50', '#ff9800', '#9c27b0']
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { ticks: { color: '#fff' } },
                y: { ticks: { color: '#fff' } }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}
