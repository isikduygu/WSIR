import itertools
import randomforest2 as rf

def calculate_category(scores):
    # scores = [4,20,10,40,12]

    def calculateLetter(num):
        letter = ''
        if num >= 0 and num <= 12:
            letter = 'C'
        elif num >= 13 and num <= 26:
            letter = 'B'
        else:
            letter = 'A'
        return letter

    scoresLetter = tuple([calculateLetter(score) for score in scores])

    book_categories = {
    ('B', 'B', 'B', 'B', 'B'): ['Growth Mindset','Relationships', 'Guidebook', 'Self Help', 'Epic Fantasy', 'School stories', 'Comics', 'Comic book', 'Short stories', 'Short story collection', 'cartoon', 'picture books'],
    ('A', 'A', 'A', 'A', 'B'): ['Russian literature','Biography', 'Russian literature', 'Human Development', 'Roman', 'Ireland', 'How To'],
    ('A', 'A', 'A', 'A', 'C'): ['Gothic', 'Science Fiction Romance', 'Business', 'Eastern Philosophy', 'Management', 'Mental Health', 'Diary','Sociology'],
    ('A', 'A', 'A', 'B', 'B'): ['International' 'Literature', 'Cookbooks', 'Bicycles', 'Walking', 'Book Club', 'Crafts', 'Food', 'Dogs', 'Coctails', 'Sewing', 'Baseball', 'Gardening', 'Green', 'Motorcycling', 'Food and Drink', 'Stories','Drinking', 'Hinduism', 'Buddism', 'Cats', 'Fiction', 'Tea', 'Diets', 'Design', 'Basketball', 'Cycling', 'Climbing', 'cars'],
    ('A', 'A', 'A', 'B', 'A'): ['Social Work', 'Prayer', 'Journal', 'Spirituality', 'Plants', 'Ecology', 'Clean Romance', 'classics', 'drawing'],
    ('A', 'A', 'A', 'B', 'C'): ['Human Development'],
    ('A', 'A', 'A', 'C', 'C'): ['Relationships'],
    ('A', 'A', 'A', 'C', 'A'): ['Short stories'],
    ('A', 'A', 'A', 'C', 'B'): ['Spirituality'],
    ('A', 'A', 'B', 'A', 'A'): ['Fantasy Romance'],
    ('A', 'A', 'B', 'A', 'B'): ['Biography'],
    ('A', 'A', 'B', 'A', 'C'): ['Speculative Fiction'],
    ('A', 'A', 'B', 'B', 'B'): ['Time Travel Romance'],
    ('A', 'A', 'B', 'B', 'A'): ['Pop Culture'],
    ('A', 'A', 'B', 'B', 'C'): ['Multicultural Literature'],
    ('A', 'A', 'B', 'B', 'C'): ['Nobel Prize'],
    ('A', 'A', 'B', 'C', 'A'): ['Polish literature'],
    ('A', 'A', 'B', 'C', 'B'): ['Sociology'],
    ('A', 'A', 'C', 'A', 'A'): ['Western historical romance'],
    ('A', 'A', 'C', 'A', 'B'): ['Biography memoir'],
    ('A', 'A', 'C', 'A', 'C'): ['Journalism'],
    ('A', 'A', 'C', 'B', 'B'): ['Interracial romance'],
    ('A', 'A', 'C', 'B', 'A'): ['Buddhism'],
    ('A', 'A', 'C', 'B', 'C'): ['Hungarian literature'],
    ('A', 'A', 'C', 'C', 'C'): ['Philosophy'],
    ('A', 'A', 'C', 'C', 'A'): ['Short stories'],
    ('A', 'A', 'C', 'C', 'B'): ['Cultural'],
    ('A', 'B', 'A', 'A', 'A'): ['Female authors'],
    ('A', 'B', 'A', 'A', 'B'): ['Fan fiction'],
    ('A', 'B', 'A', 'A', 'C'): ['Modern classics'],
    ('A', 'B', 'A', 'B', 'B'): ['Travelogue'],
    ('A', 'B', 'A', 'B', 'A'): ['Fiction'],
    ('A', 'B', 'A', 'B', 'C'): ['Singularity'],
    ('A', 'B', 'A', 'C', 'C'): ['Historical mystery'],
    ('A', 'B', 'A', 'C', 'A'): ['Social'],
    ('A', 'B', 'A', 'C', 'B'): ['Female authors'],
    ('A', 'B', 'B', 'A', 'A'): ['Travel'],
    ('A', 'B', 'B', 'A', 'B'): ['Art'],
    ('A', 'B', 'B', 'A', 'C'): ['Productivity'],
    ('A', 'B', 'B', 'B', 'B'): ['Astronomy'],
    ('A', 'B', 'B', 'B', 'A'): ['Female authors'],
    ('A', 'B', 'B', 'B', 'C'): ['French revolution'],
    ('A', 'B', 'B', 'C', 'C'): ['Turkish'],
    ('A', 'B', 'B', 'C', 'A'): ['Fantasy romance'],
    ('A', 'B', 'B', 'C', 'B'): ['Asian literature'],
    ('A', 'B', 'C', 'A', 'A'): ['Latin American literature'],
    ('A', 'B', 'C', 'A', 'B'): ['Dark'],
    ('A', 'B', 'C', 'A', 'C'): ['Roman'],
    ('A', 'B', 'C', 'B', 'B'): ['War'],
    ('A', 'B', 'C', 'B', 'A'): ['Ancient history'],
    ('A', 'B', 'C', 'B', 'C'): ['Young adult'],
    ('A', 'B', 'C', 'C', 'C'): ['Supernatural romance'],
    ('A', 'B', 'C', 'C', 'A'): ['Novella'],
    ('A', 'B', 'C', 'C', 'B'): ['Thriller'],
    ('A', 'C', 'A', 'A', 'A'): ['Chinese literature'],
    ('A', 'C', 'A', 'A', 'B'): ['Regency'],
    ('A', 'C', 'A', 'A', 'C'): ['Usability'],
    ('A', 'C', 'A', 'A', 'B'): ['Urban'],
    ('A', 'C', 'A', 'B', 'A'): ['Traditional regency'],
    ('A', 'C', 'A', 'B', 'C'): ['Civil war history'],
    ('A', 'C', 'A', 'C', 'C'): ['Low fantasy'],
    ('A', 'C', 'A', 'C', 'A'): ['Czech literature'],
    ('A', 'C', 'A', 'C', 'B'): ['Indonesian literature'],
    ('A', 'C', 'B', 'B', 'A'): ['Juvenile'],
    ('A', 'C', 'B', 'A', 'B'): ['Travel'],
    ('A', 'C', 'B', 'A', 'C'): ['Historical fantasy'],
    ('A', 'C', 'B', 'B', 'B'): ['Society'],
    ('A', 'C', 'B', 'B', 'A'): ['Golden age mystery'],
    ('A', 'C', 'B', 'B', 'C'): ['Naval historical fiction'],
    ('A', 'C', 'B', 'C', 'C'): ['Fae'],
    ('A', 'C', 'B', 'C', 'A'): ['Personal development'],
    ('A', 'C', 'B', 'C', 'B'): ['Urbanism'],
    ('A', 'C', 'C', 'C', 'A'): ['Harlequin heartwarming'],
    ('A', 'C', 'C', 'A', 'B'): ['Cryptozoology'],
    ('A', 'C', 'C', 'A', 'C'): ['Creation science'],
    ('A', 'C', 'C', 'B', 'B'): ['Space opera'],
    ('A', 'C', 'C', 'B', 'A'): ['Sci fi fantasy'],
    ('A', 'C', 'C', 'B', 'C'): ['Political science'],
    ('A', 'C', 'C', 'C', 'C'): ['Urban fantasy'],
    ('A', 'C', 'C', 'C', 'A'): ['Chinese literature'],
    ('A', 'C', 'C', 'C', 'B'): ['Alternate history'],
    # add more book category mappings as needed
    }
    possible_combinations = itertools.product('ABC', repeat=len(scoresLetter))


    for combination in possible_combinations:
        if all(combination[i] == scoresLetter[i] for i in range(len(scoresLetter))):
            return rf.randomForestClassifier(str(book_categories[combination]))
