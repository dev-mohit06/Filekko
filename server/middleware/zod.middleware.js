import ApiResponse from '../utils/api-response.util.js';

class ValidationMiddleware {
    /**
     * Creates an instance of ValidationMiddleware
     * @param {Object} options Configuration options for the validator
     * @param {boolean} options.stripUnknown Remove unknown fields from the validated data
     */
    constructor(options = { stripUnknown: false }) {
        this.options = options;
    }

    /**
     * Validates the request body against the provided schema
     * @param {Object} schema Zod schema to validate against
     * @param {Object} options Override options for this specific validation
     * @returns {Function} Express middleware function
     */
    validate(schema, options = {}) {
        const validationOptions = { ...this.options, ...options };

        return async (req, res, next) => {
            try {
                const validatedData = await schema.parseAsync(req.body);

                if (validationOptions.stripUnknown) {
                    req.body = validatedData;
                }

                next();
            } catch (err) {
                // console.log(err);
                const errorMessage = Array.isArray(err.errors) && err.errors.length > 0
                    ? err.errors[0].message
                    : 'Validation failed';

                return res.status(400).json(new ApiResponse({
                    status: false,
                    message: errorMessage,
                    data : null
                }));
            }
        };
    }

    /**
     * Validates query parameters
     * @param {Object} schema Zod schema for query parameters
     * @returns {Function} Express middleware function
     */
    validateQuery(schema) {
        return async (req, res, next) => {
            try {
                const validatedQuery = await schema.parse(req.query);
                req.query = validatedQuery;
                next();
            } catch (err) {
                return res.status(400).json(new ApiResponse(
                    {
                    status: false,
                    message: Array.isArray(err.errors) && err.errors.length > 0
                        ? err.errors[0].message
                        : 'Invalid query parameters'
                    }
                ));
            }
        };
    }
}

export default ValidationMiddleware;