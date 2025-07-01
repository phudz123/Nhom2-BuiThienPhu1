const fs = require('fs');
const path = require('path');
const encryption = require('../services/encryptionService');

const usersFile = path.join(__dirname, '../models/users.json');
const logFile = path.join(__dirname, '../logs/access.log');
if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, '[]');
if (!fs.existsSync(logFile)) fs.writeFileSync(logFile, '');

function logAccess(user, action) {
  const time = new Date().toISOString();
  fs.appendFileSync(logFile, `[${time}] ${user}: ${action}\n`);
}

exports.register = (req, res) => {
  const { name, cccd, address, bank, password } = req.body;
  // Kiểm tra dữ liệu đầu vào
  if (!name || !cccd || !address || !bank || !password) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin!' });
  }
  const user = {
    name,
    cccd: encryption.encryptTripleDES(cccd),
    address: encryption.encryptAES(address),
    bank: encryption.encryptAES(bank),
    password 
  };
  const users = JSON.parse(fs.readFileSync(usersFile));
  users.push(user);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  logAccess(name, 'Đăng ký');
  res.json({ message: 'Đăng ký thành công!' });
};

exports.login = (req, res) => {
  const { name, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFile));
  const user = users.find(u => u.name === name && u.password === password);
  if (!user) return res.status(401).json({ error: 'Sai thông tin đăng nhập' });
  // Giải mã
  const result = {
    name: user.name,
    cccd: encryption.decryptTripleDES(user.cccd),
    address: encryption.decryptAES(user.address),
    bank: encryption.decryptAES(user.bank)
  };
  logAccess(name, 'Đăng nhập xem thông tin cá nhân');
  res.json(result);
};

exports.listUsers = (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFile));
  // Ẩn thông tin nhạy cảm
  const safeUsers = users.map(u => ({
    name: u.name,
    cccd: '***',
    address: '***',
    bank: '***'
  }));
  res.json(safeUsers);
};

exports.adminDetail = (req, res) => {
  const { name, adminPass } = req.body;
  if (adminPass !== 'admin123') return res.status(403).json({ error: 'Sai mật khẩu admin' });
  const users = JSON.parse(fs.readFileSync(usersFile));
  const user = users.find(u => u.name === name);
  if (!user) return res.status(404).json({ error: 'Không tìm thấy user' });
  const result = {
    name: user.name,
    cccd: encryption.decryptTripleDES(user.cccd),
    address: encryption.decryptAES(user.address),
    bank: encryption.decryptAES(user.bank)
  };
  logAccess('ADMIN', `Xem chi tiết user ${name}`);
  res.json(result);
};

exports.getLogs = (req, res) => {
  const logs = fs.readFileSync(logFile, 'utf8');
  res.send(logs);
};
exports.updateUser = (req, res) => {
  const { name, password, cccd, address, bank } = req.body;
  if (!name || !password || !cccd || !address || !bank) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin!' });
  }
  const users = JSON.parse(fs.readFileSync(usersFile));
  const idx = users.findIndex(u => u.name === name && u.password === password);
  if (idx === -1) return res.status(404).json({ message: 'Không tìm thấy người dùng hoặc sai mật khẩu!' });
  users[idx] = {
    name,
    cccd: encryption.encryptTripleDES(cccd),
    address: encryption.encryptAES(address),
    bank: encryption.encryptAES(bank),
    password
  };
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  logAccess(name, 'Sửa thông tin cá nhân');
  res.json({ message: 'Cập nhật thành công!' });
};

exports.deleteUser = (req, res) => {
  const { name, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFile));
  const idx = users.findIndex(u => u.name === name && u.password === password);
  if (idx === -1) return res.status(404).json({ message: 'Không tìm thấy người dùng hoặc sai mật khẩu!' });
  users.splice(idx, 1);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  logAccess(name, 'Xóa tài khoản');
  res.json({ message: 'Xóa tài khoản thành công!' });
};