describe("Navigator", function() {
  var navigator;
  
  beforeEach(function() {
    navigator = new Navigator();
  });
  
  it("should set an element as display", function(){
    var any_display = document.createElement("div");
    
    navigator.setDisplay(any_display);
    
    expect(navigator.display).toEqual(any_display);
  });
  
  it("should accept a jQuery element as display", function(){
    var any_jquery_element = $("<div>");
    
    navigator.setDisplay(any_jquery_element);
    
    expect(navigator.display).toEqual(any_jquery_element);
  });
  
  it("should throw an exception if setting an invalid element as display", function(){
    var anything = "anything";
    
    expect(function() {        
        navigator.setDisplay(anything);
    }).toThrow(Navigator.INVALID_ELEMENT_ERROR);
  });
  
  it("should initialize with an empty view map", function(){
    expect(navigator.map).toEqual({});
  });
  
  it("should set a view map", function() {
    var any_map = getAnyMap();
    
    navigator.setMap(any_map);
    
    expect(navigator.map).toEqual(any_map);
  });
  
  it("should throw an exception if setting an invalid object as view map", function() {
    var invalid_map = "invalid map";
        
    expect(function() {        
      navigator.setMap(invalid_map);
    }).toThrow(Navigator.INVALID_MAP_ERROR);
  });
  
  it("should throw an exception if setting a map with invalid view elements", function() {
    var map_with_invalid_view = {"view": "view"};
        
    expect(function() {        
      navigator.setMap(map_with_invalid_view);
    }).toThrow(Navigator.INVALID_ELEMENT_ERROR);
  });
  
  it("should add a view to the existing map with a defined key", function(){    
    expect(navigator.map).toEqual({});
    
    var the_view = document.createElement("div");
    var the_view_key = "the view";
    navigator.addView(the_view_key, the_view);
    
    expect(navigator.map).toNotEqual({});
    expect(navigator.map[the_view_key]).toEqual(the_view);
  });
  
  it("should throw an exception if adding an invalid view", function() {
    var invalid_view = "view";
        
    expect(function() {        
      navigator.addView(invalid_view);
    }).toThrow(Navigator.INVALID_ELEMENT_ERROR);
  });
  
  it("should set a start view", function() { 
    var navigator = getNavigatorWithDisplay();   
    var the_view = document.createElement("div");
    var any_view_key = "any view";
    navigator.addView(any_view_key, the_view);
    
    expect(navigator.start_view).toBeUndefined();
    navigator.setStartView(the_view);
    expect(navigator.start_view).toEqual(the_view);
  });
  
  it("should throw an exception if setting as start view an invalid element", function() {
    var any_element = "any element";
    
    expect(function() {
      navigator.setStartView(any_element);
    }).toThrow(Navigator.INVALID_ELEMENT_ERROR);
  });
  
  it("should throw an exception if setting as start view a view that is not in the map", function() {
    var any_view = document.createElement("div");
    
    expect(function() {
      navigator.setStartView(any_view);
    }).toThrow(Navigator.view_NOT_IN_MAP);
  });
  
  it("should set a start view by key", function() {
    var the_view = document.createElement("div");
    var the_view_key = "the view";
    navigator.addView(the_view_key, the_view);
    
    expect(navigator.start_view).toBeUndefined();
    navigator.setStartViewByKey(the_view_key);
    expect(navigator.start_view).toEqual(the_view);
  });
  
  it("should throw an exception if setting a start view by a non existant key", function() {
    var non_existant_key = "non existant key";
    
    expect(function(){      
      navigator.setStartViewByKey(non_existant_key);
    }).toThrow(Navigator.NON_EXISTANT_KEY_ERROR);
  });
  
  it("should throw an exception if trying to start navigation without having a start view", function() {
    expect(function() {
      navigator.start()
    }).toThrow(Navigator.NO_START_view_DEFINED);
  });
  
  it("should navigate to a view giving a view", function() {
    var navigator = getNavigatorWithDisplay();
    var the_view = document.createElement("div");
    var any_view_key = "the view";
    navigator.addView(any_view_key, the_view);
    
    navigator.navigateTo(the_view);
    
    expect(navigator.current_view).toEqual(the_view);
  });
  
  it("should navigate to a view giving a view key", function() {
    var navigator = getNavigatorWithDisplay();
    var the_view = document.createElement("div");
    var the_view_key = "the view";
    navigator.addView(the_view_key, the_view);
    
    navigator.navigateTo(the_view_key);
    
    expect(navigator.current_view).toEqual(the_view);
  });
  
  it("should append the view to navigate when navigate to", function() {
    var navigator = getNavigatorWithDisplay();
    var the_view = document.createElement("div");
    var any_view_key = "any view";
    navigator.addView(any_view_key, the_view);
    
    var the_display_children = navigator.display.children;
    expect(the_display_children.length).toEqual(0);
    
    navigator.navigateTo(the_view);
    the_display_children = navigator.display.children;
    expect(the_display_children[0]).toEqual(the_view);
  });
  
  it("should throw an exception if navigating to a non existant key view", function() {
    var non_existant_key = "non existant key";
    
    expect(function(){      
      navigator.navigateTo(non_existant_key);
    }).toThrow(Navigator.NON_EXISTANT_KEY_ERROR);
  });
  
  it("should navigate to start view when navigation starts", function() {
    var the_start_view = document.createElement("div");
    var any_view_key = "the start view";
    navigator.addView(any_view_key, the_start_view);    
    navigator.setStartView(the_start_view);
    
    spyOn(navigator, "navigateTo");
    navigator.start();
    expect(navigator.navigateTo).toHaveBeenCalledWith(the_start_view);
  });
  
  it("should have no current view before navigation start", function() {
    expect(navigator.current_view).toBeUndefined();
  });
  
  it("should set start view as current view after navigation start", function() {
    var navigator = getNavigatorWithDisplay()
    var the_view = document.createElement("div");
    var the_view_key = "the view";
    navigator.addView(the_view_key, the_view);
    
    expect(navigator.current_view).toBeUndefined();
    navigator.setStartViewByKey(the_view_key)
    navigator.start();
    
    expect(navigator.current_view).toEqual(the_view);
    
  });
  
  it("should only display one view each time it navigates", function() {
    var navigator = getNavigatorWithDisplay();
    
    var a_view = document.createElement("div");
    var a_view_key = "a view key";
    navigator.addView(a_view_key, a_view);
    
    var another_view = document.createElement("div");
    var another_view_key = "another view key";
    navigator.addView(another_view_key, another_view);
    
    navigator.navigateTo(a_view);
    expect(navigator.display.children.length).toEqual(1);
    expect(navigator.display.children[0]).toEqual(a_view);
    
    navigator.navigateTo(another_view);
    expect(navigator.display.children.length).toEqual(1);
    expect(navigator.display.children[0]).toEqual(another_view);
  });
  
  var getAnyMap = function() {
    var any_view = document.createElement("div");
    var any_map = {"any view": any_view};
    
    return any_map;
  };
  
  var getNavigatorWithDisplay = function() {
    var navigator = new Navigator();
    var display = document.createElement("div");
    navigator.setDisplay(display);
    
    return navigator;
  }
});