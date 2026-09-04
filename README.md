# Timeline ảnh Google Drive – Google Apps Script

Web App hiển thị ảnh trong Google Drive của người đang đăng nhập theo dạng timeline. Người dùng chọn folder, duyệt các folder con và ảnh trực tiếp trong folder được sắp xếp từ cũ đến mới.

## Tính năng

- Duyệt folder từ Google Drive của người đang đăng nhập
- Hiển thị ảnh thành các bước trong timeline, theo ngày tạo ảnh
- Chỉ truy cập Drive của chính người dùng đã cấp quyền

## Triển khai

1. Cài [Node.js](https://nodejs.org/) và Google Apps Script CLI: `npm install -g @google/clasp`.
2. Đăng nhập: `clasp login`.
3. Tạo một Apps Script project tại [script.google.com](https://script.google.com/home/projects/create), sau đó mở **Project Settings** và sao chép Script ID.
4. Thay `PASTE_YOUR_SCRIPT_ID_HERE` trong `.clasp.json` bằng Script ID đó.
5. Push mã nguồn: `clasp push`.
6. Trong Apps Script, chọn **Deploy → New deployment → Web app**, đặt quyền truy cập phù hợp rồi triển khai.

> Nếu cần dùng chung một danh sách Todo giữa nhiều người dùng, hãy đổi `PropertiesService.getUserProperties()` trong `Code.gs` thành `PropertiesService.getScriptProperties()`.
