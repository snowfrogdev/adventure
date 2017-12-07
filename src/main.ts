let Test: any = pc.createScript('test');

Test.attributes.add('message', {
    type: 'string'
});

Test.extend({
    initialize: function() {
        const self = this;
                
        console.log(self.message)
    }
});