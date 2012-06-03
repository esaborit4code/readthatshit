var ListService = function() {};

ListService.LIST_NAME_ALREADY_USED = "LIST NAME ALREADY USED";
ListService.LIST_DOES_NOT_EXIST = "LIST DOES NOT EXIST";

ListService.urls = {
    create: Config.SERVICES_BASE_PATH + "/list/create",
    add_entry: Config.SERVICES_BASE_PATH + "/list/add-entry"
};

ListService.createList = function (list_data) {
    $.ajax({
        url: ListService.urls.create,
        data: list_data,
        success: ListService.onCreateListResponse
    });
};

ListService.onCreateListResponse = function(response) {
    var response_has_errors = (response.errors != null && response.errors[0] != null);
    if(response_has_errors) {
        var event = new Events.ListCreationFailed(response.errors);
        Bus.broadcast(event);
        return;
    }
    
    var event = new Events.ListCreated(response);
    Bus.broadcast(event);
};

ListService.addEntry = function(list_machine_name, entry_data) {
    var data = {list: list_machine_name, entry: entry_data};
    $.ajax({
        url: ListService.urls.add_entry,
        data: data,
        success: ListService.onAddEntryResponse
    });
};

ListService.onAddEntryResponse = function(response) {
    var response_has_errors = (response.errors != null && response.errors[0] != null);
    if(response_has_errors) {
        var event = new Events.EntryAdditionFailed(response.errors);
        Bus.broadcast(event);
        return;
    }
    
    var event = new Events.EntryAdded(response);
    Bus.broadcast(event);
};