function checkCreditWorthiness() {

    let AccountName = document.getElementById('AccountName').value;
    let annualIncome = parseFloat(document.getElementById('annualIncome').value);
    let loanAmount = parseFloat(document.getElementById('loanAmount').value);
    let currentAmount = parseFloat(document.getElementById('currentAmount').value);
    let creditHistory = document.getElementById('creditHistory').value;
    let lastDepositDate = new Date(document.getElementById('lastDepositDate').value);
    let lastLoanDate = new Date(document.getElementById('lastLoanDate').value);
    let loanRepaymentPeriod = parseInt(document.getElementById('loanRepaymentPeriod').value);
    let accountType = document.getElementById('accountType').value;

    
    if(AccountName === ""){
        document.getElementById('AccountName').classList.add('error');
        document.getElementById('errormessageAHolder').style.display = 'block';
    }else{
        console.log("AccountName")
        document.getElementById('AccountName').classList.add('fore');
        document.getElementById('errormessageAHolder').style.display = 'none';
    }

    let points = 0;

    

    // Check loan eligibility based on annual income
    let maxLoanAmount = annualIncome * 0.45;
    if (loanAmount > maxLoanAmount) {
        document.getElementById('result').innerText = "The loan amount exceeds 45% of annual income.";
        return;
    }else{
        if(annualIncome === "" || annualIncome < 0){
            parseFloat(document.getElementById('annualIncome').value).classList.add('error');
            document.getElementById('errormessageAIncome').style.display = 'block';  
        }
    }

    // Current amount in account
    if (currentAmount >= loanAmount) {
        points += 10;
    } else {
        points -= 10;
    }

    if (loanAmount === "" || loanAmount< 0){
        parseFloat(document.getElementById('loanAmount')).classList.add('error');
        document.getElementById('errormessageLAmount').style.display = 'block';
    } 
    
    
    
    // Credit history
    if (creditHistory === 'positive') {
        points += 10;
    }
    
    if (currentAmount === '' || currentAmount < 0){
        document.getElementById('currentAmount').classList.add('error');
        document.getElementById('errormessageCAccount').style.display = 'block';
    }
    // Last deposit date
    let today = new Date();
    let depositDifference = Math.floor((today - lastDepositDate) / (1000 * 60 * 60 * 24));
    if (depositDifference <= 30) {
        points += 5;
    }

    // Last loan collection date
    let loanDifference = Math.floor((today - lastLoanDate) / (1000 * 60 * 60 * 24));
    if (loanDifference > 180) {
        points += 10;
    }

    // Loan repayment period
    if (loanRepaymentPeriod < 6) {
        points += 5;
    }

    // Account type
    if (accountType === 'current') {
        points += 10;
    } else if (accountType === 'savings') {
        points += 5;
    }

    // Check if points are sufficient for loan approval
    if (points >= 30) {
        document.getElementById('result').innerText = "Your Loan is Approved! Total Points: " + points;
    } else {
        document.getElementById('result').innerText = "Your Loan has been Denied. Your Total Points are: " + points;
    }
}
