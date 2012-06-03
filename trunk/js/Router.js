var Router = function() {};

Router.HASH_ALREADY_REGISTERED = "Hash already registered";
Router.HASH_NOT_REGISTERED = "Hash is not registered";

Router.routes = {};

Router.register = function(hash, callback, force_overwrite) {
    var matching_hash = Router.findMatchingHashForHash(hash);
    var there_is_a_matching_hash = (matching_hash != null);
    if(there_is_a_matching_hash && !force_overwrite) {
        throw new Error(Router.HASH_ALREADY_REGISTERED);
    }
    
    if(there_is_a_matching_hash && force_overwrite) {
        Router.routes[matching_hash] = null;
    }
    
    Router.routes[hash] = callback;
};

Router.route = function(url) {
    var hash = URLReader.getHash(url);
    var parametrized_hash = URLReader.getParameters(url);
    
    var matching_hash = Router.findMatchingHashForHash(hash);
    
    var hash_is_registered = (matching_hash != null);
    if(!hash_is_registered) {
        throw new Error(Router.HASH_NOT_REGISTERED);
    }

    Router.routes[matching_hash](parametrized_hash);
};

Router.findMatchingHashForHash = function(hash) {
    var matching_hash = null;
    
    for(var registered_hash in Router.routes) {
        var hash_matches = (hash.indexOf(registered_hash) == 0);
        var hash_has_callback = (Router.routes[registered_hash] != null)
        if(hash_matches && hash_has_callback) {
            matching_hash = registered_hash;
            break;
        }
    }
      
    return matching_hash;
};