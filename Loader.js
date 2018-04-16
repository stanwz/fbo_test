var Loader = function()
{
    // Shaders

    Loader.get = function(id )
    {
        return Loader.shaders[ id ];
    };

};

Loader.prototype =
{

    loadFiles : function(shaders, callback )
    {
        Loader.shaders = shaders;

        this.callback = callback;
        this.batchLoad( this, 'onReady' );

    },

    batchLoad : function( scope, callback )
    {
        var queue = 0;
        var shaders = Loader.shaders;
        for ( var name in shaders ) {
            if (shaders.hasOwnProperty(name)) {
                queue++;
                var req = new XMLHttpRequest();
                var url = shaders[name];
                req.onload = loadHandler(name, req );
                req.open( 'get', url, true );
                req.send();
            }
        }

        function loadHandler( name, req ) {
            return function()
            {
                shaders[ name ] = req.responseText;
                if ( --queue <= 0 ) scope[ callback ]();
            };
        }
    },

    onReady : function()
    {
        if( this.callback ) this.callback();
    }
};

