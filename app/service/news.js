const Service = require('egg').Service;

class UserService extends Service {
  async find() {
    let user = "2333"
    return user;
  }
}

module.exports = UserService;