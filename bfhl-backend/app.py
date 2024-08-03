from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/bfhl', methods=['POST'])
def handle_post():
    try:
        data = request.json.get('data', [])
        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]
        highest_alphabet = sorted(alphabets, key=lambda x: x.lower())[-1:] if alphabets else []
        response = {
            "is_success": True,
            "user_id": "your_fullname_ddmmyyyy",
            "email": "your_email@domain.com",
            "roll_number": "RA2111026020085",
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_alphabet": highest_alphabet
        }
        return jsonify(response)
    except Exception as e:
        return jsonify({"is_success": False, "error": str(e)})

@app.route('/bfhl', methods=['GET'])
def handle_get():
    return jsonify({"operation_code": 1})

if __name__ == '__main__':
    app.run(debug=True)


