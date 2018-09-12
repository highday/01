module.exports = {

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  index: async (req, res, next) => {
    try {
      res.json({message: 'this is test'})
    } catch (e) {
      next(e)
    }
  }
}