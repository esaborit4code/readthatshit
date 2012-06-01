describe("ListService", function() {
    var original_$_ajax = $.ajax;
    var original_bus = copyClass(Bus);
    
    afterEach(function() {
        $.ajax = original_$_ajax;
        Bus = original_bus;
    });
    
    it("should post via ajax the data to create a new list", function() {
        var the_list_data = {title: "any title", description: "any description"};
        
        var received_params = null;
        $.ajax = function(params) {
            received_params = params;
        };
        
        ListService.createList(the_list_data);
        
        expect(received_params.data).toEqual(the_list_data);
    });
    
    it("should post via ajax to the creation url to create a new list", function() {
        var received_params = null;
        $.ajax = function(params) {
            received_params = params;
        };
        
        ListService.createList();
        
        expect(received_params.url).toEqual(ListService.urls.create);
    });
    
    it("should send an event when list is created", function() {
        var server_response = {};
        $.ajax = function(params) {
            params.success(server_response);
        };
        
        var broadcasted_event = null;
        Bus.broadcast = function(event) {
            broadcasted_event = event;  
        };
        
        ListService.createList();
        
        expect(broadcasted_event instanceof Events.ListCreated).toBeTruthy();
    });
    
    it("should send an event with the server response when list is created", function() {
        var server_response = "any successful response";
        $.ajax = function(params) {
            params.success(server_response);
        };
        
        var broadcasted_event = null;
        Bus.broadcast = function(event) {
            broadcasted_event = event;  
        };
        
        ListService.createList();
        
        expect(broadcasted_event.data).toEqual(server_response);
    });
    
    it("should send an event when the list title is already used", function() {
        var server_response = { errors: [ ListService.LIST_NAME_ALREADY_USED ] };
        $.ajax = function(params) {
            params.success(server_response);
        };
        
        var broadcasted_event = null;
        Bus.broadcast = function(event) {
            broadcasted_event = event;  
        };
        
        ListService.createList();
        
        expect(broadcasted_event instanceof Events.ListCreationFailed).toBeTruthy();
        expect(broadcasted_event.errors).toEqual(server_response.errors);
    });
    
    xit("should throw an event when failed at creating a list");
    
    it("should get a list by its machine name", function() {
        var the_machine_name = "the-machine-name";
        
        var received_params = null;
        $.ajax = function(params) {
            received_params = params;
        }
        
        ListService.getList(the_machine_name);
        
        expect(received_params.url).toEqual(ListService.urls.get + "/" + the_machine_name);
    });
    
    it("should throw an event when list is loaded", function() {
        var server_response = "any successful response";
        $.ajax = function(params) {
            params.success(server_response);
        };
        
        var broadcasted_event = null;
        Bus.broadcast = function(event) {
            broadcasted_event = event;  
        };
        
        ListService.getList();
        
        expect(broadcasted_event instanceof Events.GotList).toBeTruthy();
        expect(broadcasted_event.data).toEqual(server_response);
    });
    
    it("should throw an event when failed at getting a list", function() {
        $.ajax = function(params) {
            params.error();
        };
        
        var broadcasted_event = null;
        Bus.broadcast = function(event) {
            broadcasted_event = event;  
        };
        
        ListService.getList();
        
        expect(broadcasted_event instanceof Events.GetListFailed).toBeTruthy();
    });
});