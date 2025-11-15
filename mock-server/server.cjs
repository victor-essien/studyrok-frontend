// mock-server/server.cjs
const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

//Helper to read/write db.json
const dbPath = path.join(__dirname, 'db.json');
const getDb = () => JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
const saveDb = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// Custom middleware for CORS and delay

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  //   setTimeout(() => {
  //     next();
  //   }, 500);
  next();
});

server.use(jsonServer.bodyParser);

// Custom AUTH Endpoints

//SIGNUP
server.post('/api/auth/signup', (req, res) => {
  const { email, password, name } = req.body;
  console.log('Signup request body:', req.body);
  // Validation
  if (!email || !password || !name) {
    return res.status(400).json({
      success: false,
      error: 'Email, password, and name are required',
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format',
    });
  }

  // Password validation (min 6 characters)
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      error: 'Password must be at least 6 characters',
    });
  }

  const db = getDb();

  const existingUser = db.users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(409).json({
      success: false,
      error: 'User with this email already exists',
    });
  }

  // Create new user
  const newUser = {
    id: `user-${Date.now()}`,
    email,
    name,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    tier: 'free',
    studyGoal: 30, // Default, will be updated in onboarding
    streak: 0,
    totalStudyTime: 0,
    aiRequestsUsed: 0,
    aiRequestLimit: 50,
    onboarded: false, // User hasn't completed onboarding yet
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  console.log('NEWUSER', newUser);
  // Add user to database
  db.users.push(newUser);
  saveDb(db);

  // Generate token (simulate JWT)
  const token = `mock-jwt-token-${newUser.id}`;

  // Return user data (exclude password)
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: {
      user: newUser,
      token,
    },
  });
});

// LOGIN
server.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email and password are required',
    });
  }

  const db = getDb();

  // Find user
  const user = db.users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Invalid email or password',
    });
  }

  // In a real app, you'd verify password hash
  // For mock, we'll accept any password
  console.log(`✅ Login successful for: ${email}`);

  // Generate token
  const token = `mock-jwt-token-${user.id}`;

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user,
      token,
    },
  });
});

// COMPLETE ONBOARDING
server.post('/api/auth/onboarding', (req, res) => {
  const { userId, studyObjective, educationLevel } = req.body;
  console.log('Onboarding request body:', req.body);
  if (!userId) {
    return res.status(400).json({
      success: false,
      error: 'User ID is required',
    });
  }

  const db = getDb();

  // Find user
  const userIndex = db.users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'User not found',
    });
  }

  // Update user with onboarding data
  db.users[userIndex] = {
    ...db.users[userIndex],
    studyObjective: studyObjective,
    educationLevel: educationLevel || '',
    onboarded: true,
    updatedAt: new Date().toISOString(),
  };

  saveDb(db);

  res.status(200).json({
    success: true,
    message: 'Onboarding completed successfully',
    data: {
      user: db.users[userIndex],
    },
  });
});

// GET CURRENT USER (from token)
server.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized - No token provided',
    });
  }

  const token = authHeader.split(' ')[1];

  // Extract user ID from mock token
  const userId = token.replace('mock-jwt-token-', '');

  const db = getDb();
  const user = db.users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found',
    });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// LOGOUT
server.post('/api/auth/logout', (req, res) => {
  // In a real app, you'd invalidate the token
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

// CUSTOM Routes

server.use(
  jsonServer.rewriter({
    '/api/auth/me': '/users/user-1',
    '/api/boards*': '/boards$1',
    '/api/boards/:id/notes': '/notes?studyBoardId=:id',
    '/api/boards/:id/flashcards': '/flashcards?studyBoardId=:id',
    '/api/boards/:id/quizzes': '/quizzes?studyBoardId=:id',
    '/api/notes/:id/flashcards': '/flashcards?studyNoteId=:id',
    '/api/flashcards/due-for-review': '/flashcards?_sort=nextReviewDate&_order=asc&_limit=10',
    '/api/analytics/overview': '/analytics',
    '/api/*': '/$1',
  })
);

server.use(middlewares);
server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════╗');
  console.log('║   🚀 StudyRok Mock API Server Running     ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log('');
  console.log(`📍 Server:     http://localhost:${PORT}`);
  console.log(`📊 API:        http://localhost:${PORT}/api`);
  console.log('');
  console.log('🔐 Auth endpoints:');
  console.log('  • POST   /api/auth/signup');
  console.log('  • POST   /api/auth/login');
  console.log('  • POST   /api/auth/onboarding');
  console.log('  • GET    /api/auth/me');
  console.log('  • POST   /api/auth/logout');
  console.log('');
  console.log('📚 Data endpoints:');
  console.log('  • GET    /api/boards');
  console.log('  • GET    /api/notes');
  console.log('  • GET    /api/flashcards');
  console.log('');
});
