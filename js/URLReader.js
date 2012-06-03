function URLReader() { };

URLReader.HASH_CHARACTER = "#";

URLReader.getParameters = function(url, section_separator, parameter_separator) {
    var hash = URLReader.getParameterSection(url, section_separator);
    
    var there_are_parameters = (hash != "");
    if(!there_are_parameters) {
        return [];
    }
    
    var parameters = hash.split(parameter_separator);
    
    return parameters;
};

URLReader.getParameterSection = function (url, section_separator) {
    var url_has_section_separator = (url.indexOf(section_separator) > -1);
    if(!url_has_section_separator) {
        return "";
    }
    
    var url_split = url.split(section_separator);
    var parameter_section = url_split[1];
    
    return parameter_section;
};

URLReader.getHash = function(url) {
    return URLReader.getParameterSection(url, URLReader.HASH_CHARACTER);
}