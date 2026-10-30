# TaskFlow API Kullanım Kılavuzu

Bu kılavuz, TaskFlow API'sinin nasıl çalıştırılacağını ve nasıl kullanılacağını adım adım anlatır. Her endpoint'in ayrıntılı açıklaması için `API_DOKUMANTASYONU.md` dosyasına bakılabilir.

## 1. Sunucuyu Çalıştırma

1. Proje klasöründe terminali açın.
2. `npm install` komutuyla bağımlılıkları kurun.
3. `npm start` komutuyla sunucuyu başlatın.
4. Terminalde "Sunucu http://localhost:3000 adresinde çalışıyor" mesajını görürseniz sunucu hazırdır.

Tarayıcıdan `http://localhost:3000` adresini açtığınızda "API aktif ve çalışıyor" mesajı görünür.

## 2. API'yi Nasıl Kullanırsınız?

API'ye Postman gibi bir araçla istek göndererek erişilir. Bilmeniz gereken temel kurallar şunlardır:

- Tüm adresler `http://localhost:3000/api/tasks` ile başlar.
- İstek ve cevaplar JSON formatındadır.
- Görev eklerken veya güncellerken Postman'de **Body → raw → JSON** seçilmelidir.
- Her cevapta `success` alanı bulunur. `true` ise işlem başarılıdır, `false` ise `message` alanı hatanın nedenini açıklar.
- Kimlik doğrulama yoktur.

## 3. Adım Adım Kullanım

### Adım 1: Görev ekleme

`POST` yöntemiyle `/api/tasks` adresine istek gönderin. Body kısmında görevin başlığı (`title`), açıklaması (`description`), atanan kişi (`assignedTo`), proje (`project`) ve teslim tarihi (`dueDate`) yazılmalıdır. Öncelik (`priority`) ve durum (`status`) isteğe bağlıdır. Gönderilmezse öncelik `medium`, durum `todo` olur.

Başarılı olursa `201` kodu ve oluşturulan görev döner. Görevin `id` değerini not alın, sonraki adımlarda kullanacaksınız.

### Adım 2: Görevleri listeleme ve filtreleme

`GET` yöntemiyle `/api/tasks` adresine istek gönderin. Tüm görevler gelir. Listeyi daraltmak için adresin sonuna parametre ekleyebilirsiniz:

- Duruma göre: `?status=completed`
- Önceliğe göre: `?priority=high`
- Çalışana göre: `?assignedTo=Ayşe Yılmaz`
- Sıralama için: `?sortBy=dueDate&order=desc`
- Sayfalama için: `?page=1&limit=5`

Parametreler birlikte kullanılabilir. Örneğin `?status=todo&priority=high`.

### Adım 3: Tek bir görevi görüntüleme

`GET` yöntemiyle `/api/tasks/13` gibi, sonuna görevin `id` değeri yazılmış adrese istek gönderin.

### Adım 4: Görevi güncelleme

`PATCH` yöntemiyle `/api/tasks/13` adresine istek gönderin. Body kısmında sadece değiştirmek istediğiniz alanları yazın. Örneğin sadece durumu değiştirmek için `status` alanını göndermeniz yeterlidir.

### Adım 5: Görevi silme

`DELETE` yöntemiyle `/api/tasks/13` adresine istek gönderin. Başarılı olursa "Görev silindi." mesajı döner.

### Adım 6: Arama ve raporlar

- Başlık veya açıklamada arama: `GET /api/tasks/search?keyword=sepet`
- Çalışana göre listeleme: `GET /api/tasks/assignee/Ayşe`
- Durum ve öncelik istatistikleri: `GET /api/tasks/stats`
- Tamamlanan görev sayısı: `GET /api/reports/completed`
- Bekleyen görev sayısı: `GET /api/reports/pending`
- Genel sistem özeti: `GET /api/reports/summary`

## 4. Hata Mesajları

| Kod | Anlamı | Ne yapmalı |
|---|---|---|
| 400 | Eksik veya geçersiz veri gönderildi | `message` alanını okuyup isteği düzeltin |
| 404 | Görev veya adres bulunamadı | `id` değerini ve adresi kontrol edin |
| 500 | Sunucu hatası | Terminaldeki hata çıktısına bakın |

## 5. Sık Karşılaşılan Sorunlar

- **"İstenen adres bulunamadı":** Adresin `/api/tasks` ile başladığından emin olun.
- **"Eksik veya geçersiz alan" hatası:** Body'de zorunlu alanların hepsi dolu olmalı ve `Content-Type` JSON olmalıdır.
- **Veriler kayboldu:** Veriler hafızada tutulur. Sunucu yeniden başlatılınca ilk haline döner.
