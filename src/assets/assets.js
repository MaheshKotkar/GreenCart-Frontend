const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
export const backendUrl = isLocalhost
    ? 'http://localhost:5000/api'
    : 'https://greencart-backend-1-pa45.onrender.com/api';
export const backendBaseUrl = backendUrl.replace('/api', '');

export const getImageUrl = (image) => {
    if (!image) return '';
    // If the image is a data URI, blob URI, or external URL, return as is
    if (image.startsWith('data:') || image.startsWith('blob:') || (image.startsWith('http') && !image.includes('localhost'))) {
        return image;
    }
    // If it's a bundled asset (from frontend build) AND NOT a raw source path, return as is
    if (image.includes('/assets/') && !image.includes('/src/assets/')) {
        return image;
    }

    // Redirect seeded data (raw source paths) to backend uploads
    if (image.includes('/src/assets/')) {
        const filename = image.split('/').pop();
        return `${backendBaseUrl}/uploads/${filename}`;
    }

    // If it's a localhost URL, replace with backend base URL
    if (image.includes('localhost')) {
        return image.replace(/http:\/\/localhost:\d+/, backendBaseUrl);
    }
    // If it's a relative path, prepend backend base URL
    // Remove leading slash if present to avoid double slashes
    const cleanPath = image.startsWith('/') ? image.slice(1) : image;
    return `${backendBaseUrl}/${cleanPath}`;
};

export const currency = '$';
