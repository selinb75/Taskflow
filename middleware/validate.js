const VALID_STATUS = ['todo', 'in-progress', 'completed'];
const VALID_PRIORITY = ['low', 'medium', 'high'];

const hata = (res, message) => res.status(400).json({ success: false, message });

// POST /api/tasks için doğrulama
const validateTask = (req, res, next) => {
  const body = req.body || {};

  const required = ['title', 'description', 'assignedTo', 'project', 'dueDate'];
  const missing = required.filter(
    (field) => typeof body[field] !== 'string' || body[field].trim() === ''
  );
  if (missing.length > 0) {
    return hata(res, `Eksik veya geçersiz alan(lar): ${missing.join(', ')}`);
  }

  if (body.status !== undefined && !VALID_STATUS.includes(body.status)) {
    return hata(res, `status şunlardan biri olmalı: ${VALID_STATUS.join(', ')}`);
  }

  if (body.priority !== undefined && !VALID_PRIORITY.includes(body.priority)) {
    return hata(res, `priority şunlardan biri olmalı: ${VALID_PRIORITY.join(', ')}`);
  }

  if (isNaN(Date.parse(body.dueDate))) {
    return hata(res, 'dueDate geçerli bir tarih olmalı (örn. 2026-11-10)');
  }

  next();
};

// PATCH /api/tasks/:id için doğrulama (gönderilen alanlar kontrol edilir)
const validateTaskUpdate = (req, res, next) => {
  const body = req.body || {};

  if (Object.keys(body).length === 0) {
    return hata(res, 'Güncellenecek en az bir alan gönderilmelidir.');
  }

  const textFields = ['title', 'description', 'assignedTo', 'project'];
  const invalidText = textFields.filter(
    (field) =>
      body[field] !== undefined &&
      (typeof body[field] !== 'string' || body[field].trim() === '')
  );
  if (invalidText.length > 0) {
    return hata(res, `Boş veya geçersiz alan(lar): ${invalidText.join(', ')}`);
  }

  if (body.status !== undefined && !VALID_STATUS.includes(body.status)) {
    return hata(res, `status şunlardan biri olmalı: ${VALID_STATUS.join(', ')}`);
  }

  if (body.priority !== undefined && !VALID_PRIORITY.includes(body.priority)) {
    return hata(res, `priority şunlardan biri olmalı: ${VALID_PRIORITY.join(', ')}`);
  }

  if (body.dueDate !== undefined && isNaN(Date.parse(body.dueDate))) {
    return hata(res, 'dueDate geçerli bir tarih olmalı (örn. 2026-11-10)');
  }

  next();
};

module.exports = { validateTask, validateTaskUpdate };