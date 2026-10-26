const employees = ['Ayşe Yılmaz', 'Mehmet Demir', 'Zeynep Kaya', 'Can Öztürk'];

const projects = ['E-Ticaret Sitesi', 'Mobil Uygulama', 'İç Raporlama Paneli'];

const tasks = [
  { id: 1, title: 'Ödeme sayfası tasarımı', description: 'Sepet sonrası ödeme adımlarının arayüz tasarımı', assignedTo: 'Ayşe Yılmaz', project: 'E-Ticaret Sitesi', status: 'in-progress', priority: 'high', createdAt: '2026-10-20T09:00:00.000Z', dueDate: '2026-10-30' },
  { id: 2, title: 'Push bildirim entegrasyonu', description: 'Mobil uygulamaya bildirim altyapısının eklenmesi', assignedTo: 'Mehmet Demir', project: 'Mobil Uygulama', status: 'todo', priority: 'medium', createdAt: '2026-10-20T10:30:00.000Z', dueDate: '2026-11-05' },
  { id: 3, title: 'Aylık satış raporu', description: 'Satış verilerini özetleyen rapor ekranı', assignedTo: 'Zeynep Kaya', project: 'İç Raporlama Paneli', status: 'completed', priority: 'low', createdAt: '2026-10-18T14:00:00.000Z', dueDate: '2026-10-25' },
  { id: 4, title: 'Sepet hesaplama hatası düzeltme', description: 'İndirim kodu uygulanınca toplam tutarın yanlış hesaplanması', assignedTo: 'Can Öztürk', project: 'E-Ticaret Sitesi', status: 'in-progress', priority: 'high', createdAt: '2026-10-21T08:15:00.000Z', dueDate: '2026-10-27' },
  { id: 5, title: 'Kullanıcı profil ekranı', description: 'Profil bilgilerini görüntüleme ve düzenleme ekranı', assignedTo: 'Ayşe Yılmaz', project: 'Mobil Uygulama', status: 'todo', priority: 'medium', createdAt: '2026-10-21T11:00:00.000Z', dueDate: '2026-11-08' },
  { id: 6, title: 'Dashboard grafik bileşenleri', description: 'Satış ve görev grafiklerinin panele eklenmesi', assignedTo: 'Zeynep Kaya', project: 'İç Raporlama Paneli', status: 'in-progress', priority: 'medium', createdAt: '2026-10-21T13:45:00.000Z', dueDate: '2026-11-02' },
  { id: 7, title: 'Ürün görseli yükleme', description: 'Yönetici panelinden ürün görseli yükleme özelliği', assignedTo: 'Mehmet Demir', project: 'E-Ticaret Sitesi', status: 'completed', priority: 'medium', createdAt: '2026-10-15T09:30:00.000Z', dueDate: '2026-10-22' },
  { id: 8, title: 'Giriş ekranı tasarımı', description: 'Mobil uygulama giriş ve kayıt ekranlarının tasarımı', assignedTo: 'Ayşe Yılmaz', project: 'Mobil Uygulama', status: 'completed', priority: 'low', createdAt: '2026-10-14T10:00:00.000Z', dueDate: '2026-10-20' },
  { id: 9, title: 'Kargo takip entegrasyonu', description: 'Kargo firması API\'si ile sipariş takibinin bağlanması', assignedTo: 'Can Öztürk', project: 'E-Ticaret Sitesi', status: 'todo', priority: 'high', createdAt: '2026-10-22T09:00:00.000Z', dueDate: '2026-11-12' },
  { id: 10, title: 'Rapor dışa aktarma (CSV)', description: 'Rapor sonuçlarının CSV olarak indirilmesi', assignedTo: 'Zeynep Kaya', project: 'İç Raporlama Paneli', status: 'todo', priority: 'low', createdAt: '2026-10-22T14:20:00.000Z', dueDate: '2026-11-20' },
  { id: 11, title: 'Uygulama performans testi', description: 'Açılış süresi ve bellek kullanımının ölçülmesi', assignedTo: 'Mehmet Demir', project: 'Mobil Uygulama', status: 'in-progress', priority: 'high', createdAt: '2026-10-22T15:00:00.000Z', dueDate: '2026-10-29' },
  { id: 12, title: 'Stok uyarı sistemi', description: 'Stok azaldığında yöneticiye uyarı gösterilmesi', assignedTo: 'Can Öztürk', project: 'İç Raporlama Paneli', status: 'completed', priority: 'medium', createdAt: '2026-10-16T12:00:00.000Z', dueDate: '2026-10-21' }
];
//todo (Yapılacak / Beklemede): Henüz başlanmamış,yapılmayı bekleyen görevleri ifade eder.  
//in-progress (Devam Ediyor): Şu anda bir çalışan tarafından üzerinde çalışılan, işlemde olan görevleri belirtir.   
//completed (Tamamlandı): Bitmiş, sonuçlanmış işleri gösterir.   
// createdAt → Oluşturulma tarihi
// dueDate → Son teslim tarihi
// title → Görev başlığı
// priority → Öncelik
// status → Durum

module.exports = { employees, projects, tasks };