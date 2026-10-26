const express = require('express');
const app = express(); //expresi başlattık
const PORT = 3000;

// Router'lar ve Middleware'ler
const logger = require('./middleware/logger');
const tasksRouter = require('./routes/tasks');
const reportsRouter = require('./routes/reports');


app.use(express.json());
app.use(logger); 

app.use('/api/tasks', tasksRouter);
app.use('/api/reports', reportsRouter);

// Kök dizin kontrolü
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API aktif ve çalışıyor'
  });
});

// 404 Yakalama
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'İstenen adres bulunamadı.',
    url: req.url
  });
});

// Global Hata Yakalama 
app.use((err, req, res, next) => {
  const durum = err.durum || 500;
  const mesaj = err.message || 'Sunucu hatası';
  console.error(`[${durum}] ${mesaj}`);
  
  res.status(durum).json({
    success: false,
    message: mesaj
  });
});

app.listen(PORT, () => {
  console.log(`✅ Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});