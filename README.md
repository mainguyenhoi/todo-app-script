# Todo App – Google Apps Script

Ứng dụng Todo responsive, triển khai trực tiếp thành Google Apps Script Web App. Dữ liệu được lưu theo từng người dùng trong `UserProperties`, do đó mỗi tài khoản Google có danh sách riêng.

## Tính năng

- Thêm, hoàn thành, xóa công việc
- Lọc tất cả / chưa xong / đã xong
- Xóa toàn bộ việc đã hoàn thành
- Tự động lưu trên Google Apps Script

## Triển khai

1. Cài [Node.js](https://nodejs.org/) và Google Apps Script CLI: `npm install -g @google/clasp`.
2. Đăng nhập: `clasp login`.
3. Tạo một Apps Script project tại [script.google.com](https://script.google.com/home/projects/create), sau đó mở **Project Settings** và sao chép Script ID.
4. Thay `PASTE_YOUR_SCRIPT_ID_HERE` trong `.clasp.json` bằng Script ID đó.
5. Push mã nguồn: `clasp push`.
6. Trong Apps Script, chọn **Deploy → New deployment → Web app**, đặt quyền truy cập phù hợp rồi triển khai.

> Nếu cần dùng chung một danh sách Todo giữa nhiều người dùng, hãy đổi `PropertiesService.getUserProperties()` trong `Code.gs` thành `PropertiesService.getScriptProperties()`.
