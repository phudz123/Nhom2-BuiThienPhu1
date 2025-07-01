let currentUser = null;

function showLogin() {
  document.getElementById('registerBox').style.display = 'none';
  document.getElementById('loginBox').style.display = '';
  // Hiện lại nút đăng nhập khi quay về login
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) loginBtn.style.display = '';
}

function showRegister() {
  document.getElementById('registerBox').style.display = '';
  document.getElementById('loginBox').style.display = 'none';
}

async function register() {
  const data = {
    name: document.getElementById('name').value.trim(),
    cccd: document.getElementById('cccd').value.trim(),
    address: document.getElementById('address').value.trim(),
    bank: document.getElementById('bank').value.trim(),
    password: document.getElementById('password').value.trim()
  };
  // Kiểm tra dữ liệu đầu vào ở frontend
  if (!data.name || !data.cccd || !data.address || !data.bank || !data.password) {
    document.getElementById('registerMsg').textContent = 'Vui lòng nhập đầy đủ thông tin!';
    return;
  }
  const res = await fetch('/api/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  const msg = (await res.json()).message;
  document.getElementById('registerMsg').textContent = msg;
  if (msg === 'Đăng ký thành công!') {
    setTimeout(() => {
      showLogin();
      document.getElementById('loginMsg').textContent = 'Đăng ký thành công! Vui lòng đăng nhập.';
    }, 1000);
  }
}

async function login() {
  const data = {
    name: document.getElementById('loginName').value,
    password: document.getElementById('loginPassword').value
  };
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  const msg = document.getElementById('loginMsg');
  const info = document.getElementById('userInfo');
  const logoutBtn = document.getElementById('logoutBtn');
  const editBtn = document.getElementById('editBtn');
  const deleteBtn = document.getElementById('deleteBtn');
  const loginBtn = document.getElementById('loginBtn');
  if (res.ok) {
    const u = await res.json();
    msg.textContent = '';
    info.innerHTML = `<b>Họ tên:</b> ${u.name}<br>
      <b>CCCD:</b> ${u.cccd}<br>
      <b>Địa chỉ:</b> ${u.address}<br>
      <b>Số tài khoản:</b> ${u.bank}`;
    if (logoutBtn) logoutBtn.style.display = '';
    if (editBtn) editBtn.style.display = '';
    if (deleteBtn) deleteBtn.style.display = '';
    if (loginBtn) loginBtn.style.display = 'none'; // Ẩn nút đăng nhập sau khi đăng nhập thành công
    const regLink = document.getElementById('registerLink');
    if (regLink) regLink.style.display = 'none';
    currentUser = { name: u.name, password: data.password, cccd: u.cccd, address: u.address, bank: u.bank };
  } else {
    info.innerHTML = '';
    msg.textContent = (await res.json()).error;
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (editBtn) editBtn.style.display = 'none';
    if (deleteBtn) deleteBtn.style.display = 'none';
    if (loginBtn) loginBtn.style.display = '';
    // Hiện lại dòng đăng ký khi đăng nhập sai
    const regLink = document.getElementById('registerLink');
    if (regLink) regLink.style.display = '';
    currentUser = null;
  }
}

function showEditBox() {
  if (!currentUser) return;
  document.getElementById('editBox').style.display = '';
  document.getElementById('editCCCD').value = currentUser.cccd;
  document.getElementById('editAddress').value = currentUser.address;
  document.getElementById('editBank').value = currentUser.bank;
  document.getElementById('editPassword').value = '';
}
function hideEditBox() {
  document.getElementById('editBox').style.display = 'none';
  document.getElementById('editMsg').textContent = '';
}

async function updateInfo() {
  if (!currentUser) return;
  const cccd = document.getElementById('editCCCD').value.trim();
  const address = document.getElementById('editAddress').value.trim();
  const bank = document.getElementById('editBank').value.trim();
  const password = document.getElementById('editPassword').value.trim();
  if (!cccd || !address || !bank || !password) {
    document.getElementById('editMsg').textContent = 'Vui lòng nhập đầy đủ!';
    return;
  }
  const res = await fetch('/api/update', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: currentUser.name,
      password,
      cccd,
      address,
      bank
    })
  });
  const msg = (await res.json()).message;
  document.getElementById('editMsg').textContent = msg;
  if (msg === 'Cập nhật thành công!') {
    hideEditBox();
    // Cập nhật lại giao diện
    document.getElementById('userInfo').innerHTML =
      `<b>Họ tên:</b> ${currentUser.name}<br>
      <b>CCCD:</b> ${cccd}<br>
      <b>Địa chỉ:</b> ${address}<br>
      <b>Số tài khoản:</b> ${bank}`;
    currentUser.cccd = cccd;
    currentUser.address = address;
    currentUser.bank = bank;
  }
}

async function deleteAccount() {
  if (!currentUser) return;
  if (!confirm('Bạn có chắc chắn muốn xóa tài khoản?')) return;
  const password = prompt('Nhập lại mật khẩu để xác nhận xóa tài khoản:');
  if (!password) return;
  const res = await fetch('/api/delete', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ name: currentUser.name, password })
  });
  const msg = (await res.json()).message;
  alert(msg);
  if (msg === 'Xóa tài khoản thành công!') {
    logout();
  }
}

function logout() {
  document.getElementById('loginName').value = '';
  document.getElementById('loginPassword').value = '';
  document.getElementById('userInfo').innerHTML = '';
  document.getElementById('loginMsg').textContent = '';
  document.getElementById('logoutBtn').style.display = 'none';
  document.getElementById('editBtn').style.display = 'none';
  document.getElementById('deleteBtn').style.display = 'none';
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) loginBtn.style.display = ''; // Hiện lại nút đăng nhập khi đăng xuất
  hideEditBox();
  currentUser = null;
  showRegister();
}