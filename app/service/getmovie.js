'use strict';
const puppeteer = require('puppeteer')

class Service extends require('egg').Service{

    async movies(){
        let browser = await puppeteer.launch({headless: false})
        let page = await browser.newPage()
        await page.goto('https://movie.douban.com/top250')
        const list = await page.evaluate(()=>{
            let body = []
            let dom_list = document.getElementsByClassName('grid_view')[0].children
            for(let i=0;i<dom_list.length;i++){
                let current_dom = dom_list[i]
                let obj = {}
                obj.url = current_dom.getElementsByTagName('img')[0].src
                let hd = current_dom.getElementsByClassName('hd')[0]
                obj.name = hd.getElementsByTagName('span')[0].innerText
                obj.grade = current_dom.getElementsByClassName('rating_num')[0].innerText
                body.push(obj)
            }
            return {
                body
            }
        })
        list.body.map(async val=>{
            await this.ctx.model.Movie.update({name: {$in: val.name}},val,{upsert: true})
        })
    }
}

module.exports = Service;