const { StatusCodes } = require("http-status-codes");
// const mongoose = require("mongoose");

// const {
//   BadRequestError,
//   UnauthenticatedError,
//   NotFoundError,
// } = require("../errors");
const History = require("../models/History");

// Get History
const getProductsHistory = async (req, res) => {
  const history = await History.find({});
  res.status(StatusCodes.OK).json({ total: history.length, history });
};

// Create Product History
const createProductHistory = async (req, res) => {
  const { soldQuantity, productID } = req.body;
  if (!soldQuantity || !productID) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter all values" });
  }

  const date = new Date().toLocaleDateString();
  console.log(date);
  const prod = await History.findOne({ product: productID });
  console.log(prod);
  if (prod) {
    if (prod.soldDate === date) {
      prod.soldQuantity += soldQuantity;
      await prod.save();
      console.log(prod);
      // res.status(StatusCodes.OK).json({ productExist: true, message: "Product already exist" });
      res.status(StatusCodes.OK).json({prod, message: "Product Updated"});

    }
  }else
  {
    const prodHistory = await History.create({
      soldDate: date,
      soldQuantity,
      product: productID,
    });
    res.status(StatusCodes.OK).json({prodHistory, message: "Product successfully created"});
  }
};

module.exports = { getProductsHistory, createProductHistory };
