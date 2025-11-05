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

export function validateCPF(cpf_usuario) {
  const cpf = cpf_usuario.replace(/\D/g, '');
  
  if (cpf.length !== 11) return false;
  
  if (/^(\d)\1+$/.test(cpf)) return false;
  
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;
  
  if (digitoVerificador1 !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;
  
  return digitoVerificador2 === parseInt(cpf.charAt(10));
}

export function cleanCPF(cpf_usuario) {
  return cpf_usuario.replace(/\D/g, '');
}

export function generateRandomPassword(length = 8) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}