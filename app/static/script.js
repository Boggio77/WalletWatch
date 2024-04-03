
    // Function to save income
    function saveIncome() {
        var incomeInput = document.getElementById('income');
        var income = parseFloat(incomeInput.value);
        
        if (!isNaN(income)) {
            var currentBudget = parseFloat(document.getElementById('budget-remaining').textContent);
            var totalBudget = currentBudget + income;
            document.getElementById('budget-remaining').textContent = totalBudget.toFixed(2);
            
            // Clear the input field
            incomeInput.value = '';
            
            // Update the pie chart
            updatePieChart();
        } else {
            alert('Please enter a valid income amount.');
        }
    

    // Call the updatePieChart function when the page loads
    updatePieChart();

    }


// Function to update pie chart
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

// Create the pie chart
window.pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            data: amounts,
            backgroundColor: [
                'rgb(80, 80, 80)',   // Dark Grey
                'rgb(128, 0, 0)',    // Dark Red
                'rgb(139, 69, 19)',  // Saddle Brown
                'rgb(46, 139, 87)',  // Sea Green
                'rgb(139, 0, 0)',    // Dark Red
                'rgb(0, 0, 139)',    // Dark Blue
                'rgb(139, 0, 139)',  // Dark Magenta
                'rgb(128, 128, 128)',// Dark Gray
                'rgb(0, 139, 139)',  // Dark Cyan
                'rgb(139, 0, 139)',  // Dark Magenta
                'rgb(105, 105, 105)',// Dim Gray
                'rgb(139, 69, 19)',  // Saddle Brown
                'rgb(0, 100, 0)',    // Dark Green
                'rgb(139, 0, 0)',    // Dark Red
                'rgb(139, 0, 139)',  // Dark Magenta
                'rgb(128, 128, 0)',  // Olive
                'rgb(75, 0, 130)',   // Indigo
                'rgb(160, 82, 45)',  // Sienna
                'rgb(0, 0, 0)',      // Black
                'rgb(0, 139, 139)',  // Dark Cyan
                // Add more colors as needed
            ],
        }]
    },
});

// Create the pie chart
window.pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            data: amounts,
            backgroundColor: [
                'rgb(80, 80, 80)',   // Dark Grey
                'rgb(128, 0, 0)',    // Dark Red
                'rgb(139, 69, 19)',  // Saddle Brown
                'rgb(46, 139, 87)',  // Sea Green
                'rgb(139, 0, 0)',    // Dark Red
                'rgb(0, 0, 139)',    // Dark Blue
                'rgb(139, 0, 139)',  // Dark Magenta
                'rgb(128, 128, 128)',// Dark Gray
                'rgb(0, 139, 139)',  // Dark Cyan
                'rgb(139, 0, 139)',  // Dark Magenta
                'rgb(105, 105, 105)',// Dim Gray
                'rgb(139, 69, 19)',  // Saddle Brown
                'rgb(0, 100, 0)',    // Dark Green
                'rgb(139, 0, 0)',    // Dark Red
                'rgb(139, 0, 139)',  // Dark Magenta
                'rgb(128, 128, 0)',  // Olive
                'rgb(75, 0, 130)',   // Indigo
                'rgb(160, 82, 45)',  // Sienna
                'rgb(0, 0, 0)',      // Black
                'rgb(0, 139, 139)',  // Dark Cyan
            ],
        }]
    },
    options: {
        legend: {
            labels: {
                fontColor: 'rgb(255, 255, 255)'
            }
        }
    }
});



}

// Call the updatePieChart function when the page loads
window.onload = function() {
    updatePieChart();
};

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
    if (!isNaN(amount) && title.trim() !== '') {
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
        alert('Please enter a valid expense title and amount.');
    }
}
