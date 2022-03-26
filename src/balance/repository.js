class Repository {
  constructor(model) {
    this.model = model;
  }

  findByUserId(userId) {
    return this.model.findOne({ where: { userId: userId }});
  }

  updateByUserId(userId, updatedData) {
    return this.model.update(updatedData, { where: { userId: userId } });
  }
}

module.exports = Repository;