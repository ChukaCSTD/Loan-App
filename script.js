function checkCreditWorthiness() {
    let accountName = document.getElementById('accountName');
    let annualIncome = document.getElementById('annualIncome');
    let loanAmount = document.getElementById('loanAmount');
    let currentAmount = document.getElementById('currentAmount');
    let creditHistory = document.getElementById('creditHistory');
    let lastDepositDate = document.getElementById('lastDepositDate');
    let lastLoanDate = document.getElementById('lastLoanDate');
    let repaymentStartDate = document.getElementById('repaymentStartDate');
    let repaymentEndDate = document.getElementById('repaymentEndDate');
    let accountType = document.getElementById('accountType');

    let fields = [accountName, annualIncome, loanAmount, currentAmount, creditHistory, lastDepositDate, lastLoanDate, repaymentStartDate, repaymentEndDate, accountType];
    let valid = true;

    // Clear previous error messages and invalid classes
    fields.forEach(field => {
        field.classList.remove('invalid');
        document.getElementById(field.id + 'Error').style.display = 'none';
    });

    // Validate inputs
    if (accountName.value === '') {
        accountName.classList.add('invalid');
        document.getElementById('accountNameError').innerText = 'Please enter the account name.';
        document.getElementById('accountNameError').style.display = 'block';
        valid = false;
    }
    if (annualIncome.value === '' || parseFloat(annualIncome.value) <= 0) {
        annualIncome.classList.add('invalid');
        document.getElementById('annualIncomeError').innerText = 'Please enter a valid annual income.';
        document.getElementById('annualIncomeError').style.display = 'block';
        valid = false;
    }
    if (loanAmount.value === '' || parseFloat(loanAmount.value) <= 0) {
        loanAmount.classList.add('invalid');
        document.getElementById('loanAmountError').innerText = 'Please enter a valid loan amount.';
        document.getElementById('loanAmountError').style.display = 'block';
        valid = false;
    }
    if (currentAmount.value === '' || parseFloat(currentAmount.value) <= 0) {
        currentAmount.classList.add('invalid');
        document.getElementById('currentAmountError').innerText = 'Please enter a valid current amount.';
        document.getElementById('currentAmountError').style.display = 'block';
        valid = false;
    }
    if (lastDepositDate.value === '') {
        lastDepositDate.classList.add('invalid');
        document.getElementById('lastDepositDateError').innerText = 'Please enter a valid last deposit date.';
        document.getElementById('lastDepositDateError').style.display = 'block';
        valid = false;
    }
    if (lastLoanDate.value === '') {
        lastLoanDate.classList.add('invalid');
        document.getElementById('lastLoanDateError').innerText = 'Please enter a valid last loan collection date.';
        document.getElementById('lastLoanDateError').style.display = 'block';
        valid = false;
    }
    if (repaymentStartDate.value === '') {
        repaymentStartDate.classList.add('invalid');
        document.getElementById('repaymentStartDateError').innerText = 'Please enter a valid repayment start date.';
        document.getElementById('repaymentStartDateError').style.display = 'block';
        valid = false;
    }
    if (repaymentEndDate.value === '') {
        repaymentEndDate.classList.add('invalid');
        document.getElementById('repaymentEndDateError').innerText = 'Please enter a valid repayment end date.';
        document.getElementById('repaymentEndDateError').style.display = 'block';
        valid = false;
    }

    // If validation fails, return
    if (!valid) {
        return;
    }

    // Calculate the loan repayment period in months
    let start = new Date(repaymentStartDate.value);
    let end = new Date(repaymentEndDate.value);
    let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

    if (months < 6 || months > 12) {
        repaymentEndDate.classList.add('invalid');
        document.getElementById('repaymentEndDateError').innerText = 'Repayment period must be between 6 to 12 months.';
        document.getElementById('repaymentEndDateError').style.display = 'block';
        return;
    }

    let points = 0;

    // Check loan eligibility based on annual income
    let maxLoanAmount = parseFloat(annualIncome.value) * 0.45;
    if (parseFloat(loanAmount.value) > maxLoanAmount) {
        document.getElementById('result').innerText = "Loan amount exceeds 45% of annual income.";
        return;
    }

    // Current amount in account
    if (parseFloat(currentAmount.value) >= parseFloat(loanAmount.value)) {
        points += 10;
    } else {
        points -= 10;
    }

    // Credit history
    if (creditHistory.value === 'positive') {
        points += 10;
    }

    // Last deposit date
    let today = new Date();
    let depositDifference = Math.floor((today - new Date(lastDepositDate.value)) / (1000 * 60 * 60 * 24));
    if (depositDifference <= 30) {
        points += 5;
    }

    // Last loan collection date
    let loanDifference = Math.floor((today - new Date(lastLoanDate.value)) / (1000 * 60 * 60 * 24));
    if (loanDifference > 180) {
        points += 10;
    }

    // Loan repayment period
    if (months < 6) {
        points += 5;
    }

    // Account type
    if (accountType.value === 'current') {
        points += 10;
    } else if (accountType.value === 'savings') {
        points += 5;
    }

    // Check if points are sufficient for loan approval
    if (points >= 30) {
        document.getElementById('result').innerText = "Loan Approved! Total Points: " + points;
    } else {
        document.getElementById('result').innerText = "Loan Denied. Total Points: " + points;
    }
}