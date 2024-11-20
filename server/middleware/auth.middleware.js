import JWTService from '../services/jwt.service.js';
import ApiResponse from '../utils/api-response.util.js';
import asyncHandler from '../utils/async-handler.util.js';

export default asyncHandler(async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json(new ApiResponse({
            status: false,
            message: 'Unauthorized',
            data : 'No token provided'
        }));
    }
    
    const decoded = await JWTService.verify(token);
    req.user = decoded;
    next();
});