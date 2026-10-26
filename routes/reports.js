const express = require('express');
const router = express.Router();
const { tasks } = require('../data/initialData');

// GET /api/reports/completed  -> tamamlanan görev sayısı
router.get('/completed', (req, res) => {
  const count = tasks.filter((t) => t.status === 'completed').length;
  res.json({ success: true, completed: count });
});

// GET /api/reports/pending  -> bekleyen (henüz başlanmamış) görev sayısı
router.get('/pending', (req, res) => {
  const count = tasks.filter((t) => t.status === 'todo').length;
  res.json({ success: true, pending: count });
});

// GET /api/reports/summary  -> genel sistem özeti
router.get('/summary', (req, res) => {
  const countBy = (field) =>
    tasks.reduce((acc, t) => {
      acc[t[field]] = (acc[t[field]] || 0) + 1;
      return acc;
    }, {});

  const today = new Date().toISOString().slice(0, 10);
  const overdue = tasks.filter(
    (t) => t.status !== 'completed' && t.dueDate < today
  ).length;

  res.json({
    success: true,
    total: tasks.length,
    byStatus: countBy('status'),
    byPriority: countBy('priority'),
    byProject: countBy('project'),
    byAssignee: countBy('assignedTo'),
    overdue
  });
});

module.exports = router;