function URLReader() { };

URLReader.HASH_CHARACTER = "#";
URLReader.SLASH_CHARACTER = "/";

URLReader.getParameters = function(url, section_separator, parameter_separator) {
    section_separator = (section_separator == null) ? URLReader.HASH_CHARACTER : section_separator;
    parameter_separator = (parameter_separator == null) ? URLReader.SLASH_CHARACTER : parameter_separator;
    
    var parameter_section = URLReader.getParameterSection(url, section_separator);
    
    var there_are_parameters = (parameter_section != "");
    if(!there_are_parameters) {
        return [];
    }
    
    var parameters = parameter_section.split(parameter_separator);
    
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