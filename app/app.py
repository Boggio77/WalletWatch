from flask import Flask, render_template, request
from decimal import Decimal, ROUND_HALF_UP
import math
from app import app

app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/interest_calc')
def interest_calc():
    return render_template('interest_calc.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/calculate_interest', methods=['POST'])
def calculate_interest():
    rate = Decimal(request.form.get('rate', '0')).quantize(Decimal('0.001'), rounding=ROUND_HALF_UP)
    amount = Decimal(request.form.get('amount', '0')).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
    frequency = request.form.get('frequency', '')
    term = int(request.form.get('term', '0'))
    rate = rate / 100
    if frequency == 'monthly':
        n = 12
    elif frequency == 'bi_weekly':
        n = 26
    elif frequency == 'quarterly':
        n = 4
    else:  # annually
        n = 1
    # Calculate monthly payment
    monthly_rate = rate / n
    num_payments = term * n
    monthly_payment = amount * monthly_rate / (1 - (1 + monthly_rate) ** -num_payments)

    # Calculate total amount paid
    total_payment = monthly_payment * num_payments

    # Calculate total interest paid
    total_interest = total_payment - amount

    return render_template('interest_calc.html', monthly_payment=round(monthly_payment, 2), 
                           total_after_interest=round(total_payment, 2), total_interest=round(total_interest, 2))

if __name__ == '__main__':
    app.run(debug=False,host='0.0.0.0')
