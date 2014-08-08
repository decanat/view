expect = chai.expect;

var View = require('view');

describe('Itself', function () {
    it('should be proper type', function () {
        expect(View)
            .to.exist
            .to.be.a('function');

        expect(View).itself
            .to.have.property('extend')
            .to.be.a('function');
    });
});


describe('Initialize', function () {
    var view = new View({
            id        : 'test-id',
            className : 'test-view'
        });

    it('shoud initialize with proper arguments', function(){
        expect(view.el.id).to.equal('test-id');
        expect(view.el.className).to.equal('test-view');
        expect(view.el.other).to.not.be.ok;
    });
});

describe('_ensureElement', function(){
    it('should find existing element', function(){
        var view = View('#container');


        expect(view.el.className).to.equal('container-class');
    });

    it('should create new element if not found', function(){

    });
});