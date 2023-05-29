from flask import Flask, jsonify, request
import json
import uuid
from flask_cors import CORS, cross_origin
import psycopg2

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
    
# Connection to the PostgreSQL database
conn = psycopg2.connect(
    host="localhost",
    database="Wsir",
    user="postgres",
    password="123456"
) 
def calculate_big_five_scores(answers):
    E = 20 + answers[0] - answers[5] + answers[10] - answers[15] + answers[20] - answers[25] + answers[30] - answers[35] + answers[40] - answers[45]
    A = 14 - answers[1] + answers[6] - answers[11] + answers[16] - answers[21] + answers[26] - answers[31] + answers[36] + answers[41] + answers[46]
    C = 14 + answers[2] - answers[7] + answers[12] - answers[17] + answers[22] - answers[27] + answers[32] - answers[37] + answers[42] + answers[47]
    N = 38 - answers[3] + answers[8] - answers[13] + answers[18] - answers[23] - answers[28] - answers[33] - answers[38] - answers[43] - answers[48]
    O = 8 + answers[4] - answers[9] + answers[14] - answers[19] + answers[24] - answers[29] + answers[34] + answers[39] + answers[44] + answers[49]
    return E, A, C, N, O

@app.route('/api/calculate_big_five_scores', methods=['POST'])
@cross_origin(supports_credentials=True)
def get_big_five_scores():
    input_data = request.json
    answers = input_data['answers']
    name = input_data['name']
    age = input_data['age']
    E, A, C, N, O = calculate_big_five_scores(answers)
    unique_id = str(uuid.uuid4())

    # Inserting the results into the PostgreSQL database
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO results (id, name, age, extraversion, agreeableness, conscientiousness, neuroticism, openness) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
        (unique_id, name, age, E, A, C, N, O)
    )
    conn.commit()
    cursor.close()

    results = {
        'extraversion': E,
        'agreeableness': A,
        'conscientiousness': C,
        'neuroticism': N,
        'openness': O,
        'id': unique_id,
        'name': name,
        'age': age,
    }
    if None in answers:
        raise ValueError('Invalid input: answers array contains a None value')
    return jsonify(results)

@app.route('/api/personalityResult/<string:id>')
def get_results(id):
    # id = str(uuid.uuid4())
    try:
        uuid_obj = uuid.UUID(id)
    except ValueError:
        return jsonify({'error': 'Invalid ID format'}), 404
    cursor = conn.cursor()
    cursor.execute(
        "SELECT * FROM results WHERE id=%s",
        (id,)
    )
    result = cursor.fetchone()
    cursor.close()

    if result is None:
        return jsonify({'error': 'Result not found'}), 404
    
    personality_type = [
    {
        "type": 'Uyumluluk',
        "description": "Bir bireyin şefkat, empati ve başkaları için endişe düzeyini ifade eder. Bu boyutta yüksek puan alan kişiler işbirlikçi, yardımsever ve arkadaş canlısı olma eğilimindedir. Uyumlu ilişkilere değer verirler ve genellikle sıcak ve besleyici olarak tanımlanırlar.",
        'score': result[4]
    },
    {
        "type": 'Sorumluluk',
        "description": "Bireyin organizasyon, sorumluluk ve güvenilirlik düzeyini ifade eder. Bu boyutta yüksek puan alan kişiler çalışkan, güvenilir ve verimli olma eğilimindedir. Genellikle hedef odaklıdırlar ve hedeflerine ulaşmak için çabalarlar.",
        'score': result[5]
    },
    {
        "type": 'Dışa Dönüklük',
        "description": "Bireyin sosyallik, atılganlık ve duygusal dışavurumculuk düzeyini ifade eder. Bu boyutta yüksek puan alan kişiler tipik olarak dışa dönük, enerjik ve konuşkandır. Başkalarının yanında olmaktan keyif alma eğilimindedirler ve genellikle sosyal kelebekler olarak tanımlanırlar.",
        'score':  result[3]
    },
    {
        "type": 'Nörotizm',
        "description": "Bireyin duygusal dengesizlik, kaygı ve karamsarlık düzeyini ifade eder. Bu boyutta yüksek puan alan insanlar endişe, stres ve kendinden şüphe duymaya eğilimlidirler. Genellikle hassas ve duygusal olarak tanımlanırlar.",
        'score': result[6]
    },
    {
        "type": 'Açıklık',
        "description": "Bireyin yeni deneyimlere ve fikirlere açıklığını ifade eder. Bu boyutta yüksek puan alan kişiler genellikle yaratıcı, yaratıcı ve meraklıdır. Yeni şeyler keşfetmeye açıktırlar ve genellikle çok çeşitli ilgi alanlarına sahip olarak tanımlanırlar.",
        'score': result[2]
    }
]
    # sort the personality_type list based on the score in descending order
    personality_type = sorted(personality_type, key=lambda x: x['score'], reverse=True)
    
    results = {
        'id': result[0],
        'name': result[1],
        'age' : result[7],
        'personalityType': personality_type
    }

    return jsonify(results)
if __name__ == '__main__':
    app.run()
