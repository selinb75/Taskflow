
const express = require('express');
const router = express.Router();
const { validateTask, validateTaskUpdate } = require('../middleware/validate');
const { tasks } = require('../data/initialData');
 
const VALID_STATUS = ['todo', 'in-progress', 'completed'];//görevin (task) alabileceği izin verilen geçerli durum (status)
const VALID_PRIORITY = ['low', 'medium', 'high'];//görevin öncelikli durumu
 
// Örnek veriler 1-12 olduğu için sıradaki id 13'ten başlar
let nextId = Math.max(...tasks.map((t) => t.id)) + 1;
 

// GET /api/tasks  (Listeleme + filtreleme + sıralama + sayfalama)
// Örnek: /api/tasks?status=completed&priority=high&sortBy=dueDate&page=1&limit=5

router.get('/', (req, res) => {
  const { status, priority, assignedTo, project, sortBy, order, page, limit } = req.query;
 
  if (status !== undefined && !VALID_STATUS.includes(status)) {//Kullanıcı durumunu göndermiş mi ve Valid_status dosyasında bu durum içeriyor mu
    return res.status(400).json({ //iki koşuldadas yoksa 400 hata kodunu döndür
      success: false,
      message: `status şunlardan biri olmalı: ${VALID_STATUS.join(', ')}`
    });
  }
  if (priority !== undefined && !VALID_PRIORITY.includes(priority)) {
    return res.status(400).json({
      success: false,
      message: `priority şunlardan biri olmalı: ${VALID_PRIORITY.join(', ')}`
    });
  }
 
  let result = [...tasks];//sonuç
 //Görev durumu, görevin önceliği, proje atanan çalışan adı gibi anahtar kelimeleri filtreleme
  if (status) result = result.filter((t) => t.status === status);
  if (priority) result = result.filter((t) => t.priority === priority);
  if (assignedTo) result = result.filter((t) => t.assignedTo.toLowerCase() === assignedTo.toLowerCase());
  if (project) result = result.filter((t) => t.project.toLowerCase() === project.toLowerCase());
 
  // Sıralama (?sortBy=createdAt&order=desc)
  if (sortBy) {
    const allowed = ['createdAt', 'dueDate', 'title', 'priority', 'status'];//allowed yani izin verilen sıralama(sortBy) anahtarları
    if (!allowed.includes(sortBy)) {//izin verilen anahtar dizisinde(allowed) kullanıcının gönderidği sort(sortBy) degeri dizide yer almıyormu
      return res.status(400).json({//almıyorsa 400 hata kodu giriş yapılamadı
        success: false,
        message: `sortBy şunlardan biri olmalı: ${allowed.join(', ')}`
      });
    }
    const dir = order === 'desc' ? -1 : 1;//artan(1) yada azalan(-1) olarak sırala 
    result.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : a[sortBy] < b[sortBy] ? -1 : 0) * dir);
  }
 
  // Sayfalama (?page=1&limit=5)
  const total = result.length;
  if (page !== undefined || limit !== undefined) {
    const p = Math.max(parseInt(page, 10) || 1, 1);
    const l = Math.max(parseInt(limit, 10) || 10, 1);
    result = result.slice((p - 1) * l, p * l);
    return res.json({ success: true, total, page: p, limit: l, count: result.length, data: result });
  }
 
  res.json({ success: true, count: total, data: result });
});
 

 
// GET /api/tasks/stats
router.get('/stats', (req, res) => {
  const countBy = (field, values) =>
    values.reduce((acc, v) => {
      acc[v] = tasks.filter((t) => t[field] === v).length;
      return acc;
    }, {});
 
  res.json({
    success: true,
    total: tasks.length,
    byStatus: countBy('status', VALID_STATUS),
    byPriority: countBy('priority', VALID_PRIORITY)
  });
});
 
// GET /api/tasks/search?keyword=sepet
router.get('/search', (req, res) => {
  const keyword = (req.query.keyword || '').trim().toLowerCase();
  if (!keyword) {
    return res.status(400).json({ success: false, message: 'keyword parametresi gerekli.' });
  }
  const result = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(keyword) ||
      t.description.toLowerCase().includes(keyword)
  );
  res.json({ success: true, count: result.length, data: result });
});
 
// GET /api/tasks/assignee/Ayşe%20Yılmaz
router.get('/assignee/:name', (req, res) => {
  const name = req.params.name.toLowerCase();
  const result = tasks.filter((t) => t.assignedTo.toLowerCase().includes(name));
  res.json({ success: true, count: result.length, data: result });
});
 

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ success: false, message: 'id sayı olmalıdır.' });
  }
 
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ success: false, message: 'Görev bulunamadı.' });
  }
 
  res.json({ success: true, data: task });
});
 

router.post('/',validateTask, (req, res) => {
  const body = req.body || {};
 
  const required = ['title', 'description', 'assignedTo', 'project', 'dueDate'];
  const missing = required.filter(
    (field) => typeof body[field] !== 'string' || body[field].trim() === ''
  );
 
  if (missing.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Eksik veya geçersiz alan(lar): ${missing.join(', ')}`
    });
  }
 
  if (body.status !== undefined && !VALID_STATUS.includes(body.status)) {
    return res.status(400).json({
      success: false,
      message: `status şunlardan biri olmalı: ${VALID_STATUS.join(', ')}`
    });
  }
 
  if (body.priority !== undefined && !VALID_PRIORITY.includes(body.priority)) {
    return res.status(400).json({
      success: false,
      message: `priority şunlardan biri olmalı: ${VALID_PRIORITY.join(', ')}`
    });
  }
 
  if (isNaN(Date.parse(body.dueDate))) {
    return res.status(400).json({
      success: false,
      message: 'dueDate geçerli bir tarih olmalı (örn. 2026-11-10)'
    });
  }
 
  const newTask = {
    id: nextId++,
    title: body.title.trim(),
    description: body.description.trim(),
    assignedTo: body.assignedTo.trim(),
    project: body.project.trim(),
    status: body.status || 'todo',
    priority: body.priority || 'medium',
    createdAt: new Date().toISOString(),
    dueDate: body.dueDate
  };
 
  tasks.push(newTask);
  res.status(201).json({ success: true, data: newTask });
});
 

router.patch('/:id',validateTaskUpdate, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ success: false, message: 'id sayı olmalıdır.' });
  }
 
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ success: false, message: 'Görev bulunamadı.' });
  }
 
  const body = req.body || {};
 
  if (body.status !== undefined) {
    if (!VALID_STATUS.includes(body.status)) {
      return res.status(400).json({ success: false, message: 'Geçersiz status' });
    }
    task.status = body.status;
  }
 
  if (body.priority !== undefined) {
    if (!VALID_PRIORITY.includes(body.priority)) {
      return res.status(400).json({ success: false, message: 'Geçersiz priority' });
    }
    task.priority = body.priority;
  }
 
  if (body.dueDate !== undefined) {
    if (isNaN(Date.parse(body.dueDate))) {
      return res.status(400).json({ success: false, message: 'Geçersiz dueDate' });
    }
    task.dueDate = body.dueDate;
  }
 
  if (typeof body.title === 'string' && body.title.trim()) task.title = body.title.trim();
  if (typeof body.description === 'string' && body.description.trim()) task.description = body.description.trim();
  if (typeof body.assignedTo === 'string' && body.assignedTo.trim()) task.assignedTo = body.assignedTo.trim();
  if (typeof body.project === 'string' && body.project.trim()) task.project = body.project.trim();
 
  res.json({ success: true, data: task });
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ success: false, message: 'id sayı olmalıdır.' });
  }
 
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Görev bulunamadı.' });
  }
 
  tasks.splice(index, 1);
  res.json({ success: true, message: 'Görev silindi.' });
});
 
module.exports = router;