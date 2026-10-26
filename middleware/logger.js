const logger = (req, res, next) => {
  const method = req.method; // GET, POST, PATCH, DELETE...
  const url = req.originalUrl; // istek yolu (query string dahil)
  const ip = req.ip || req.connection.remoteAddress; // istek atanın IP adresi
  console.log(`[${new Date().toISOString()}] ${method} ${url} - ${ip}`);
  next();
};
 
module.exports = logger; // Dosyayı dışarıda kullanmak için