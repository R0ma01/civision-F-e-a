import jwt from 'jsonwebtoken';
import { jwtVerify } from 'jose';

const { JWT_SECRET, JWT_SECRET_ADMIN } = process.env;

export function generateToken(payload, expiresIn) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function generateAdminToken(payload, expiresIn) {
    return jwt.sign(payload, JWT_SECRET_ADMIN, { expiresIn });
}

export async function verifyToken(token) {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        return payload;
    } catch (err) {
        console.error('Token verification error:', err);
        return null;
    }
}

export async function decodeToken(token) {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        // Verify and decode the token
        const { payload } = await jwtVerify(token, secret);

        // Assuming `userId` is stored in the payload
        if (payload && typeof payload.userId === 'string') {
            return payload.userId;
        } else {
            console.error('Token payload does not contain a valid userId.');
            return null;
        }
    } catch (err) {
        console.error('Token verification error:', err);
        return null;
    }
}

export async function verifyAdminToken(token) {
    try {
        console.log(
            'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
        );
        console.log(token);
        const secret = new TextEncoder().encode(process.env.JWT_SECRET_ADMIN);
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (err) {
        console.error('Token verification error:', err);
        return null;
    }
}
