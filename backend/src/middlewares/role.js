const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Anda tidak memiliki otoritas untuk mengakses tindakan ini.',
      });
    }
    next();
  };
};

module.exports = { authorizeRoles };
