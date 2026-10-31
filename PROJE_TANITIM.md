# TaskFlow - Proje Tanıtım Dokümanı

**Proje:** Görev ve Proje Yönetim Sistemi API Geliştirme Projesi
**Eğitim:** Node.js ile Backend Programlama

**Teknolojiler:** Node.js, Express.js, REST API, Middleware

## 1. Projenin Amacı

Bu proje, eğitim süresince öğrenilen Node.js ve Express.js bilgilerinin uygulamalı olarak gösterilmesi amacıyla geliştirilmiştir. Gerçek hayatta kullanılabilecek bir Görev ve Proje Yönetim Sistemi API'si tasarlanmış ve REST API mantığında hayata geçirilmiştir.

## 2. Proje Senaryosu

Bir yazılım şirketi, ekip içindeki görevleri, projeleri ve çalışanların sorumluluklarını takip etmek istemektedir. TaskFlow API'si bu ihtiyacı karşılar. Sistem şunları sağlar:

- Görevlerin oluşturulması
- Görevlerin çalışanlara atanması
- Görev durumlarının takip edilmesi
- Görevlerin önceliklendirilmesi
- Görevlerin filtrelenmesi ve temel raporlama

Örnek veride 4 çalışan, 3 proje ve 12 görev bulunmaktadır. Projeler: E-Ticaret Sitesi, Mobil Uygulama ve İç Raporlama Paneli.

## 3. Veri Modeli

Her görev şu alanlardan oluşur:

| Alan | Açıklama |
|---|---|
| id | Sunucu tarafından otomatik verilen benzersiz numara |
| title | Görev başlığı |
| description | Görev açıklaması |
| assignedTo | Görevin atandığı çalışan |
| project | Görevin ait olduğu proje |
| status | Durum: `todo` (yapılacak), `in-progress` (devam ediyor), `completed` (tamamlandı) |
| priority | Öncelik: `low`, `medium`, `high` |
| createdAt | Oluşturulma tarihi (sunucu atar) |
| dueDate | Son teslim tarihi |

## 4. Temel Sistem Özellikleri

**Görev yönetimi (CRUD):**
- Görev ekleme: `POST /api/tasks`
- Görev listeleme: `GET /api/tasks`
- Görev detayı: `GET /api/tasks/:id`
- Görev güncelleme: `PATCH /api/tasks/:id`
- Görev silme: `DELETE /api/tasks/:id`

**Logger middleware:** Gelen her isteğin zamanı, method'u, adresi ve IP bilgisi konsola kaydedilir.

**Hata yönetimi:** Geçersiz veri için `400`, bulunamayan görev veya adres için `404` kodu ve açıklayıcı mesaj döner.

## 5. Ek Özellikler

- Filtreleme (durum, öncelik, çalışan, proje), sıralama ve sayfalama
- Başlık ve açıklamada arama
- Validation middleware ile veri doğrulama
- Raporlama servisleri: tamamlanan görev sayısı, bekleyen görev sayısı ve genel sistem özeti
- Kapsamlı dokümantasyon seti: API dokümantasyonu, test dokümantasyonu ve kullanım kılavuzu

## 6. Proje Yapısı

Proje `App.js` giriş dosyası, `routes/` (görev ve rapor endpoint'leri), `middleware/` (logger ve doğrulama) ile `İnitialData/` (örnek veriler) klasörlerinden oluşur. Bu yapı, kodun düzenli ve bakımı kolay olmasını sağlar.

## 7. Test

Tüm CRUD endpoint'leri Postman üzerinde test edilmiş ve doğru çalıştığı doğrulanmıştır.

## 8. Sonuç

Bu proje kapsamında Node.js ve Express.js kullanılarak REST API mimarisinde bir görev yönetim sistemi geliştirilmiştir. Routing, middleware, CRUD operasyonları, veri doğrulama ve hata yönetimi gibi backend geliştirme süreçleri uygulamalı olarak gerçekleştirilmiştir. Postman aracılığıyla API endpoint'leri test edilerek sistemin çalışma durumu kontrol edilmiştir.
