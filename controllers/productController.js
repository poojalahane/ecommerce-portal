import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import { MdProductionQuantityLimits } from "react-icons/md";
import categoryModal from "../models/categoryModal.js";
export const createProductController = async (req, res) => {
  try {
    const { name, description, category, price, quantity } = req.fields;
    const { photo } = req.files;

    //! validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !photo && photo.size > 1000000:
        return res.status(500).send({
          error: "photo is required.. and it should be less than 1 mb",
        });
    }
    // const existProduct = await productModel.findOne({ name: req.body.name });
    // if (existProduct) {
    //   return res.status(200).send({
    //     success: true,
    //     message: "Product Already Exists..",
    //   });
    // }

    const product = await new productModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating product..",
    });
  }
};

export const getAllProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All the products",
      count: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting all products",
    });
  }
};
export const getSingleProductController = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await productModel.findOne({ slug }).select("-photo");

    res.status(200).send({
      success: true,
      message: "get single product",

      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting single product",
    });
  }
};
export const deleteSingleProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await productModel
      .findByIdAndDelete(req.params.pid)
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "delete single product",

      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting single product",
    });
  }
};
export const updateSingleProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    // switch (true) {
    //   case !name:
    //     return res.status(500).send({ error: "Name is Required" });
    //   case !description:
    //     return res.status(500).send({ error: "Description is Required" });
    //   case !price:
    //     return res.status(500).send({ error: "Price is Required" });
    //   case !category:
    //     return res.status(500).send({ error: "Category is Required" });
    //   case !quantity:
    //     return res.status(500).send({ error: "Quantity is Required" });
    //   case photo && photo.size > 1000000:
    //     return res
    //       .status(500)
    //       .send({ error: "photo is Required and should be less then 1mb" });
    // }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    // console.log(product);
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};
export const productFilterControllers = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Product Count..",
      error,
    });
  }
};

//! product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 4;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Product List controller..",
      error,
    });
  }
};
//!search ProductController
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
    // res.status(200).send({ success: true, results });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Product searching controller..",
      error,
    });
  }
};
//! related ProductController
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");

    res.status(200).send({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile getting similar product controller..",
      error,
    });
  }
};
//! category wise product controller
export const productCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModal.findOne({ slug });

    const products = await productModel
      .find({ category })
      .populate("category")
      .select("-photo");

    res.status(200).send({ success: true, category, products });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile getting category wise product controller..",
      error,
    });
  }
};
