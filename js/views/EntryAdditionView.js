var EntryAdditionView = function() {
    this.initialize();
};

EntryAdditionView.TEMPLATE_LOAD_ERROR = "Could not load tempate file.";
EntryAdditionView.INVALID_TEMPLATE = "Invalid template.";

EntryAdditionView.template_file = "EntryAdditionView.html";
EntryAdditionView.template_html = null;

EntryAdditionView.prototype.initialize = function() {
    this.element = EntryAdditionView.getElementFromTemplateHtml();
    this.initializeForm();
    this.initializeSaveButton();
};

EntryAdditionView.getElementFromTemplateHtml = function() {
    var static_template_not_loaded = (EntryAdditionView.template_html == null);
    if(static_template_not_loaded) {
        EntryAdditionView.loadTemplateHtml();
    }
    
    var auxiliar = document.createElement("div");
    auxiliar.innerHTML = EntryAdditionView.template_html;
    
    var element = auxiliar.firstChild;
    
    return element;
};

EntryAdditionView.loadTemplateHtml = function() {
    $.ajax({
        url: Config.HtmlTemplatesPath + "/" + EntryAdditionView.template_file,
        async: false,
        success: EntryAdditionView.onTemplateFileLoaded,
        error: EntryAdditionView.onTemplateFileError
    });
};

EntryAdditionView.onTemplateFileLoaded = function(file_content) {
    var auxiliar = document.createElement("div");
    auxiliar.innerHTML = file_content;
    
    var template_is_only_text = (auxiliar.children[0] == null);
    if(template_is_only_text) {
        throw new Error(EntryAdditionView.INVALID_TEMPLATE);
    }
    
    EntryAdditionView.template_html = file_content;
};

EntryAdditionView.onTemplateFileError = function(file_content) {
    throw new Error(EntryAdditionView.TEMPLATE_LOAD_ERROR);
};

EntryAdditionView.prototype.initializeForm = function() {
    this.form = $(this.element).find("form").get(0);
};

EntryAdditionView.prototype.initializeSaveButton = function() {
    this.save_button = $(this.element).find(".save.button").get(0);
    this.save_button.addEventListener("click", this.onSaveButtonClick.bind(this));
};

EntryAdditionView.prototype.onSaveButtonClick = function(click_event) {
    var data = this.getData();
    var event = new Events.ButtonClick(this.save_button, data);
    
    Bus.broadcast(event);
};

EntryAdditionView.prototype.getData = function() {
    var data = {
        "title": this.form.title.value,
        "url": this.form.url.value,
        "description": this.form.description.value
    };
    
    return data;
};