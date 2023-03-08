# from flask import Flask, jsonify, request
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # Helper function to sort answers
# def sort_answers(answers, char):
#     my_list = [0, 0, 0, 0]
#     for i in range(10):
#         if answers[i*7].upper() == char:
#             my_list[0] += 1
#         for j in range(3):
#             for k in range(1, 3):
#                 if answers[i*7+j*2+k].upper() == char:
#                     my_list[j+1] += 1
#     return my_list

# # Helper function to calculate percentage of B answers
# def percent_of_B(A_list, B_list):
#     result = []
#     for i in range(len(B_list)):
#         percentage = int(round(float(B_list[i]) / (A_list[i] + B_list[i])*100))
#         result.append(percentage)
#     return result

# # Helper function to extract personality type
# def extract_personality(B_list):
#     result = ""
#     # dimension one: Extrovert versus Introvert (E vs I): what energizes you
#     if B_list[0] > 50:
#         result += "I"
#     elif B_list[0] < 50:
#         result += "E"
#     else:
#         result += "X"
#     # dimension two: Sensation versus iNtuition (S vs N): what you focus on   
#     if B_list[1] < 50:
#         result += "S"
#     elif B_list[1] > 50:
#         result += "N"
#     else:
#         result += "X"
#     # dimension three: Thinking versus Feeling (T vs F): how you interpret what you focus on
#     if B_list[2] < 50:
#         result += "T"
#     elif B_list[2] > 50:
#         result += "F"
#     else:
#         result += "X"
#     # dimension four: Judging versus Perceiving (J vs P): how you approach life 
#     if B_list[3] < 50:
#         result += "J"
#     elif B_list[3] > 50:
#         result += "P"
#     else:
#         result += "X"
      
#     return result

# # Flask route to process personality test
# @app.route('/api/personalityTest', methods=['POST'])
# def process_personality_test():
#     input_data = request.json
#     names = input_data['names']
#     personalityTest = input_data['personalityTest']
#     results = []
#     for i in range(len(names)):
#         A_response = sort_answers(personalityTest[i], 'A')
#         B_response = sort_answers(personalityTest[i], 'B')
#         overall_B = percent_of_B(A_response, B_response)
#         personality = extract_personality(overall_B)
#         result = {
#             'name': names[i],
#             'percentages': overall_B,
#             'personalityType': personality
#         }
#         results.append(result)
#     return jsonify(results)

# if __name__ == "__main__":
#     app.run(debug=True)


from flask import Flask, jsonify, request
import json
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

def calculate_big_five_scores(answers):
    if None in answers:
        raise ValueError('Invalid input: answers array contains a None value')
    E = 20 + answers[0] - answers[5] + answers[10] - answers[15] + answers[20] - answers[25] + answers[30] - answers[35] + answers[40] - answers[45]
    A = 14 - answers[1] + answers[6] - answers[11] + answers[16] - answers[21] + answers[26] - answers[31] + answers[36] + answers[41] + answers[46]
    C = 14 + answers[2] - answers[7] + answers[12] - answers[17] + answers[22] - answers[27] + answers[32] - answers[37] + answers[42] + answers[47]
    N = 38 - answers[3] + answers[8] - answers[13] + answers[18] - answers[23] - answers[28] - answers[33] - answers[38] - answers[43] - answers[48]
    O = 8 + answers[4] - answers[9] + answers[14] - answers[19] + answers[24] - answers[29] + answers[34] + answers[39] + answers[44] + answers[49]
    return E, A, C, N, O

@app.route('/api/calculate_big_five_scores', methods=['POST'])
def get_big_five_scores():
    input_data = request.json
    answers = input_data['answers']
    E, A, C, N, O = calculate_big_five_scores(answers)
    results = {
                'extraversion': E,
                'agreeableness': A,
                'conscientiousness': C,
                'neuroticism': N,
                'openness': O
        }
    return jsonify(results)

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