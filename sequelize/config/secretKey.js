module.exports = {
  secretKey: process.env.JWT_SECRET_KEY || 'secret',
  option: {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d'
  }
}