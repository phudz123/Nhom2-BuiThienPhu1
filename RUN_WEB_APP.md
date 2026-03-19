# 🌐 Hướng dẫn chạy App trên Web Platform

## ⚠️ Vấn đề CORS

Khi chạy Flutter app trên web (`flutter run -d web-server`), bạn sẽ gặp lỗi CORS khi gọi API OpenWeatherMap.

## ✅ Giải pháp: Sử dụng Local Proxy Server

Tôi đã tạo một proxy server đơn giản để bypass CORS. Làm theo các bước sau:

### Bước 1: Mở Terminal thứ nhất - Chạy Proxy Server

```powershell
cd c:\Users\develop\Laptrinhmobile\flutterfirebase
dart run proxy_server.dart
```

**Kết quả:** Bạn sẽ thấy:
```
🚀 CORS Proxy Server running on http://localhost:8080
📝 Use this proxy to bypass CORS when running flutter web app
```

⚠️ **GIỮ terminal này chạy, KHÔNG đóng!**

### Bước 2: Mở Terminal thứ hai - Chạy Flutter App

```powershell
cd c:\Users\develop\Laptrinhmobile\flutterfirebase
flutter run -d web-server
```

**Kết quả:** App sẽ chạy trên `http://localhost:xxxxx`

### Bước 3: Mở trình duyệt và test

1. Mở trình duyệt (Chrome, Edge, Firefox...)
2. Truy cập URL mà Flutter hiển thị (ví dụ: `http://localhost:63417`)
3. Thử tìm kiếm "Hà Nội" - sẽ hoạt động bình thường! ✅

## 📝 Lưu ý

- ✅ Bạn cần **2 terminal** chạy đồng thời:
  - Terminal 1: Proxy server (`dart run proxy_server.dart`)
  - Terminal 2: Flutter app (`flutter run -d web-server`)
  
- ✅ Proxy server phải chạy **TRƯỚC** khi chạy Flutter app

- ✅ Nếu gặp lỗi "port already in use", tắt proxy server cũ và chạy lại

## 🎯 Cách hoạt động

```
Flutter Web App (localhost:xxxxx)
    ↓
Local Proxy Server (localhost:8080)
    ↓
OpenWeatherMap API (api.openweathermap.org)
```

Proxy server sẽ:
1. Nhận request từ Flutter app
2. Forward request đến OpenWeatherMap API
3. Thêm CORS headers vào response
4. Trả về cho Flutter app

## 🚀 Alternative: Chạy trên Mobile (Không cần proxy)

Nếu bạn không muốn dùng proxy, chạy trên Android/iOS:

```powershell
flutter run
```

App sẽ chạy trên emulator/physical device mà **KHÔNG** gặp lỗi CORS!
