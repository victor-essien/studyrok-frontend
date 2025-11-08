// module.exports = (req, res, next) => {
//   // Add CORS headers
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

//   // Handle preflight
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }

//   // Add delay to simulate network (optional)
//   setTimeout(() => {
//     next();
//   }, 500);
// };


// mock-server/middleware.cjs
module.exports = (req, res, next) => {
  // Add CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  // Add delay to simulate network (optional)
  setTimeout(() => {
    next();
  }, 500);
};