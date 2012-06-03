var Events = {};

Events.ButtonClick = function(button, data) {
    this.button = button;
    this.data = data;
};

Events.ListCreated = function(data) {
    this.data = data;
};

Events.ListCreationFailed = function(errors) {
    this.errors = errors;
};

Events.EntryAdded = function(data) {
    this.data = data;
};

Events.EntryAdditionFailed = function(errors) {
    this.errors = errors;
};