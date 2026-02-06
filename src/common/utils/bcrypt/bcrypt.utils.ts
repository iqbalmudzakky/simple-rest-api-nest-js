import * as bcrypt from 'bcryptjs';

export function hashPassword(raw: string): string {
  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
  return bcrypt.hashSync(raw, saltRounds);
}

export function comparePassword(raw: string, hashed: string): boolean {
  return bcrypt.compareSync(raw, hashed);
}
