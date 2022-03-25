class Repository {
  constructor(model) {
    this.model = model;
  }

  findAll() {
    return this.model.findAll();
  }

  findById() { }

  findByEmail(email, includeDeleted=false) {
    return this.model.findOne({ where: { email: email }, paranoid: !includeDeleted});
  }

  updateById() { }

  insert(uid, email, pwdHash) {
    return this.model.create({ uid: uid, email: email, pwdHash: pwdHash });
  }

  deleteById() { }
}

module.exports = Repository;
