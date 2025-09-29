export function authMiddleware(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: "Não autorizado. Faça login." });
  }
  next();
}

export function validateEmail(email_usuario) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email_usuario);
}

export function validatePassword(senha_usuario) {
  if (senha_usuario.length < 8) {
    return false;
  }
  return true;
}
