const Machine = require("../models/machine");
const Product = require("../models/product");

const { check, validationResult } = require("express-validator");

const Create = async (req, res) => {
  const body = req.body;

  await check("machine_image").notEmpty().run(req);
  await check("machine_name").notEmpty().run(req);
  await check("machine_detail").notEmpty().run(req);
  await check("machine_location").notEmpty().run(req);
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
      machine_name: body.machine_name,
    },
    async (err, result) => {
      if (err)
        return res.status(400).json({
          code: 400,
          status: "Failed.",
          message: "Error.",
        });

      if (result) {
        return res.status(400).json({
          code: 400,
          status: "Failed.",
          message: "This machine already have in system.",
        });
      }

      const machine = new Machine(body);

      await machine
        .save()
        .then(() => {
          console.log(`(Service) Machine created (ID: ${machine._id}).`);
          return res.status(201).json({
            code: 201,
            status: "Success.",
            message: "Machine is created.",
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
};

const Update = async (req, res) => {
  const body = req.body;

  await check("machine_image").notEmpty().run(req);
  await check("machine_name").notEmpty().run(req);
  await check("machine_detail").notEmpty().run(req);
  await check("machine_location").notEmpty().run(req);
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
      _id: req.params.id,
    },
    async (err, machine) => {
      if (err)
        return res.status(400).json({
          code: 400,
          status: "Failed.",
          message: "Machine not found.",
        });
      if (!machine)
        return res.status(400).json({
          code: 400,
          status: "Failed.",
          message: "Machine not found.",
        });

      Machine.findOne(
        {
          machine_name: body.machine_name,
        },
        async (_, result) => {
          if (result && result._id.toString() !== machine._id.toString()) {
            return res.status(400).json({
              code: 400,
              status: "Failed.",
              message: "This machine already have in system.",
            });
          }

          machine.machine_image = await body.machine_image;
          machine.machine_detail = await body.machine_detail;
          machine.machine_name = await body.machine_name;
          machine.machine_location = await body.machine_location;
          machine.status = await body.status;

          await machine
            .save()
            .then(() => {
              console.log(`(Service) Machine Updated (ID: ${machine._id}).`);
              return res.status(200).json({
                code: 200,
                status: "Success.",
                message: "Machine is updated.",
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

const GetList = async (_, res) => {
  Machine.find({}, (err, machines) => {
    if (err) {
      return res.status(400).json({
        code: 400,
        status: "Failed.",
        message: err,
      });
    }

    if (!machines.length) {
      return res.status(400).json({
        code: 400,
        status: "Failed.",
        message: "Machine not found.",
      });
    }

    console.log(`(Service) Machine get list.`);
    return res.status(200).json({
      code: 200,
      status: "Success.",
      data: machines,
    });
  });
};

const GetByID = (req, res) => {
  const id = req.params.id;

  Machine.findOne(
    {
      _id: id,
    },
    (err, machine) => {
      if (err)
        return res.status(400).json({
          code: 400,
          status: "Failed.",
          message: "Machine not found.",
        });
      if (!machine)
        return res.status(400).json({
          code: 400,
          status: "Failed.",
          message: "Machine not found.",
        });

      console.log(`(Service) Machine get (ID: ${machine._id}).`);
      return res.status(200).json({
        code: 200,
        status: "Success.",
        data: machine,
      });
    }
  );
};

const Delete = (req, res) => {
  const id = req.params.id;
  Machine.findOneAndDelete(
    {
      _id: id,
    },
    (err, machine) => {
      if (err)
        return res.status(400).json({
          code: 400,
          status: "Failed.",
          message: "Delete failed.",
        });
      if (!machine)
        return res.status(400).json({
          code: 400,
          status: "Failed.",
          message: "Machine not found.",
        });

      Product.deleteMany({ machine_id: req.params.id }, (err, product) => {
        if (err)
          return res.status(400).json({
            code: 400,
            status: "Failed.",
            message: "Delete failed.",
          });

        console.log(`(Service) Machine deleted (ID: ${machine._id}).`);
        return res.status(200).json({
          code: 200,
          status: "Success.",
          data: null,
          message: "Machine has deleted success.",
        });
      });
    }
  );
};

const GetListWeb = (req, res) => {
  Machine.find({}, async (err, machines) => {
    if (err) {
      return res.status(400).json({
        code: 400,
        status: "Failed.",
        message: err,
      });
    }

    if (!machines.length) {
      return res.status(400).json({
        code: 400,
        status: "Failed.",
        message: "Machine not found.",
      });
    }

    const newMachine = [];

    await machines.map((value) => {
      if (value.status.toLowerCase() === "inactive") return;

      return newMachine.push(value);
    });

    console.log(`(Service) Machine get list.`);
    return res.status(200).json({
      code: 200,
      status: "Success.",
      data: newMachine,
    });
  });
};

module.exports = {
  Create,
  Update,
  GetList,
  GetByID,
  Delete,
  GetListWeb,
};
