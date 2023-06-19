# import pandas as pd
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.model_selection import train_test_split
# import pickle

# class BookRecommendation:
#     def __init__(self):
#         self.model = None
#         self.X_train = None
#         self.y_train = None

#     def train_model(self):
#         df = pd.read_csv('books_with_categories.csv')
#         data = df.head(2000)
#         features = ['categorie1', 'categorie2', 'categorie3', 'new_rating', 'author']
#         target = 'title'

#         X = data[features]
#         y = data[target]

#         X_encoded = pd.get_dummies(X)

#         self.X_train, _, self.y_train, _ = train_test_split(X_encoded, y, test_size=0.2, random_state=42)

#         self.model = RandomForestClassifier()
#         self.model.fit(self.X_train, self.y_train)

#     def save_model(self, file_path):
#         with open(file_path, 'wb') as file:
#             pickle.dump((self.model, self.X_train, self.y_train), file)

#     def load_model(self, file_path):
#         with open(file_path, 'rb') as file:
#             self.model, self.X_train, self.y_train = pickle.load(file)

#     def predict_book(self, temp, rate):
#         temp = [item.lower() for item in temp]
#         kitap = pd.DataFrame({'categorie1': [temp[0]], 'categorie2': [temp[1]],'categorie3': [temp[2]], 'new_rating': [rate]})
#         kitap_encoded = pd.get_dummies(kitap)
#         eğitim_sütunları = self.X_train.columns
#         kitap_encoded = kitap_encoded.reindex(columns=eğitim_sütunları, fill_value=0)
#         tahmin = self.model.predict(kitap_encoded)
#         return tahmin[0]


# recommendation = BookRecommendation()
# recommendation.train_model()
# recommendation.save_model('model.pkl')