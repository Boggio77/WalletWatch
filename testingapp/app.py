from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_pie_chart', methods=['POST'])
def generate_pie_chart():
    data = request.json

    pie_chart_data = process_data(data)

    return jsonify(pie_chart_data)

def process_data(data):

    with open('data.json', 'r') as file:
        chart_data = json.load(file)


    return chart_data

if __name__ == '__main__':
    app.run(debug=True)
