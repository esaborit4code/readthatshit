var EntryAdditionView = function() {
    this.initialize();
};

EntryAdditionView.template_file = "EntryAdditionView.html";

EntryAdditionView.prototype.initialize = function() {
    this.element = ViewLoader.getElementFromTemplateFile(EntryAdditionView.template_file);
    this.initializeForm();
    this.initializeSaveButton();
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