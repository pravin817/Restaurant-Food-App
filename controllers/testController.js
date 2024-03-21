const testUserController = (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Test User API data" });
  } catch (error) {
    console.log(`Error in test api`, error);
  }
};

module.exports = {
  testUserController,
};
