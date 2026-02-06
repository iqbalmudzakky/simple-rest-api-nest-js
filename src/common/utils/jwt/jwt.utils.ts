import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export function signToken(payload: object, secret: string) {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
}

export function verifyToken(token: string, secret: string) {
  return jwt.verify(token, secret);
}
