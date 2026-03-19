# Hướng dẫn chạy App trên Web Platform

## ⚠️ Vấn đề CORS trên Web

Khi chạy Flutter app trên web browser (`flutter run -d web-server` hoặc `flutter run -d chrome`), bạn sẽ gặp lỗi CORS (Cross-Origin Resource Sharing) khi gọi API OpenWeatherMap.

**Lỗi thường gặp:**
```
Exception: Network error: The connection errored: The XMLHttpRequest onError callback was called.
```

## ✅ Giải pháp

### Giải pháp 1: Chạy Chrome với CORS disabled (Khuyến nghị cho testing)

**Bước 1:** Đóng TẤT CẢ cửa sổ Chrome đang mở

**Bước 2:** Chạy lệnh sau:

```powershell
flutter run -d chrome --web-browser-flag="--disable-web-security" --web-browser-flag="--user-data-dir=C:\temp\chrome_dev" --web-browser-flag="--disable-gpu"
```

**Giải thích:**
- `--disable-web-security`: Tắt CORS check
- `--user-data-dir=C:\temp\chrome_dev`: Sử dụng profile Chrome riêng để không ảnh hưởng đến Chrome chính
- `--disable-gpu`: Tắt GPU để tránh lỗi rendering

### Giải pháp 2: Chạy trên thiết bị thật hoặc Emulator (Tốt nhất)

CORS chỉ xảy ra trên web browser. Nếu chạy trên:
- ✅ Android emulator
- ✅ iOS simulator
- ✅ Physical device (Android/iOS)
- ✅ Desktop build (Windows/macOS/Linux)

App sẽ hoạt động hoàn hảo mà không cần config gì thêm!

**Chạy trên Android emulator:**
```powershell
flutter run
```

**Chạy trên physical device:**
```powershell
# Kết nối điện thoại qua USB và bật USB debugging
flutter devices
flutter run -d <device-id>
```

### Giải pháp 3: Sử dụng CORS Proxy (Không khuyến nghị)

Các CORS proxy công cộng thường không ổn định và có giới hạn:
- ❌ `cors-anywhere.herokuapp.com` - Yêu cầu request access
- ❌ `corsproxy.io` - Trả về 403 Forbidden
- ❌ `allorigins.win` - Wrap response trong object, gây lỗi type

**Nếu muốn dùng cho production**, bạn cần tự setup CORS proxy server.

## 🎯 Khuyến nghị

| Mục đích | Giải pháp |
|----------|-----------|
| **Testing/Demo nhanh** | Chrome với CORS disabled |
| **Development** | Android emulator hoặc physical device |
| **Production** | Build APK/IPA cho mobile, hoặc setup CORS proxy cho web |

## 📝 Lưu ý

- ⚠️ **KHÔNG** deploy web app với `--disable-web-security` lên production
- ⚠️ Các CORS proxy công cộng không đáng tin cậy cho production
- ✅ App hoạt động hoàn hảo trên mobile/desktop mà không cần config CORS
