from flask import Flask, render_template, request
import math

app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():
    return render_template('interest_calc.html')

@app.route('/calculate_interest', methods=['POST'])
def calculate_interest():
    rate = round(float(request.form['rate']), 2)
    amount = round(float(request.form['amount']), 2)
    frequency = request.form['frequency']
    term = int(request.form['term'])
    compound = request.form['compound']

    if frequency == 'monthly':
        n = 12
    elif frequency == 'bi_weekly':
        n = 26
    elif frequency == 'quarterly':
        n = 4
    else:  # annually
        n = 1

    if compound == 'simple':
        interest = amount * rate * term / 100
    else:  # compound interest
        interest = amount * (1 + rate / (n * 100)) ** (n * term) - amount

    total_interest = round(amount * (1 + rate / (n * 100)) ** (n * term) - amount, 2)
    total_after_interest = round(amount + total_interest, 2)
    monthly_payment = round(total_after_interest / (term * n), 2)

    return render_template('interest_calc.html', total_interest=total_interest, total_after_interest=total_after_interest, monthly_payment=monthly_payment)

if __name__ == '__main__':
    app.run(debug=True)
