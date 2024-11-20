import { Schema } from "mongoose";
import avatarService from "../../services/avatar.service.js";

const userSchema = new Schema({
    // Personal Information
    personal_info: {
        fullname: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        avatar: {
            type: String,
            default: avatarService.generateRandomAvatar(),
        },
        bio: {
            type: String,
            default: null,
        }
    },
    // Social Links
    social_links: {
        twitter: {
            type: String,
            default: null,
        },
        github: {
            type: String,
            default: null,
        },
        instagram: {
            type: String,
            default: null,
        }
    },
    // Account Information
    account_info: {
        role: {
            type: String,
            enum: ['user', 'admin', 'moderator'],
            default: 'user',
        },
        auth_type: {
            type: String,
            enum: ['password', 'google', 'github'],
            required: true,
        },
        password: {
            type: String,
            required: function () {
                return this.account_info.auth_type === 'password';
            }
        },
        google_id: {
            type: String,
            sparse: true,
            default: null,
        },
        github_id: {
            type: String,
            sparse: true,
            default: null,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            default: null,
        },
        resetPasswordToken: {
            type: String,
            default: null,
        },
        resetPasswordExpires: {
            type: Date,
            default: null,
        }
    },
    // Activity Metrics
    activity: {
        total_resource: {
            type: Number,
            default: 0,
        },
        total_views: {
            type: Number,
            default: 0,
        }
    },
}, {
    timestamps: true
});

// Indexes for better query performance
userSchema.index({ 'personal_info.username': 1 });
userSchema.index({ 'personal_info.email': 1 });
userSchema.index({ 'account_info.google_id': 1 });
userSchema.index({ 'account_info.github_id': 1 });

export default userSchema;