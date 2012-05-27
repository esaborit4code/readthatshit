var ViewLoader = function() {};

ViewLoader.TEMPLATE_LOAD_ERROR = "Could not load template file.";
ViewLoader.INVALID_TEMPLATE = "Invalid template.";

ViewLoader.cache = {};

ViewLoader.getElementFromTemplateFile = function(template_file) {
    var template_html = ViewLoader.getTemplateHtml(template_file);
    
    var auxiliar = document.createElement("div");
    auxiliar.innerHTML = template_html;
    
    var element = auxiliar.firstChild;
    
    return element;
};

ViewLoader.getTemplateHtml = function (template_file) {
    var template_html = ViewLoader.cache[template_file];
    var file_was_cached = (template_html != null);
    if(file_was_cached) {
        return template_html;
    }
    
    var wrapper = { template_html: null };
    
    $.ajax({
        url: Config.HTML_TEMPLATES_PATH + "/" + template_file,
        async: false,
        success: ViewLoader.onTemplateFileLoaded.bind(wrapper),
        error: ViewLoader.onTemplateFileError
    });
    
    ViewLoader.cache[template_file] = wrapper.template_html;
    return wrapper.template_html;
};

ViewLoader.onTemplateFileLoaded = function(file_content) {
    var auxiliar = document.createElement("div");
    auxiliar.innerHTML = file_content;
    
    var template_is_only_text = (auxiliar.children[0] == null);
    if(template_is_only_text) {
        throw new Error(ViewLoader.INVALID_TEMPLATE);
    }
    
    this.template_html = file_content;
};

ViewLoader.onTemplateFileError = function(file_content) {
    throw new Error(ViewLoader.TEMPLATE_LOAD_ERROR);
};