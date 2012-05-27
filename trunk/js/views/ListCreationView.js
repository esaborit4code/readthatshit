var ListCreationView = function() {
    this.initialize();
};

ListCreationView.template_file = "ListCreationView.html";

ListCreationView.prototype.initialize = function() {
    this.element = ViewLoader.getElementFromTemplateFile(ListCreationView.template_file);
    this.initializeForm();
    this.initializeSaveButton();
};

ListCreationView.prototype.initializeForm = function() {
    this.form = $(this.element).find("form").get(0);
};

ListCreationView.prototype.initializeSaveButton = function() {
    this.save_button = $(this.element).find(".save.button").get(0);
    this.save_button.addEventListener("click", this.onSaveButtonClick.bind(this));
};

ListCreationView.prototype.onSaveButtonClick = function(click_event) {
    var data = this.getData();
    var event = new Events.ButtonClick(this.save_button, data);
    
    Bus.broadcast(event);
};

ListCreationView.prototype.getData = function() {
    var data = {
        "title": this.form.title.value,
        "description": this.form.description.value
    };
    
    return data;
};