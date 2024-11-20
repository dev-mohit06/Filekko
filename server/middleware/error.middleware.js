import ApiResponse from '../utils/api-response.util.js';

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json(new ApiResponse({
        status: false,
        message: err.message,
        data: err.stack
    }));
};

export default errorHandler;