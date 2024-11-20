import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

class BcryptUtil {
    static async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }

    static async comparePassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }
}

export default BcryptUtil;