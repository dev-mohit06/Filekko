import multer from "multer";
import path from "path";
import fs from "fs";

class FileUploadService {
    constructor() {

        this.avatarStoragePath = 'public/uploads/avatars';
        this.resourceStoragePath = 'public/uploads/resources';

        // Create upload directories if they don't exist
        this.createDirectoryIfNotExists(this.avatarStoragePath);
        this.createDirectoryIfNotExists(this.resourceStoragePath);
        
        // Configure storage for avatars
        this.avatarStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, this.avatarStoragePath);
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
            }
        });

        // Configure storage for resources
        this.resourceStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, this.avatarStoragePath);
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, 'resource-' + uniqueSuffix + path.extname(file.originalname));
            }
        });

        // File filter for avatars (images only)
        this.avatarFilter = (req, file, cb) => {
            const allowedTypes = /jpeg|jpg|png|gif/;
            const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
            const mimetype = allowedTypes.test(file.mimetype);

            if (extname && mimetype) {
                cb(null, true);
            } else {
                cb(new Error('Only image files are allowed for avatars!'), false);
            }
        };

        // File filter for resources (common file types)
        this.resourceFilter = (req, file, cb) => {
            const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|xls|xlsx|zip|rar/;
            const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

            if (extname) {
                cb(null, true);
            } else {
                cb(new Error('Invalid file type!'), false);
            }
        };

        // Initialize multer instances
        this.uploadAvatar = multer({
            storage: this.avatarStorage,
            fileFilter: this.avatarFilter,
            limits: {
                fileSize: 5 * 1024 * 1024 // 5MB limit for avatars
            }
        });

        this.uploadResource = multer({
            storage: this.resourceStorage,
            fileFilter: this.resourceFilter,
            limits: {
                fileSize: 50 * 1024 * 1024 // 50MB limit for resources
            }
        });
    }

    // Helper method to create directories
    createDirectoryIfNotExists(dirPath) {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }

    // Method to handle avatar upload
    handleAvatarUpload() {
        return this.uploadAvatar.single('avatar');
    }

    // Method to handle resource upload (multiple files)
    handleResourceUpload() {
        return this.uploadResource.array('resources', 10);
    }

    // Method to get the avatar storage path
    getUploadedAvatarUrl(req) {
        return `${req.protocol}://${req.get('host')}/uploads/avatars/${req.file.filename}`;
    }
}

export default new FileUploadService();