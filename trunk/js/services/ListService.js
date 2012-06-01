var ListService = function() {};

ListService.LIST_NAME_ALREADY_USED = "LIST NAME ALREADY USED";

ListService.urls = {
    create: Config.SERVICES_BASE_PATH + "/list/create",
    get: Config.SERVICES_BASE_PATH + "/list/get"
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

ListService.getList = function(machine_name) {
    $.ajax({
        url: ListService.urls.get + "/" + machine_name,
        success: ListService.onGetListResponse,
        error: ListService.onGetListFailed
    });
};

ListService.onGetListResponse = function(response) {
    var event = new Events.GotList(response);
    Bus.broadcast(event);
};

ListService.onGetListFailed = function() {
    var event = new Events.GetListFailed();
    Bus.broadcast(event);
};