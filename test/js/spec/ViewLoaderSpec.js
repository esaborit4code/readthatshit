describe("ViewLoader", function() {
    var template_file = "dummy file";
    var dummy_text = "dummy text";
    var dummy_html = "<p>" + dummy_text + "</p>";
        
    var original_$_ajax = $.ajax;
    
    afterEach(function() {
        $.ajax = original_$_ajax;
        ViewLoader.cache = {};
    });
    
    it("should get a template via ajax when it is requested", function() {
        ajax_params_passed = null;
        $.ajax = function(params) {
            ajax_params_passed = params;
            params.success(dummy_html);
        };
        
        var element = ViewLoader.getElementFromTemplateFile(template_file);

        var template_full_path = Config.HtmlTemplatesPath + "/" + template_file;
        expect(ajax_params_passed.url).toEqual(template_full_path);
        expect(element.innerHTML).toEqual(dummy_text);
    });
    
    it("should get a template via ajax only the first time it is requested", function() {
        called_times = 0;
        $.ajax = function(params) {
            called_times++;
            params.success(dummy_html);
        };
        
        ViewLoader.getElementFromTemplateFile(template_file);
        ViewLoader.getElementFromTemplateFile(template_file);
        
        expect(called_times).toEqual(1);
    });
    
    it("should throw an exception when loading an invalid template", function() {
        $.ajax = function(params) {
            params.success("dummy invalid template");
        };
        
        expect(function() {
            ViewLoader.getElementFromTemplateFile(template_file);
        }).toThrow(ViewLoader.INVALID_TEMPLATE);
    });

    it("should throw an exception when getting template via ajax call fails", function() {
        ViewLoader.template_html = null;
        
        $.ajax = function(params) {
            params.error();
        };
        
        expect(function() {
            ViewLoader.getElementFromTemplateFile(template_file);
        }).toThrow(ViewLoader.TEMPLATE_LOAD_ERROR);
    });
});