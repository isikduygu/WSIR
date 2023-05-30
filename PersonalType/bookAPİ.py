from googleapiclient.discovery import build

# API anahtarınızı buraya ekleyin
def searchBook(kitap_adi,yazar_adi):
    api_key = "AIzaSyDtEC-3zuGWe7LerbKM-cUP1lRenx9p3Nc"

    # API istemcisini oluşturun
    service = build('books', 'v1', developerKey=api_key)

    # Kitap araması yapmak için bir sorgu belirleyin
    # kitap_adi = "The Midwife's Confession"  # Aramak istediğiniz kitap adını buraya yazın
    # yazar_adi = "Diane Chamberlain (Goodreads Author)"

    # Kitap araması API isteği
    request = service.volumes().list(q=f'intitle:{kitap_adi}+inauthor:{yazar_adi}')
    response = request.execute()

    if 'items' in response:
        # Arama sonuçlarını işleyin
        for book in response['items']:
            book_info = book['volumeInfo']
            if 'imageLinks' in book_info and 'thumbnail' in book_info['imageLinks']:
                resim_url = book_info['imageLinks']['thumbnail']
            else:
                resim_url = "Resim bulunamadı"
            return {
                'book_title': book_info.get('title', 'Kitap bulunamadı'),
                'book_author' : book_info.get('authors', 'Yazar bulunamadı'),
                'publisher' : book_info.get('publisher', 'Bilgi yok'),
                "description" : book_info.get('description', 'Açıklama bulunamadı'),
                'imageUrl' : resim_url
            }
