const Product = require("../models/product");
const Machine = require("../models/machine");
const User = require("../models/user");

const { check, validationResult } = require("express-validator");

const Create = async (req, res) => {
  const body = req.body;

  await check("product_name").notEmpty().run(req);
  await check("product_price").notEmpty().run(req);
  await check("product_detail").notEmpty().run(req);
  await check("product_amount").notEmpty().run(req);
  await check("product_image").notEmpty().run(req);
  await check("machine_id").notEmpty().run(req);
  await check("status").notEmpty().run(req);

  const result = await validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      core: 400,
      errors: result.array(),
    });
  }

  Machine.findOne(
    {
      _id: body.machine_id,
    },
    (err, machine) => {
      if (!machine) {
        return res.status(400).json({
          code: 400,
          status: "Failed.",
          message: "Machine not found.",
        });
      }

      Product.findOne(
        {
          machine_id: machine._id,
          product_name: body.product_name,
        },
        async (err, result) => {
          if (err) {
            return res.status(400).json({
              code: 400,
              status: "Failed.",
              message: "Error.",
            });
          }

          if (result) {
            return res.status(400).json({
              code: 400,
              status: "Failed.",
              message: "This product already have in this machine.",
            });
          }

          const product = new Product(body);

          await product
            .save()
            .then(() => {
              console.log(
                `(Service) Product created (ID: ${product._id}) at Machine (ID: ${machine._id}).`
              );
              return res.status(201).json({
                code: 201,
                status: "Success.",
                message: "Product is created.",
              });
            })
            .catch((err) => {
              return res.status(400).json({
                code: 400,
                status: "Failed.",
                message: err,
              });
            });
        }
      );
    }
  );
};

const Update = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  await check("product_name").notEmpty().run(req);
  await check("product_price").notEmpty().run(req);
  await check("product_detail").notEmpty().run(req);
  await check("product_amount").notEmpty().run(req);
  await check("product_image").notEmpty().run(req);
  await check("machine_id").notEmpty().run(req);
  await check("status").notEmpty().run(req);

  const result = await validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      core: 400,
      errors: result.array(),
    });
  }

  Machine.findOne(
    {
      _id: body.machine_id,
    },
    (err, machine) => {
      if (!machine) {
        return res.status(400).json({
          code: 400,
          status: "Failed.",
          message: "Machine not found.",
        });
      }

      Product.find(
        {
          machine_id: body.machine_id,
        },
        async (err, products) => {
          if (err)
            return res.status(400).json({
              code: 400,
              status: "Failed.",
              message: "Product not found.",
            });

          const product = await products.find(
            (product) => product.product_name === body.product_name
          );

          if (product && product._id.toString() !== id) {
            return res.status(400).json({
              code: 400,
              status: "Failed.",
              message: "This product already have in this machine.",
            });
          } else {
            Product.findOne(
              {
                _id: id,
              },
              async (err, result) => {
                if (err)
                  return res.status(400).json({
                    code: 400,
                    status: "Failed.",
                    message: err,
                  });

                if (!result) {
                  return res.status(400).json({
                    code: 400,
                    status: "Failed.",
                    message: "Product not found.",
                  });
                }

                result.product_name = await body.product_name;
                result.product_price = await body.product_price;
                result.product_detail = await body.product_detail;
                result.product_image = await body.product_image;
                result.product_amount = await body.product_amount;
                result.machine_id = await body.machine_id;
                result.status = await body.status;

                await result
                  .save()
                  .then(() => {
                    console.log(
                      `(Service) Product updated (ID: ${result._id}) at Machine (ID: ${result.machine_id}).`
                    );
                    return res.status(200).json({
                      code: 200,
                      status: "Success.",
                      message: "Product is updated.",
                    });
                  })
                  .catch((err) => {
                    return res.status(400).json({
                      code: 400,
                      status: "Failed.",
                      message: err,
                    });
                  });
              }
            );
          }
        }
      );
    }
  );
};

// Get only product in machine not for all product
const GetListMachineProduct = (req, res) => {
  const id = req.params.id;
  Product.find(
    {
      machine_id: id,
    },
    (err, products) => {
      if (err) {
        return res.status(400).json({
          code: 400,
          status: "Failed.",
          message: err,
        });
      }

      if (!products.length) {
        return res.status(400).json({
          code: 400,
          status: "Failed.",
          message: "Products not found.",
        });
      }

      console.log(`(Service) Get list product.`);
      return res.status(200).json({
        code: 200,
        status: "Success.",
        data: products,
      });
    }
  );
};

const GetList = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      return res.status(400).json({
        code: 400,
        status: "Failed.",
        message: err,
      });
    }

    if (!products.length) {
      return res.status(400).json({
        code: 400,
        status: "Failed.",
        message: "Products not found.",
      });
    }

    console.log(`(Service) Get list product.`);
    return res.status(200).json({
      code: 200,
      status: "Success.",
      data: products,
    });
  });
};

const GetByID = (req, res) => {
  const id = req.params.id;
  Product.findOne(
    {
      _id: id,
    },
    (err, product) => {
      if (err)
        return res.status(400).json({
          code: 400,
          status: "Failed.",
          message: "Product not found.",
        });
      if (!product)
        return res.status(400).json({
          code: 400,
          status: "Failed.",
          message: "Product not found.",
        });

      console.log(`(Service) Product get (ID: ${product._id}).`);
      return res.status(200).json({
        code: 200,
        status: "Success.",
        data: product,
      });
    }
  );
};

const Delete = (req, res) => {
  const id = req.params.id;
  Product.findOneAndDelete(
    {
      _id: id,
    },
    (err, product) => {
      if (err)
        return res.status(400).json({
          code: 400,
          status: "Failed.",
          message: "Product not found.",
        });
      if (!product)
        return res.status(400).json({
          code: 400,
          status: "Failed.",
          message: "Product not found.",
        });

      console.log(`(Service) Product deleted (ID: ${product._id}).`);
      return res.status(200).json({
        code: 200,
        status: "Success.",
        data: null,
      });
    }
  );
};

const BuyProduct = (req, res) => {
  const params = req.params.id;

  Product.findOne({ _id: params }, async (err, product) => {
    if (err)
      return res.status(400).json({
        code: 400,
        status: "Failed.",
        message: "Product not found.",
      });
    if (!product)
      return res.status(400).json({
        code: 400,
        status: "Failed.",
        message: "Product not found.",
      });

    if (product.product_amount - 1 < 0) {
      return res.status(400).json({
        code: 400,
        status: "Failed.",
        message: "Product Sold out.",
      });
    }

    product.product_amount = (await product.product_amount) - 1;
    await product
      .save()
      .then(() => {
        console.log(
          `(Service) Buy Product (ID: ${product._id}) total ${product.product_amount}.`
        );

        if (product.product_amount < 10) {
          Machine.findOne({ _id: product.machine_id }, (err, machine) => {
            if (err) {
              return res.status(400).json({
                code: 400,
                status: "Failed.",
                message: "Can't find machine.",
              });
            }
            if (!machine) {
              return res.status(400).json({
                code: 400,
                status: "Failed.",
                message: "Can't find machine.",
              });
            }

            User.find({}, async (err, users) => {
              await users.map((user) => {
                if (user.role !== "admin") return;

                User.findOne({ _id: user._id }, (err, admin) => {
                  const params = {
                    machine_name: machine.machine_name,
                    machine_location: machine.machine_location,
                    product_amount: product.product_amount,
                    product_name: product.product_name,
                    machine_id: machine._id,
                    product_image: product.product_image,
                    status: "unread",
                  };

                  let temp = [params, ...admin.notify];

                  admin.notify = temp;
                  console.log(
                    `(Notify) To ${user.first_name} ${user.last_name} (Admin) product less than 10 (ID: ${product._id}) total ${product.product_amount}.`
                  );
                  admin.save();
                });
              });
            });
          });
        }

        return res.status(200).json({
          code: 200,
          status: "Success.",
          message: "Product has purchase done.",
        });
      })
      .catch((err) => {
        return res.status(400).json({
          code: 400,
          status: "Failed.",
          message: err,
        });
      });
  });
};

module.exports = {
  Create,
  Update,
  GetListMachineProduct,
  GetList,
  GetByID,
  Delete,
  BuyProduct,
};
