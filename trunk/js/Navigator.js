function Navigator() {
    this.display;
    this.current_view;
};

Navigator.INVALID_ELEMENT_ERROR = "Invalid argument. HTML element or jQuery element expected.";

Navigator.prototype.setDisplay = function(display) {
    this.checkIfValidHTMLElement(display);
    
    this.display = display;
};

Navigator.prototype.navigateTo = function(view) {
    this.checkIfValidHTMLElement(view);
    if(this.display.hasChildNodes()) {
        this.display.removeChild(this.display.firstChild);
    }
    this.display.appendChild(view);
    this.current_view = view;
};

Navigator.prototype.checkIfValidHTMLElement = function(element) {
    var element_is_a_DOM_element = (element instanceof HTMLElement);
    var element_is_a_jQuery_object = ((jQuery != null) && (element instanceof jQuery));
    
    var element_is_valid = ((element != null) && (element_is_a_DOM_element || element_is_a_jQuery_object));
    if(!element_is_valid) {
        throw new Error(Navigator.INVALID_ELEMENT_ERROR);
    }
};