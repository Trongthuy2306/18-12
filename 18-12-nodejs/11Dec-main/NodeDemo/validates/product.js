const { body } = require('express-validator');
const message = require('../helper/message');
const util = require('util')

var options={
    name:{
        min: 10,
        max : 80
    },
    desc:{
        min: 10,
        max : 80
    }
}

module.exports = {
    validator: function () {
        return [
            body('name', util.format(message.size_string_message,'name',
            options.name.min, options.name.max)).isLength(options.name),
            body('desc', util.format(message.size_string_message,'desc',
            options.desc.min, options.desc.max)).isLength(options.desc),
            body('image', 'image phai dung dinh dang').isURL(),
            ]
    },
}