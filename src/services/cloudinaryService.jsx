// GANTI baris di bawah ini sesuai punyamu di dashboard Cloudinary:
// - CLOUD_NAME: lihat di Dashboard > "Product Environment Credentials"
// - UPLOAD_PRESET: nama preset yang sudah kamu buat ("RESOURCES")
const CLOUD_NAME = "ln8bqdtw";
const UPLOAD_PRESET = "RESOURCES";

// resource_type "auto" otomatis mendeteksi image vs raw (pdf/doc/ppt).
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

// Upload file ke Cloudinary dengan progress tracking.
// Pakai XMLHttpRequest (bukan fetch) karena fetch belum punya
// event upload-progress yang didukung luas di browser.
// Resolusinya berupa { url, publicId, resourceType }.
export function uploadToCloudinary(file, onProgress) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", UPLOAD_URL);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const pct = Math.round((event.loaded / event.total) * 100);
        onProgress(pct);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve({
            url: data.secure_url,
            publicId: data.public_id,
            resourceType: data.resource_type,
          });
        } catch (err) {
          reject(err);
        }
      } else {
        reject(new Error(`Upload gagal (status ${xhr.status}): ${xhr.responseText}`));
      }
    };

    xhr.onerror = () => reject(new Error("Upload gagal. Cek koneksi internet kamu."));

    xhr.send(formData);
  });
}