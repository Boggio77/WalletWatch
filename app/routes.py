from flask import render_template
from app import app

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
