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
    
  it("should navigate to a view giving a view", function() {
    var navigator = getNavigatorWithDisplay();
    var the_view = document.createElement("div");
    
    navigator.navigateTo(the_view);
    
    expect(navigator.current_view).toEqual(the_view);
  });
    
  it("should throw an exception if navigating to an invalid element", function(){
    var anything = "anything";
    
    expect(function() {        
        navigator.navigateTo(anything);
    }).toThrow(Navigator.INVALID_ELEMENT_ERROR);
  });
   
  it("should append the view to navigate when navigate to", function() {
    var navigator = getNavigatorWithDisplay();
    var the_view = document.createElement("div");
    
    var the_display_children = navigator.display.children;
    expect(the_display_children.length).toEqual(0);
    
    navigator.navigateTo(the_view);
    the_display_children = navigator.display.children;
    expect(the_display_children[0]).toEqual(the_view);
  });
    
  it("should only display one view each time it navigates", function() {
    var navigator = getNavigatorWithDisplay();
    
    var a_view = document.createElement("div");
    
    var another_view = document.createElement("div");
    
    navigator.navigateTo(a_view);
    expect(navigator.display.children.length).toEqual(1);
    expect(navigator.display.children[0]).toEqual(a_view);
    
    navigator.navigateTo(another_view);
    expect(navigator.display.children.length).toEqual(1);
    expect(navigator.display.children[0]).toEqual(another_view);
  });
  
  var getNavigatorWithDisplay = function() {
    var navigator = new Navigator();
    var display = document.createElement("div");
    navigator.setDisplay(display);
    
    return navigator;
  }
});