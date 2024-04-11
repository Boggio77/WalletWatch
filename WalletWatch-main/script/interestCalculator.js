function calculateTotal() {
    const principal = parseFloat(document.getElementById('principal').value);
    console.log("Principal:", principal);

    const interestRate = parseFloat(document.getElementById('interestRate').value);
    console.log("Interest Rate:", interestRate);

    const termLength = parseFloat(document.getElementById('termLength').value);
    console.log("Term Length:", termLength);

    const frequency = document.getElementById('frequency').value;
    console.log("Frequency:", frequency);

    const interestRateDecimal = interestRate / 100;
    console.log("Interest Rate (Decimal):", interestRateDecimal);

    let totalPeriods;
    switch (frequency.toLowerCase()) {
        case 'yearly':
            totalPeriods = termLength;
            break;
        case 'semi-annually':
            totalPeriods = termLength * 2;
            break;
        case 'quarterly':
            totalPeriods = termLength * 4;
            break;
        case 'monthly':
            totalPeriods = termLength * 12;
            break;
        default:
            throw new Error('Invalid frequency provided.');
    }
    console.log("Total Periods:", totalPeriods);

    const monthlyInterestRate = interestRateDecimal / 12;
    console.log("Monthly Interest Rate:", monthlyInterestRate);

    //const totalPayments = totalPeriods * 12;
    //console.log("Total Payments:", totalPayments);

    const monthlyPayment = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPeriods)) / (Math.pow(1 + monthlyInterestRate, totalPeriods) - 1);
    console.log("Monthly Payment:", monthlyPayment);

    const totalPayment = monthlyPayment * totalPeriods;
    console.log("Total Payment (Principal + Interest):", totalPayment);

    const totalInterest = totalPayment - principal;
    console.log("Total Interest Paid:", totalInterest);

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Results:</h3>
        <p>Monthly Payment: $${monthlyPayment.toFixed(2)}</p>
        <p>Total Payment (Principal + Interest): $${totalPayment.toFixed(2)}</p>
        <p>Total Interest Paid: $${totalInterest.toFixed(2)}</p>
    `;
}