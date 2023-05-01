array = [2,5,4,1,10]
array.sort()
print(array)

E = 20
A = 5 
C = 10
N = 12 
O = 8 

# create a list of personality types and their scores
personality_type = [
    {
        "type": 'Uyumluluk',
        "description": "Bir bireyin şefkat, empati ve başkaları için endişe düzeyini ifade eder. Bu boyutta yüksek puan alan kişiler işbirlikçi, yardımsever ve arkadaş canlısı olma eğilimindedir. Uyumlu ilişkilere değer verirler ve genellikle sıcak ve besleyici olarak tanımlanırlar.",
        'score': A
    },
    {
        "type": 'Sorumluluk',
        "description": "Bireyin organizasyon, sorumluluk ve güvenilirlik düzeyini ifade eder. Bu boyutta yüksek puan alan kişiler çalışkan, güvenilir ve verimli olma eğilimindedir. Genellikle hedef odaklıdırlar ve hedeflerine ulaşmak için çabalarlar.",
        'score': C
    },
    {
        "type": 'Dışa Dönüklük',
        "description": "Bireyin sosyallik, atılganlık ve duygusal dışavurumculuk düzeyini ifade eder. Bu boyutta yüksek puan alan kişiler tipik olarak dışa dönük, enerjik ve konuşkandır. Başkalarının yanında olmaktan keyif alma eğilimindedirler ve genellikle sosyal kelebekler olarak tanımlanırlar.",
        'score': E
    },
    {
        "type": 'Nörorizm',
        "description": "Bireyin duygusal dengesizlik, kaygı ve karamsarlık düzeyini ifade eder. Bu boyutta yüksek puan alan insanlar endişe, stres ve kendinden şüphe duymaya eğilimlidirler. Genellikle hassas ve duygusal olarak tanımlanırlar.",
        'score': N
    },
    {
        "type": 'Açıklık',
        "description": "Bireyin yeni deneyimlere ve fikirlere açıklığını ifade eder. Bu boyutta yüksek puan alan kişiler genellikle yaratıcı, yaratıcı ve meraklıdır. Yeni şeyler keşfetmeye açıktırlar ve genellikle çok çeşitli ilgi alanlarına sahip olarak tanımlanırlar.",
        'score': O
    }
]

# sort the personality_type list based on the score in descending order
personality_type = sorted(personality_type, key=lambda x: x['score'], reverse=True)

# add the personality_type list to the results dictionary
results = {
    'personality_type': personality_type
}
print(results)
