"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var pg_1 = require("pg");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var app = express_1.default();
app.use(express_1.default.json());
// PostgreSQL connection configuration
var pool = new pg_1.Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
});
// User registration endpoint
app.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, existingUser, hashedPassword, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, pool.query('SELECT * FROM users WHERE username = $1', [username])];
            case 1:
                existingUser = _b.sent();
                if (existingUser.rows.length > 0) {
                    return [2 /*return*/, res.status(400).json({ error: 'Username already exists' })];
                }
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 2:
                hashedPassword = _b.sent();
                // Insert the new user into the database
                return [4 /*yield*/, pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword])];
            case 3:
                // Insert the new user into the database
                _b.sent();
                res.status(201).json({ message: 'User registered successfully' });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.error('Error registering user:', error_1);
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// User login endpoint
app.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, passwordMatch, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, pool.query('SELECT * FROM users WHERE username = $1', [username])];
            case 1:
                user = _b.sent();
                if (user.rows.length === 0) {
                    return [2 /*return*/, res.status(401).json({ error: 'Invalid username or password' })];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.rows[0].password)];
            case 2:
                passwordMatch = _b.sent();
                if (!passwordMatch) {
                    return [2 /*return*/, res.status(401).json({ error: 'Invalid username or password' })];
                }
                token = jsonwebtoken_1.default.sign({ userId: user.rows[0].id }, 'your_secret_key', { expiresIn: '1h' });
                res.status(200).json({ token: token });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error('Error logging in:', error_2);
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/', function (req, res) {
    res.json({ message: 'Welcome to the Syntron Authentication API' });
});
// Protected route example
app.get('/protected', authenticateToken, function (req, res) {
    res.json({ message: 'Access granted to protected route' });
});
// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
    var authHeader = req.headers['authorization'];
    var token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({ error: 'No token provided' });
    }
    jsonwebtoken_1.default.verify(token, 'your_secret_key', function (err, user) {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}
// Start the server
app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
