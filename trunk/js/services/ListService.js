var ListService = function() {};

ListService.LIST_NAME_ALREADY_USED = "LIST NAME ALREADY USED";

ListService.urls = {
    create: Config.SERVICES_BASE_PATH + "/list/create"
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