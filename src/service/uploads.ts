import { apiInstance } from "./api"

export async function cloudinaryUpload(fileToUpload:any) {
    try {
        const res = await apiInstance.post('/cloudinery-upload', fileToUpload);
        return res.data
    } catch (error) {
        console.log(error);
    }
}