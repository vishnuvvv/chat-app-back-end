import cloudinary from "cloudinary"
import {CloudinaryStorage} from "multer-storage-cloudinary"

//const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "chat-app",
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
})

export default {cloudinary,storage}



