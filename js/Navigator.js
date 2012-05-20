function Navigator() {
    this.map = {};
    this.start_view;
    this.current_view;
};

Navigator.INVALID_ELEMENT_ERROR = "Invalid argument. HTML element or jQuery element expected.";
Navigator.INVALID_MAP_ERROR = "Invalid argument. Associative array expected.";
Navigator.NON_EXISTANT_KEY_ERROR = "Key not exists on map.";
Navigator.NO_START_VIEW_DEFINED = "There is no start view defined";
Navigator.VIEW_NOT_IN_MAP = "View is not contained in map";

Navigator.prototype.setDisplay = function(display) {
    this.checkIfValidHTMLElement(display);
    
    this.display = display;
};

Navigator.prototype.setMap = function(map) {
    this.checkIfValidMap(map);
    this.checkIfViewsAreValid(map);
    
    this.map = map;
};

Navigator.prototype.checkIfViewsAreValid = function(map) {
    for(var view_key in map) {
        this.checkIfValidHTMLElement(map[view_key]);
    }
};

Navigator.prototype.addView = function(view_key, view) {
    this.checkIfValidHTMLElement(view);
    
    this.map[view_key] = view;
}

Navigator.prototype.setStartView = function(view) {
    this.checkIfValidHTMLElement(view);
    this.checkIfMapContainsView(view);
    this.start_view = view;
};

Navigator.prototype.setStartViewByKey = function(view_key) {
    this.checkIfMapContainsKey(view_key);
    this.start_view = this.map[view_key];
};

Navigator.prototype.start = function() {
    this.checkIfStartViewIsDefined();
    
    this.navigateTo(this.start_view);
};

Navigator.prototype.navigateTo = function(view) {
    var view_is_a_key = (typeof(view) == "string");
    if(view_is_a_key) {
        this.checkIfMapContainsKey(view);
        view = this.map[view];
    }
    
    if(this.display.hasChildNodes()) {
        this.display.removeChild(this.display.firstChild);
    }
    this.display.appendChild(view);
    this.current_view = view;
};

Navigator.prototype.checkIfMapContainsKey = function(key) {
    var key_exists = (this.map[key] != undefined);
    if(!key_exists) {
        throw new Error(Navigator.NON_EXISTANT_KEY_ERROR);
    }
};

Navigator.prototype.checkIfMapContainsView = function(view) {
    for(var view_key in this.map) {
        if(this.map[view_key] == view) {
            return;
        }
    }
    
    throw new Error(Navigator.VIEW_NOT_IN_MAP);
};

Navigator.prototype.checkIfStartViewIsDefined = function() {
    var start_view_is_set = (this.start_view != undefined);
    if(!start_view_is_set) {
        throw new Error(Navigator.NO_START_VIEW_DEFINED);
    }
};

Navigator.prototype.checkIfValidMap = function(map) {
    var map_is_object = (typeof(map) == "object");
    
    var map_is_valid = map_is_object;
    
    if(!map_is_valid) {
        throw new Error(Navigator.INVALID_MAP_ERROR);
    }
};

Navigator.prototype.checkIfValidHTMLElement = function(element) {
    var element_is_a_DOM_element = (element instanceof HTMLElement);
    var element_is_a_jQuery_object = ((jQuery != null) && (element instanceof jQuery));
    
    var element_is_valid = ((element != null) && (element_is_a_DOM_element || element_is_a_jQuery_object));
    if(!element_is_valid) {
        throw new Error(Navigator.INVALID_ELEMENT_ERROR);
    }
};