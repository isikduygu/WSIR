from flask import Flask, jsonify, request
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/questions')
def get_questions():
    page = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=10, type=int)
    
    with open('PersonalType/questions.json',encoding='utf-8') as f:
        data = json.load(f)
        start_index = (page - 1) * page_size
        end_index = start_index + page_size
        questions = data['questions'][start_index:end_index]
        return jsonify({'questions': questions})
    
if __name__ == '__main__':
    app.run()


