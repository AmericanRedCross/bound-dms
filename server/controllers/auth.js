module.exports = {
  login (req, res, next) {
    // handle authentication here
    res.status(200).json({success: true})
  }
}
