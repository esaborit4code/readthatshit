function URLReader() { };

URLReader.getParameters = function(url, section_separator, parameter_separator) {
    var url_has_section_separator = (url.indexOf(section_separator) > -1);
    if(!url_has_section_separator) {
        return [];
    }
    
    var url_split = url.split(section_separator);
    var parameter_section = url_split[1];
    
    var there_are_parameters = (parameter_section != "");
    if(!there_are_parameters) {
        return [];
    }
    
    var parameters = parameter_section.split(parameter_separator);
    
    return parameters;
};