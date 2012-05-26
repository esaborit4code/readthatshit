var copyClass = function(class_to_copy) {    
    var class_copy = {};
    for(property_name in class_to_copy) {
        class_copy[property_name] = class_to_copy[property_name];
    }
    
    return class_copy;
};