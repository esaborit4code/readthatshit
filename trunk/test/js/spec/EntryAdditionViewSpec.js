describe("EntryAdditionView", function() {
    var the_view;
    var original_bus = copyClass(Bus);
    var original_$_ajax = $.ajax;
    
    beforeEach(function(){
        Bus = original_bus;
        $.ajax = original_$_ajax;

        the_view = new EntryAdditionView();
    });
    
    it("should get its template via ajax when instance", function() {
        EntryAdditionView.template_html = null;
        
        ajax_params_passed = null;
        $.ajax = function(params) {
            ajax_params_passed = params;
            original_$_ajax(params);
        };
        
        new EntryAdditionView();
        
        var template_full_path = Config.HtmlTemplatesPath + "/" + EntryAdditionView.template_file;
        expect(ajax_params_passed.url).toEqual(template_full_path);
    });
    
    it("should get its template via ajax when first instance", function() {
        EntryAdditionView.template_html = null;
        
        called_times = 0;
        $.ajax = function(params) {
            called_times++;
            original_$_ajax(params);
        };
        
        new EntryAdditionView();
        new EntryAdditionView();
        
        expect(called_times).toEqual(1);
    });
    
    it("should throw an exception when loading an invalid template", function() {
        EntryAdditionView.template_html = null;
        
        $.ajax = function(params) {
            params.success("dummy invalid template");
        };
        
        expect(function() {
            new EntryAdditionView();
        }).toThrow(EntryAdditionView.INVALID_TEMPLATE);
    });
      
    it("should throw an exception when getting template via ajax call fails", function() {
        EntryAdditionView.template_html = null;
        
        $.ajax = function(params) {
            params.error();
        };
        
        expect(function() {
            new EntryAdditionView();
        }).toThrow(EntryAdditionView.TEMPLATE_LOAD_ERROR);
    });
    
    it("should have an element", function() {
        expect(the_view.element).toNotEqual(null);
    });
    
    it("should have a valid html element as element", function() {
        var thrown_exception = null;
        try {
            Html.checkIfValidHTMLElement(the_view.element);
        }
        catch(exception) {
            thrown_exception = exception;
        }
        expect(thrown_exception).toBeNull();
    });
    
    it("should have a form", function() {
        expect(the_view.form).toNotEqual(null);
        expect(the_view.form.tagName.toLowerCase()).toEqual("form");
    });

    it("should have a save button", function() {
        expect(the_view.save_button).toNotEqual(null);
    });

    it("should send an event when clicking on save button", function() {
        var broadcasted_event = null;
        Bus.broadcast = function(event) {
            broadcasted_event = event;  
        };
        
        the_view.save_button.click();
        
        expect(broadcasted_event instanceof Events.ButtonClick).toBeTruthy();
        expect(broadcasted_event.button).toEqual(the_view.save_button);
    });
    
    it("should return its data", function() {
        var any_title = "any title";
        var any_url = "any url";
        var any_description = "any description";
        
        the_view.form.title.value = any_title;
        the_view.form.url.value = any_url;
        the_view.form.description.value = any_description;
        
        var expected_data = { "title": any_title, "url": any_url, "description": any_description };
        
        var data = the_view.getData();
        
        expect(data).toEqual(expected_data);
    });
    
    it("should send an event with its data on it when clicking on save button", function() {
        var any_title = "any title";
        var any_url = "any url";
        var any_description = "any description";
        
        the_view.form.title.value = any_title;
        the_view.form.url.value = any_url;
        the_view.form.description.value = any_description;
        
        var broadcasted_event = null;
        Bus.broadcast = function(event) {
            broadcasted_event = event;  
        };
        
        var expected_data = { "title": any_title, "url": any_url, "description": any_description };
        
        the_view.save_button.click();
        
        expect(broadcasted_event instanceof Events.ButtonClick).toBeTruthy();
        expect(broadcasted_event.button).toEqual(the_view.save_button);
        expect(broadcasted_event.data).toEqual(expected_data);
    });
});