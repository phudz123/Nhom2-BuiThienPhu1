# 🌤️ WeatherNow - Ứng dụng Dự báo Thời tiết

## 📋 HƯỚNG DẪN SETUP VÀ CHẠY APP

### Bước 1: Lấy OpenWeatherMap API Key

1. Truy cập: https://openweathermap.org/api
2. Nhấn "Sign Up" để tạo tài khoản miễn phí
3. Sau khi đăng nhập, vào "API keys" tab
4. Copy API key của bạn (có dạng: `a1b2c3d4e5f6...`)
5. Mở file `lib/services/weather_api_service.dart`
6. Tìm dòng: `static const String _apiKey = 'YOUR_API_KEY_HERE';`
7. Thay `YOUR_API_KEY_HERE` bằng API key của bạn

### Bước 2: Cài đặt Dependencies

```bash
cd c:\Users\develop\Laptrinhmobile\flutterfirebase
flutter pub get
```

### Bước 3: Chạy App

```bash
flutter run
```

## ✨ TÍNH NĂNG ĐÃ HOÀN THÀNH

### ✅ Yêu cầu Kỹ thuật (40%)
- **SQLite (sqflite)**: 3 bảng (cities, weather_cache, search_history)
- **SharedPreferences**: Lưu theme, ngôn ngữ, đơn vị đo
- **Provider**: 4 providers (City, Weather, Theme, Locale)
- **MVVM Architecture**: models/, services/, providers/, screens/, widgets/

### ✅ Yêu cầu Nghiệp vụ - Full CRUD (40%)
1. **CREATE**: SearchScreen với validation + debounce + duplicate check
2. **READ**: HomeScreen list + DetailScreen chi tiết + forecast 7 ngày
3. **UPDATE**: Pull-to-refresh weather data + cache mechanism
4. **DELETE**: Swipe-to-delete + AlertDialog confirm + Undo trong 3s

### ✅ Yêu cầu Giao diện (20%)
- **5 màn hình**: Splash, Home, Search, Detail, Settings
- **Material Design 3**: Dark/Light theme
- **Google Fonts**: Poppins
- **Loading indicators**: CircularProgressIndicator, Shimmer (ready)
- **Responsive**: Không overflow

### ✅ Tính năng Nâng cao (Điểm cộng)
- **Đa ngôn ngữ**: English + Tiếng Việt (flutter_localizations)
- **Charts**: fl_chart LineChart với gradient area fill
- **Animations**: Hero animation, Fade transitions
- **Unit conversion**: °C/°F, km/h/m/s/mph
- **Cache mechanism**: 30 phút validity
- **Recent searches**: Lưu lịch sử 10 tìm kiếm gần nhất

## 📁 CẤU TRÚC DỰ ÁN

```
lib/
├── main.dart                      # Entry point với MultiProvider
├── models/                        # Data models
│   ├── city_model.dart
│   ├── weather_model.dart
│   └── forecast_model.dart
├── services/                      # Business logic
│   ├── database_helper.dart       # SQLite CRUD
│   ├── preferences_service.dart   # SharedPreferences
│   └── weather_api_service.dart   # OpenWeatherMap API
├── providers/                     # State management
│   ├── city_provider.dart
│   ├── weather_provider.dart
│   ├── theme_provider.dart
│   └── locale_provider.dart
├── screens/                       # UI screens
│   ├── splash_screen.dart
│   ├── home_screen.dart           # CRUD: Read, Delete
│   ├── search_screen.dart         # CRUD: Create
│   ├── detail_screen.dart         # CRUD: Update, Delete
│   └── settings_screen.dart
├── widgets/                       # Reusable components
│   ├── city_card.dart
│   ├── weather_metric_card.dart
│   └── forecast_item.dart
└── l10n/                          # Localization
    ├── app_en.arb                 # English
    └── app_vi.arb                 # Tiếng Việt
```

## 🎮 CÁCH SỬ DỤNG APP

1. **Splash Screen**: App khởi động với animation
2. **Home Screen**: 
   - Xem danh sách thành phố yêu thích
   - Swipe sang trái để xóa (có confirm dialog)
   - Kéo xuống để refresh thời tiết
   - Nhấn + để thêm thành phố mới
3. **Search Screen**: 
   - Gõ tên thành phố (tự động search sau 500ms)
   - Xem recent searches
   - Nhấn "Add to Favorites" để thêm
4. **Detail Screen**: 
   - Xem chi tiết thời tiết
   - Biểu đồ nhiệt độ 24h
   - Dự báo 7 ngày
   - Nhấn delete icon để xóa
5. **Settings**: 
   - Bật/tắt Dark Mode
   - Chọn ngôn ngữ (English/Tiếng Việt)
   - Đổi đơn vị nhiệt độ (°C/°F)
   - Xóa cache/history

## 🔥 DEMO VALIDATION

### Form Validation (SearchScreen)
- Không được để trống → "Please enter city name"
- Tối thiểu 2 ký tự → "City name must be at least 2 characters"
- Kiểm tra trùng lặp → "City already exists in your list"

### AlertDialog Confirm (HomeScreen, DetailScreen)
- Trước khi xóa: "Are you sure you want to remove [City]?"
- 2 buttons: Cancel, Delete (màu đỏ)

### Undo Delete (HomeScreen)
- Sau khi xóa → SnackBar "City removed" với button "Undo"
- Nhấn Undo trong 3s để khôi phục

## 📊 SO SÁNH VỚI YÊU CẦU ĐỀ BÀI

| Yêu cầu | Đạt được | Ghi chú |
|---------|----------|---------|
| SQLite (sqflite) | ✅ | 3 bảng với CRUD đầy đủ |
| SharedPreferences | ✅ | 5 settings |
| Provider | ✅ | 4 providers |
| CRUD đầy đủ | ✅ | Create, Read, Update, Delete |
| Validation | ✅ | Form validation + duplicate check |
| AlertDialog | ✅ | Confirm delete |
| 4+ màn hình | ✅ | 5 màn hình |
| Material Design | ✅ | Material Design 3 |
| Loading indicator | ✅ | CircularProgressIndicator |
| **Điểm cộng** | | |
| Charts | ✅ | fl_chart LineChart |
| Animation | ✅ | Hero, Fade |
| Đa ngôn ngữ | ✅ | English + Tiếng Việt |

## 🚀 BUILD & TEST

### Test trên Emulator/Device
```bash
flutter run
```

### Build APK (Android)
```bash
flutter build apk --release
```

### Build Bundle (Android)
```bash
flutter build appbundle --release
```

## ⚠️ LƯU Ý

1. **API Key bắt buộc**: Phải thay YOUR_API_KEY_HERE trong `weather_api_service.dart`
2. **Internet required**: App cần internet để fetch weather data
3. **Cache**: Weather data được cache 30 phút
4. **Firebase** (Optional): Đã cài firebase packages nhưng chưa setup để làm điểm cộng thêm

## 📝 BÁOCÁO BÀI TẬP LỚN

### CHƯƠNG 1: TỔNG QUAN
- **Lý do chọn đề tài**: Quản lý dự báo thời tiết cho nhiều thành phố
- **Mục tiêu**: CRUD app với SQLite, API integration, đa ngôn ngữ
- **Công cụ**: Flutter, Dart, sqflite, provider, OpenWeatherMap API

### CHƯƠNG 2: THIẾT KẾ HỆ THỐNG
- **Database schema**: 3 bảng (cities, weather_cache, search_history)
- **Architecture**: MVVM pattern
- **API**: OpenWeatherMap (current weather, forecast, geocoding)

### CHƯƠNG 3: CÀI ĐẶT
- **Packages**: sqflite, provider, dio, fl_chart, google_fonts...
- **Code**: DatabaseHelper, Providers, Services, Screens
- **Validation**: Form validation, duplicate check, confirm dialogs

### CHƯƠNG 4: GIAO DIỆN & KẾT QUẢ
- **Screenshots**: 5 màn hình
- **Features**: Dark mode, bilingual, charts, animations

### CHƯƠNG 5: KẾT LUẬN
- **Ưu điểm**: Full CRUD, đa ngôn ngữ, charts, responsive
- **Hạn chế**: Cần API key, cần internet
- **Hướng phát triển**: Firebase sync, notifications, widgets

## 🎯 ĐIỂM MẠNH CỦA APP

1. ✅ **Đầy đủ CRUD** với validation và error handling
2. ✅ **Đa ngôn ngữ** hoàn chỉnh (English/Tiếng Việt)
3. ✅ **UX tuyệt vời**: Swipe-to-delete, Undo, Pull-to-refresh
4. ✅ **Charts**: Biểu đồ nhiệt độ đẹp mắt
5. ✅ **Cache**: Tối ưu API calls
6. ✅ **Dark mode**: Tự động theo system hoặc manual
7. ✅ **Clean code**: MVVM architecture, well-organized

---

**Chúc bạn làm bài tập lớn thành công! 🎉**
