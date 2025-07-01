# Nhom2-BuiTHienPhu
Bảo Mật Thông Tin Cá Nhân - Mã Hóa Đối Xứng (Triple DES & AES)
Giới thiệu
Đồ án xây dựng hệ thống quản lý thông tin cá nhân, áp dụng các thuật toán mã hóa đối xứng (Triple DES và AES) để bảo vệ dữ liệu nhạy cảm như CCCD, địa chỉ, số tài khoản. Hệ thống cho phép đăng ký, đăng nhập, sửa, xóa tài khoản, đồng thời ghi log truy cập để kiểm soát hoạt động.

Công nghệ sử dụng
Node.js (Express)
Triple DES và AES (thư viện crypto)
Lưu trữ dữ liệu bằng file JSON
Chức năng chính
Đăng ký tài khoản: Mã hóa thông tin nhạy cảm trước khi lưu.
Đăng nhập: Giải mã và hiển thị thông tin cá nhân.
Sửa/Xóa thông tin: Người dùng có thể cập nhật hoặc xóa tài khoản của mình.
Quản trị: Xem danh sách, chi tiết user và log truy cập (qua admin.html).
Ghi log: Lưu lại mọi thao tác đăng ký, đăng nhập, sửa, xóa, truy vấn dữ liệu.
Hướng dẫn sử dụng
1. Cài đặt
npm install
2. Chạy ứng dụng
npm start
Truy cập http://localhost:3000 trên trình duyệt.

3. Đăng nhập/Đăng ký
Đăng ký tài khoản mới tại giao diện chính.
Đăng nhập để xem, sửa, xóa thông tin cá nhân.
Để truy cập trang quản trị, chọn "Quản trị" và nhập mật khẩu admin (admin123).
4. Cấu trúc mã hóa
CCCD: Mã hóa bằng Triple DES.
Địa chỉ, Số tài khoản: Mã hóa bằng AES (kèm IV).
Mật khẩu: (Hiện tại lưu plain text, nên hash khi phát triển thực tế).
Lưu ý bảo mật & hướng phát triển
Không dùng file JSON cho hệ thống lớn – nên chuyển sang CSDL như MySQL/MongoDB.
Cần hash mật khẩu trước khi lưu.
Nên bổ sung xác thực đa yếu tố, kiểm tra toàn vẹn dữ liệu, phân quyền rõ ràng.
Tối ưu giao diện cho trải nghiệm người dùng tốt hơn.
