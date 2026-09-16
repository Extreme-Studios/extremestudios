# Google Drive Media Setup

1. Buka Google Sheet Extreme Studios, lalu pilih **Extensions → Apps Script**.
2. Ganti isi `Code.gs` dengan `scripts/ExtremeStudiosMediaBackend.gs` dari project ini.
3. Di **Project Settings → Script properties**, tambah `MEDIA_UPLOAD_SECRET` dengan password acak yang panjang.
4. Jalankan `setupMediaStorage` sekali dan setujui akses Sheet dan Drive.
5. Pilih **Deploy → New deployment → Web app**. Jalankan sebagai akun pemilik dan aksesnya **Anyone**. Salin URL `/exec`.
6. Tambahkan tiga Environment Variables Production di Vercel: `MEDIA_APPS_SCRIPT_URL`, `MEDIA_UPLOAD_SECRET`, dan `MEDIA_ADMIN_PASSWORD`.
7. Deploy ulang Vercel. Admin upload tersedia di `/admin/media`.

Jangan masukkan password ke source code atau Google Sheet.
