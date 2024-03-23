// Get user controller
const getUserController = async (req, res) => {
  //   try {
  //     const token = req.header;
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send({
  //       message: "Error while getting the user",
  //       status: false,
  //       error,
  //     });
  //   }

  res.status(200).send("User Data");
};

module.exports = {
  getUserController,
};
