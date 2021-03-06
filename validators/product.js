const { check, validationResult } = require("express-validator");

exports.validateProduct = [
  [
    check("title").notEmpty().withMessage("Title is required"),
    check("description").notEmpty().withMessage("Description is required"),
    check("price").notEmpty().withMessage("Price is required"),
  ],
];

exports.validationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
