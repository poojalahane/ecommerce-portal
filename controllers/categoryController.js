import categoryModal from "../models/categoryModal.js";
import slugify from "slugify";
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is Required" });
    }
    const existingCategory = await categoryModal.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exists",
      });
    }

    const category = await new categoryModal({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "Category Created Successfully..",
      category,
    });
    // console.log(category);
  } catch (error) {
    console.log("Error while creating category...");
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category",
    });
  }
};

export const getSingleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModal.findOne({ slug });
    console.log(category);
    res.status(200).send({
      success: true,
      message: "get the single category",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting category",
    });
  }
};

export const getAllCategoryController = async (req, res) => {
  try {
    const category = await categoryModal.find({});
    console.log(category);
    res.status(200).send({
      success: true,
      message: "get the all category",
      count: category.length,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all category",
    });
  }
};
export const deleteSingleCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModal.findByIdAndDelete(id);
    console.log(category);
    res.status(200).send({
      success: true,
      message: "Successfully Deleted Single category",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting single category",
    });
  }
};
export const updateSingleCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await categoryModal.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    console.log(category);
    res.status(200).send({
      success: true,
      message: "Successfully Updated Single category",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updatingting single category",
    });
  }
};
