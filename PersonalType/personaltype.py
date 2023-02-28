from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Helper function to sort answers
def sort_answers(answers, char):
    my_list = [0, 0, 0, 0]
    for i in range(10):
        if answers[i*7].upper() == char:
            my_list[0] += 1
        for j in range(3):
            for k in range(1, 3):
                if answers[i*7+j*2+k].upper() == char:
                    my_list[j+1] += 1
    return my_list

# Helper function to calculate percentage of B answers
def percent_of_B(A_list, B_list):
    result = []
    for i in range(len(B_list)):
        percentage = int(round(float(B_list[i]) / (A_list[i] + B_list[i])*100))
        result.append(percentage)
    return result

# Helper function to extract personality type
def extract_personality(B_list):
    result = ""
    # dimension one: Extrovert versus Introvert (E vs I): what energizes you
    if B_list[0] > 50:
        result += "I"
    elif B_list[0] < 50:
        result += "E"
    else:
        result += "X"
    # dimension two: Sensation versus iNtuition (S vs N): what you focus on   
    if B_list[1] < 50:
        result += "S"
    elif B_list[1] > 50:
        result += "N"
    else:
        result += "X"
    # dimension three: Thinking versus Feeling (T vs F): how you interpret what you focus on
    if B_list[2] < 50:
        result += "T"
    elif B_list[2] > 50:
        result += "F"
    else:
        result += "X"
    # dimension four: Judging versus Perceiving (J vs P): how you approach life 
    if B_list[3] < 50:
        result += "J"
    elif B_list[3] > 50:
        result += "P"
    else:
        result += "X"
      
    return result

# Flask route to process personality test
@app.route('/api/personalityTest', methods=['POST'])
def process_personality_test():
    input_data = request.json
    names = input_data['names']
    personalityTest = input_data['personalityTest']
    results = []
    for i in range(len(names)):
        A_response = sort_answers(personalityTest[i], 'A')
        B_response = sort_answers(personalityTest[i], 'B')
        overall_B = percent_of_B(A_response, B_response)
        personality = extract_personality(overall_B)
        result = {
            'name': names[i],
            'percentages': overall_B,
            'personalityType': personality
        }
        results.append(result)
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)
