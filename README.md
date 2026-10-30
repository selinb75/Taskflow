


# TASKFLOW - Görev ve Proje Yönetim Sistemi API

Node.js ve Express.js ile geliştirilmiş, REST API mantığında çalışan bir görev yönetim sistemidir. Görev ekleme, listeleme, detay görüntüleme, güncelleme ve silme (CRUD) işlemlerini destekler. Tüm istekler bir logger middleware ile konsola kaydedilir. Veriler bellekte (in-memory) tutulur, sunucu yeniden başlatılınca başlangıç verilerine döner.

## Kurulum

1. Repoyu klonlayın:

```bash
git clone https://github.com/selinb75/Taskflow.git
cd Taskflow
```

2. Bağımlılıkları kurun:

```bash
npm install
```

3. Sunucuyu başlatın:

```bash
node App.js
```

Sunucu `http://localhost:3000` adresinde çalışır. Tarayıcıda veya Postman'de bu adrese istek atıldığında `API aktif ve çalışıyor` mesajı görülmelidir.

## Klasör Yapısı

```
Taskflow/
├── App.js                 # Sunucu girişi, middleware ve router bağlantıları
├── data/
│   └── initialData.js     # Örnek çalışan, proje ve görev verileri
├── middleware/
│   └── logger.js          # İstek kayıt (logger) middleware'i
├── routes/
│   └── tasks.js           # Görev endpoint'leri
├── package.json
└── README.md
```

## Görev Modeli

| Alan | Tip | Açıklama |
|------|-----|----------|
| id | number | Otomatik atanır |
| title | string | Görev başlığı (zorunlu) |
| description | string | Açıklama (zorunlu) |
| assignedTo | string | Atanan çalışan (zorunlu) |
| project | string | Proje adı (zorunlu) |
| status | string | `todo`, `in-progress`, `completed` (varsayılan: `todo`) |
| priority | string | `low`, `medium`, `high` (varsayılan: `medium`) |
| createdAt | string | Otomatik atanır (ISO tarih) |
| dueDate | string | Son teslim tarihi (zorunlu, örn. `2026-11-10`) |

## Endpoint'ler

| Method | URL | Açıklama |
|--------|-----|----------|
| GET | `/` | API durum kontrolü |
| GET | `/api/tasks` | Tüm görevleri listeler |
| GET | `/api/tasks/:id` | Tek görevin detayını getirir |
| POST | `/api/tasks` | Yeni görev oluşturur |
| PATCH | `/api/tasks/:id` | Görevi günceller (kısmi güncelleme) |
| DELETE | `/api/tasks/:id` | Görevi siler |
| GET | `/api/tasks/stats` | Duruma ve önceliğe göre görev sayıları |
| GET | `/api/tasks/search?keyword=sepet` | Başlık ve açıklamada arama |
| GET | `/api/tasks/assignee/:name` | Çalışana göre görevler |

### Listeleme parametreleri (`GET /api/tasks`)

- Filtreleme: `status`, `priority`, `assignedTo`, `project`
- Sıralama: `sortBy` (`createdAt`, `dueDate`, `title`, `priority`, `status`) ve `order` (`asc`, `desc`)
- Sayfalama: `page`, `limit`

Örnek:

```
GET /api/tasks?status=in-progress&priority=high&sortBy=dueDate&order=asc&page=1&limit=5
```

### Örnek POST isteği

```json
{
  "title": "Yeni görev",
  "description": "Görev açıklaması",
  "assignedTo": "Ayşe Yılmaz",
  "project": "E-Ticaret Sitesi",
  "dueDate": "2026-11-15",
  "status": "todo",
  "priority": "high"
}
```

### Örnek PATCH isteği

```json
{
  "status": "completed"
}
```

### Durum kodları

| Kod | Anlamı |
|-----|--------|
| 200 | Başarılı |
| 201 | Görev oluşturuldu |
| 400 | Geçersiz veya eksik veri |
| 404 | Görev veya adres bulunamadı |

## Logger

Her istek konsola şu formatta yazılır:

```
[2026-10-26T15:00:00.000Z] GET /api/tasks - ::1
```
## Teknolojiler

Node.js, Express.js, REST API, Middleware
## Test

https://github.com/user-attachments/assets/ab6eabed-6ea1-4446-88ea-9f4411c4d32f



