from flask import Flask, render_template, request, redirect, session

app = Flask(__name__)
app.secret_key = 'your_secret_key'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    if 'income' in session:
        return render_template('dashboard.html', income=session['income'])
    return redirect('/')

@app.route('/save_income', methods=['POST'])
def save_income():
    income = float(request.form['income'])
    session['income'] = income
    return redirect('/dashboard')

@app.route('/add_expense', methods=['POST'])
def add_expense():
    expense_title = request.form['expenseTitle']
    expense_amount = float(request.form['expenseAmount'])
    if 'expenses' not in session:
        session['expenses'] = []
    session['expenses'].append({'title': expense_title, 'amount': expense_amount})
    return redirect('/dashboard')

if __name__ == '__main__':
    app.run(debug=True)
