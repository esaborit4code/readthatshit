var ListCreationView = function() {
    this.initialize();
};

ListCreationView.TEMPLATE_LOAD_ERROR = "Could not load tempate file.";
ListCreationView.INVALID_TEMPLATE = "Invalid template.";

ListCreationView.template_file = "ListCreationView.html";
ListCreationView.template_html = null;

ListCreationView.prototype.initialize = function() {
    this.element = ListCreationView.getElementFromTemplateHtml();
    this.initializeForm();
    this.initializeSaveButton();
};

ListCreationView.getElementFromTemplateHtml = function() {
    var static_template_not_loaded = (ListCreationView.template_html == null);
    if(static_template_not_loaded) {
        ListCreationView.loadTemplateHtml();
    }
    
    var auxiliar = document.createElement("div");
    auxiliar.innerHTML = ListCreationView.template_html;
    
    var element = auxiliar.firstChild;
    
    return element;
};

ListCreationView.loadTemplateHtml = function() {
    $.ajax({
        url: Config.HtmlTemplatesPath + "/" + ListCreationView.template_file,
        async: false,
        success: ListCreationView.onTemplateFileLoaded,
        error: ListCreationView.onTemplateFileError
    });
};

ListCreationView.onTemplateFileLoaded = function(file_content) {
    var auxiliar = document.createElement("div");
    auxiliar.innerHTML = file_content;
    
    var template_is_only_text = (auxiliar.children[0] == null);
    if(template_is_only_text) {
        throw new Error(ListCreationView.INVALID_TEMPLATE);
    }
    
    ListCreationView.template_html = file_content;
};

ListCreationView.onTemplateFileError = function(file_content) {
    throw new Error(ListCreationView.TEMPLATE_LOAD_ERROR);
};

ListCreationView.prototype.initializeForm = function() {
    this.form = $(this.element).find("form").get(0);
};

ListCreationView.prototype.initializeSaveButton = function() {
    this.save_button = $(this.element).find(".save.button").get(0);
    this.save_button.addEventListener("click", this.onSaveButtonClick.bind(this));
};

ListCreationView.prototype.onSaveButtonClick = function(click_event) {
    var event = new Events.ButtonClick(this.save_button);
    
    Bus.broadcast(event);
};

ListCreationView.prototype.getData = function() {
    var data = {
        "title": this.form.title.value,
        "description": this.form.description.value
    };
    
    return data;
};