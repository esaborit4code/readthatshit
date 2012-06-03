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
    
    it("should post via ajax the data of a new entry to the specific url", function() {
        var the_list_machine_name = "any-list";
        var the_entry_data = {title: "any title", description: "any description", url: "any url"};
        
        var expected_params = {list: the_list_machine_name, entry: the_entry_data};
        var received_params = null;
        $.ajax = function(params) {
            received_params = params;
        };
        
        ListService.addEntry(the_list_machine_name, the_entry_data);
        
        expect(received_params.data.entry).toEqual(the_entry_data);
        expect(received_params.data.list).toEqual(the_list_machine_name);
        expect(received_params.url).toEqual(ListService.urls.add_entry);
    });
    
    it("should send an event with the server response when entry is added", function() {
        var server_response = "any successful response";
        $.ajax = function(params) {
            params.success(server_response);
        };
        
        var broadcasted_event = null;
        Bus.broadcast = function(event) {
            broadcasted_event = event;  
        };
        
        ListService.addEntry();
        
        expect(broadcasted_event.data).toEqual(server_response);
        expect(broadcasted_event instanceof Events.EntryAdded).toBeTruthy();
    });
    
    it("should send an event when the list where entry is added does not exist", function() {
        var server_response = { errors: [ ListService.LIST_DOES_NOT_EXIST ] };
        $.ajax = function(params) {
            params.success(server_response);
        };
        
        var broadcasted_event = null;
        Bus.broadcast = function(event) {
            broadcasted_event = event;  
        };
        
        ListService.addEntry();
        
        expect(broadcasted_event.errors).toEqual(server_response.errors);
        expect(broadcasted_event instanceof Events.EntryAdditionFailed).toBeTruthy();
    });
});