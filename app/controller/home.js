'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    let {model,service} = this.ctx
    await service.getmovie.movies()
    this.ctx.body = 'hello ';
  }

  async movieList(){
    let {model} = this.ctx
    let list = await model.Movie.find({})
    this.ctx.body = list
  }
}

module.exports = HomeController;
