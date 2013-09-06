(function() {
    __jah__.resources["/Physical.js"] = {
        data: function(exports, require, module, __filename, __dirname) {
            
            var Physical = {
                PhysicalLayer: require('/Physical/PhysicalLayer'),
                PhysicalNode: require('/Physical/PhysicalNode'),
                PhysicalShape: require('/Physical/PhysicalShape'),
                PhysicalShapeCircle: require('/Physical/PhysicalShapeCircle'),
                PhysicalShapePolygon: require('/Physical/PhysicalShapePolygon'),
                PhysicalShapeBox: require('/Physical/PhysicalShapeBox')
            };


            module.exports = Physical;


        },
        mimetype: "application/javascript",
        remote: false
    };
})();
