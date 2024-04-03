from flask import render_template
from app import app

@app.route('/interest_calc')
def interest_calc():
    return render_template('interest_calc.html')
