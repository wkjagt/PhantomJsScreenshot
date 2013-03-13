'use strict'

String.prototype._in = function(array){
    for (var i = array.length - 1; i >= 0; i--) {
        if(array[i] == this) return true;
    };
    return false;
}

var system = require('system'),
    page = require("webpage").create(),
    args = {},
    required = ['url', 'output', 'viewport'],
    optional = ['useragent', 'timeout'],
    errors = {
        1 : 'bad argument'
    },

    buildArgs = function() {

        for(var i = 1; i < system.args.length; ++i) {
            var a = system.args[i].split('=');

            if(a.length !== 2 || !a[0]._in(required.concat(optional))) throw 1;
            args[a[0]] = a[1]
        }

        for(var i = required.length - 1; i >= 0; i--) {
            if(typeof args[required[i]] == 'undefined') throw 1;
        }
    },

    capture = function() {

        var viewport = args.viewport.split('x');
        if(viewport.length !== 2) throw 1;

        page.viewportSize = { width: viewport[0], height: viewport[1] };

        if(args.useragent) {
            page.settings.userAgent = args.useragent;
        }
        if(args.timeout) {
            setTimeout(function(){phantom.exit(3)}, parseInt(args.timeout, 10));
        }

        page.open(args.url);

        page.onLoadFinished = function(status) {
            if(status !== 'success') {
                phantom.exit(2);
            }
            page.render(args.output);
            phantom.exit();
        };
    };
try { buildArgs(); }
catch(err) { phantom.exit(err); }

capture();
