describe("Router", function() {
    var original_URLReader = copyClass(URLReader);
    afterEach(function() {
        Router.routes = {};
        URLReader = original_URLReader;
    });
    
    it("should register a function to a specific url hash", function() {
        var the_function = "fake function";
        var the_hash = "the hash";
        
        Router.register(the_hash, the_function);
        expect(Router.routes[the_hash]).toEqual(the_function);
    });
    
    it("should throw an exception if the url hash has been already registered", function() {
        var a_function = "fake function";
        var the_hash = "the hash";
        
        Router.register(the_hash, a_function);
        
        expect(function() {
            Router.register(the_hash, a_function);
        }).toThrow(Router.HASH_ALREADY_REGISTERED);
    });
    
    it("should allow to force overwrite when registering to a registered hash", function() {
        var a_function = "fake function";
        var the_hash = "the hash";
        
        Router.register(the_hash, a_function);
        
        var thrown_exception = null;
        try {
            Router.register(the_hash, a_function, true);
        }
        catch(exception) {
            thrown_exception = exception;
        }
        
        expect(thrown_exception).toBeNull();
    });
    
    it("should call the registered function with the parametrized hash when a matching url hash is passed", function() {
        var dummy_thing = {};
        dummy_thing.callback = function() {};
        
        var the_hash = "param1/param2/param3";
        var url = "domain/#" + the_hash;
        var parametrized_hash = ["param1", "param2", "param3"];
        
        URLReader.getHash = function () {
            return the_hash;  
        };
        URLReader.getParameters = function () {
            return parametrized_hash;  
        };
        
        spyOn(dummy_thing, "callback");
        
        Router.register(the_hash, dummy_thing.callback);
        
        Router.route(url);
        
        expect(dummy_thing.callback).toHaveBeenCalledWith(parametrized_hash);
    });
    
    it("should throw an exception when trying to route to a non registered hash", function() {
        var not_registered_hash = "not registered hash";
        var url = "domain/#" + not_registered_hash;
        
        expect(function() {
            Router.route(url);
        }).toThrow(Router.HASH_NOT_REGISTERED);
    });
});