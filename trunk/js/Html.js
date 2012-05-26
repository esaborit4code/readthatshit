var Html = function() {};

Html.INVALID_ELEMENT_ERROR = "Invalid argument. HTML element or jQuery element expected.";

Html.checkIfValidHTMLElement = function(element) {
    var element_is_a_DOM_element = (element instanceof HTMLElement);
    var element_is_a_jQuery_object = ((jQuery != null) && (element instanceof jQuery));
    
    var element_is_valid = ((element != null) && (element_is_a_DOM_element || element_is_a_jQuery_object));
    if(!element_is_valid) {
        throw new Error(Html.INVALID_ELEMENT_ERROR);
    }
};