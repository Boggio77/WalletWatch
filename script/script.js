// Function to update the pie chart
function updatePieChart() {
    // Get the canvas element
    var ctx = document.getElementById('expense-pie-chart').getContext('2d');

    // Destroy previous pie chart instance if exists
    if (window.pieChart) {
        window.pieChart.destroy();
    }

    // Get the expenses data from the list
    var expensesList = document.getElementById('expenses-list');
    var expenses = expensesList.getElementsByTagName('li');
    var labels = [];
    var amounts = [];
    for (var i = 0; i < expenses.length; i++) {
        var title = expenses[i].textContent.split(': $')[0];
        var amount = parseFloat(expenses[i].dataset.amount);
        labels.push(title);
        amounts.push(amount);
    }

    // If there are no expenses, add a default value
    if (labels.length === 0) {
        labels.push('Default');
        amounts.push(1); // Default value
    }

    // Define the specified RGB colors
    var colorfulBackgrounds = [
        'rgb(64, 224, 208)',    // Turquoise
        'rgb(0, 255, 255)',     // Aqua
        'rgb(128, 0, 128)',     // Purple
        'rgb(0, 0, 255)',       // Blue
        'rgb(0, 128, 0)',       // Green
        'rgb(255, 0, 0)',       // Red
        'rgb(255, 165, 0)',     // Orange
        'rgb(255, 255, 0)',     // Yellow
        'rgb(255, 192, 203)',   // Pink
        'rgb(128, 0, 0)',       // Maroon
        'rgb(0, 255, 0)',       // Lime Green
        'rgb(0, 255, 255)',     // Cyan
        'rgb(200, 162, 200)'    // Lilac
    ];

    // Create the pie chart
    window.pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: amounts,
                backgroundColor: colorfulBackgrounds,
            }]
        },
        options: {
            legend: {
                labels: {
                    fontColor: 'rgb(255, 255, 255)' // Supposed to set label for pie chart sections to white but does not work.
                }
            }
        }
    });
}

// Call the updatePieChart function when the page loads
window.onload = function() {
    updatePieChart();
};

// Function to save income
function saveIncome() {
    var incomeAmount = parseFloat(document.getElementById('income').value);
    if (!isNaN(incomeAmount) && incomeAmount >= 0 && incomeAmount <= 1000000000) {
        var incomeList = document.getElementById('income-list');
        var listItem = document.createElement('li');
        listItem.textContent = 'Income: $' + incomeAmount.toFixed(2);
        listItem.dataset.income = incomeAmount; // Store income amount as a data attribute
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', removeIncome);
        listItem.appendChild(deleteButton);
        incomeList.appendChild(listItem);

        // Update total budget remaining
        var currentBudget = parseFloat(document.getElementById('budget-remaining').textContent);
        var totalBudget = currentBudget + incomeAmount;
        document.getElementById('budget-remaining').textContent = totalBudget.toFixed(2);

        // Clear the input field
        document.getElementById('income').value = '';

        // Update the pie chart
        updatePieChart();
    } else {
        alert('Please enter a valid income amount between 0 and 1,000,000,000.');
    }
}

// Function to remove an income
function removeIncome(event) {
    var listItem = event.target.closest('li');
    var incomeAmount = parseFloat(listItem.dataset.income);

    // Update total budget remaining
    var currentBudget = parseFloat(document.getElementById('budget-remaining').textContent);
    var remainingBudget = currentBudget - incomeAmount; // Subtract the income amount
    document.getElementById('budget-remaining').textContent = remainingBudget.toFixed(2);

    // Remove the income from the list
    listItem.remove();

    // Update the pie chart
    updatePieChart();
}

// Function to remove an expense
function removeExpense(event) {
    var listItem = event.target.closest('li');
    var amount = parseFloat(listItem.dataset.amount);

    // Update total budget remaining
    var currentBudget = parseFloat(document.getElementById('budget-remaining').textContent);
    var remainingBudget = currentBudget + amount; // Subtract the amount
    document.getElementById('budget-remaining').textContent = remainingBudget.toFixed(2);

    // Remove the expense from the list
    listItem.remove();

    // Update the pie chart
    updatePieChart();
}

// Function to add an expense
function addExpense() {
    var title = document.getElementById('title').value;
    var amount = parseFloat(document.getElementById('amount').value);
    if (!isNaN(amount) && amount >= 0 && amount <= 1000000 && title.trim() !== '') {
        var expensesList = document.getElementById('expenses-list');
        var listItem = document.createElement('li');
        listItem.textContent = title + ': $' + amount.toFixed(2);
        listItem.dataset.amount = amount; // Store amount as a data attribute
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', removeExpense);
        listItem.appendChild(deleteButton);
        expensesList.appendChild(listItem);

        // Update total budget remaining
        var currentBudget = parseFloat(document.getElementById('budget-remaining').textContent);
        var remainingBudget = currentBudget - amount;
        document.getElementById('budget-remaining').textContent = remainingBudget.toFixed(2);

        // Update the pie chart
        updatePieChart();
        
        // Clear the form fields
        document.getElementById('title').value = '';
        document.getElementById('amount').value = '';
    } else {
        alert('Please enter a valid expense title and amount between 0 and 1,000,000.');
    }
}

// Function to calculate total
function calculateTotal() {
    const principal = parseFloat(document.getElementById('principal').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const termLength = parseFloat(document.getElementById('termLength').value);
    const frequency = document.getElementById('frequency').value;

    if (
        !isNaN(principal) && principal >= 0 && principal <= 1000000 &&
        !isNaN(interestRate) && interestRate >= 0 && interestRate <= 100 &&
        !isNaN(termLength) && termLength >= 0 && termLength <= 100 &&
        (frequency.toLowerCase() === 'annually' ||
        frequency.toLowerCase() === 'semi-annually' ||
        frequency.toLowerCase() === 'quarterly' ||
        frequency.toLowerCase() === 'monthly')
    ) {
        const interestRateDecimal = interestRate / 100;

        let factor;
        let totalPeriods;
        switch (frequency.toLowerCase()) {
            case 'annually':
                factor = 1;
                totalPeriods = termLength;
                break;
            case 'semi-annually':
                factor = 2
                totalPeriods = termLength * 2;
                break;
            case 'quarterly':
                factor = 4
                totalPeriods = termLength * 4;
                break;
            case 'monthly':
                factor = 12
                totalPeriods = termLength * 12;
                break;
            default:
                throw new Error('Invalid frequency provided.');
        }

        const periodInterestRate = interestRateDecimal / factor;

        const periodPayment = principal * (periodInterestRate * Math.pow(1 + periodInterestRate, totalPeriods)) / (Math.pow(1 + periodInterestRate, totalPeriods) - 1);

        const totalPayment = periodPayment * totalPeriods;

        const totalInterest = totalPayment - principal;

        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `
            <h3>Results:</h3>
            <p>Each Payment: $${periodPayment.toFixed(2)}</p>
            <p>Principal + Interest: $${totalPayment.toFixed(2)}</p>
            <p>Total Interest Paid: $${totalInterest.toFixed(2)}</p>
        `;
    } else {
        alert('Please enter values for interest rate between 0-100\nPlease enter values for Principle amount between 0-1,000,000\nPlease enter values for term length between 0-100');
    }
}
