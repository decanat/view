var Emitter = require('component-emitter'),
    type    = require('component-type');

var extend  = require('yiwn-extend'),
    uid     = require('yiwn-uid');

/**
 * Creates a view similar to backbone views
 *
 * @param options
 * @returns {*}
 * @constructor
 */

function View(el, model, options) {
    if (!(this instanceof View)) 
        return new View(el, model, options);
    
    this.cid = uid('view-');

    this.ensureElement(el);

    if (this.initialize)
        this.initialize.apply(this, arguments);

    return this;
}

Emitter(View.prototype);

View.extend = extend.bind(null, View);

View.prototype.setElement = function (el) {
    if (type(el) == 'string')
        el = document.querySelector(el);
    else if (type(el) == 'object')
        el = this.createElement(el);

    if (type(el) == 'element')
        this.el = el;

    return this;
};

View.prototype.createElement = function(el){
    var id, className, tagName,
        element;

    id        = el.id || this.id || null;
    className = mixClass(el.className, this.className);
    tagName   = el.tagName || this.tagName || 'div';
    
    var el = document.createElement(tagName);

    if (id) el.id = id;

    el.className = className;

    return el;
};

View.prototype.ensureElement = function (el) {

    if (el) this.setElement(el);

    if (!this.el && el)
        this.el = this.createElement(el);

    return this;
};


function mixClass(a, b) {
    var arr = a ? a.split(' ') : [],
        brr = b ? b.split(' ') : [];

    brr.reduce(function(u, val, i){
        if (~u.indexOf(val))
            u.push(val);
        return u;
    }, arr);

    return arr.join(' ');
}

module.exports = View;
