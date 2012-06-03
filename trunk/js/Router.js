var Router = function() {};

Router.HASH_ALREADY_REGISTERED = "Hash already registered";
Router.HASH_NOT_REGISTERED = "Hash is not registered";

Router.routes = {};

Router.register = function(hash, callback, force_overwrite) {
    var hash_is_already_registered = (Router.routes[hash] != null);
    if(hash_is_already_registered && !force_overwrite) {
        throw new Error(Router.HASH_ALREADY_REGISTERED);
    }
    
    Router.routes[hash] = callback;
};

Router.route = function(url) {
    var hash = URLReader.getHash(url);
    var parametrized_hash = URLReader.getParameters(url);
    
    var hash_is_already_registered = (Router.routes[hash] != null);
    if(!hash_is_already_registered) {
        throw new Error(Router.HASH_NOT_REGISTERED);
    }

    Router.routes[hash](parametrized_hash);
};