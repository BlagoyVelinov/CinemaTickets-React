export default class ImageService {
    static imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
    static imgbbBaseUrl = import.meta.env.VITE_IMGBB_BASE_URL;
    static backendBaseUrl = import.meta.env.VITE_CINEMA_AZURE_BASE_URL || import.meta.env.VITE_CINEMA_BASE_URL;

    static async uploadImageToImgBB(file) {
        try {
            const formData = new FormData();
            formData.append("image", file);

            const isDev = import.meta.env.DEV;
            const uploadUrl = isDev 
                ? `/imgbb/upload?key=${this.imgbbApiKey}`
                : `${this.imgbbBaseUrl}?key=${this.imgbbApiKey}`;

            const response = await fetch(uploadUrl, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                console.error("ImgBB upload failed with status:", response.status);
                return null;
            }

            const json = await response.json();

            if (!json?.success || !json?.data?.url) {
                console.error("Upload failed:", json?.data?.error);
                return null;
            }

            return {
                url: json.data.url,
                deleteUrl: json.data.delete_url || null,
            };
        } catch (error) {
            console.error("ImgBB upload threw error:", error);
            return null;
        }
    }

    static async deleteImageFromImgBB(deleteUrl) {
        if (!deleteUrl) return; 

        try {
            const response = await fetch(deleteUrl, {
                method: "GET",
            });

            if (!response.ok) {
                console.error("Failed to delete old image:", await response.text());
            }
        } catch (error) {
            console.error("ImgBB delete threw error:", error);
        }
    }

    static async saveImageDataToBackend(userId, imageUrl) {
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await fetch(`${this.backendBaseUrl}/users/user/${userId}/profile-image`, {
                method: "PUT",
                headers: {
                    "Content-Type": "text/plain",
                    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
                },
                body: imageUrl,
            });

            if (!response.ok) {
                console.error("Failed to save image to backend:", response.status);
                return false;
            }
            return true;
        } catch (error) {
            console.error("Backend save threw error:", error);
            return false;
        }
    }

    static async updateProfilePhoto(file, userId, previousDeleteUrl) {
        const maxSize = 2 * 1024 * 1024;
        if (file && file.size > maxSize) {
            console.error('Image size exceeds 2MB limit.');
            return null;
        }

        const result = await this.uploadImageToImgBB(file);

        if (!result) {
            return null;
        }

        const newUrl = result.url;
        const newDeleteUrl = result.deleteUrl;

        const saved = await this.saveImageDataToBackend(userId, newUrl);
        if (!saved) {
            return null;
        }

        if (previousDeleteUrl) {
            this.deleteImageFromImgBB(previousDeleteUrl).catch(() => {});
        }

        return { url: newUrl, deleteUrl: newDeleteUrl };
    }

    static async setProfilePhotoFromPreset(userId, imageUrl, previousDeleteUrl) {
        const saved = await this.saveImageDataToBackend(userId, imageUrl);
        if (!saved) return null;

        if (previousDeleteUrl) {
            this.deleteImageFromImgBB(previousDeleteUrl).catch(() => {});
        }

        return { url: imageUrl, deleteUrl: null };
    }
}