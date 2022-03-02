'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async news() {
    const { ctx } = this;
    let msg = await ctx.service.weather.find("长沙");
    ctx.body = msg;
  }

  async record() {
    const { ctx } = this;
    let msg = await ctx.service.weather.record();
    ctx.body = msg;
  }

  async weather() {
    const { ctx } = this;
    ctx.body = await ctx.service.weather.getWeather(ctx.query.city || '长沙');
  }
}

module.exports = HomeController;
