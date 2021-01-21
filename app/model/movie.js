'use strict'

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const MovieSchema = new Schema({
        name: {type: 'string',default: ''},
        url: {type: 'string',default: ''},
        grade: {type: 'number',default: 0}
    })

    return mongoose.model('Movie',MovieSchema,'movie')
}