const Product = require("../models/product");
const fs = require("fs");
const formidable = require("formidable");

exports.create = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image could not be uploaded" });
    }
    let product = new Product(fields);

    if (files.photo) {
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product.save((err, data) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(201).json(data);
    });
  });
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }
    return res.json(product);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }
    await product.remove();
    return res.json({ message: "Product successfully deleted" });
  } catch (err) {
    console.log(err);
  }
};