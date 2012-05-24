describe("Bus", function() {
    var DummyEvent = function(){};
    var AnotherDummyEvent = function(){};
    
    beforeEach(function() {
        Bus.subscriptions = [];
    });
    
    it("should subscribe an event handler to an event type", function() {
        expect(Bus.subscriptions).toEqual([]);
        
        var dummy_event_handler = "dummy event handler";
        Bus.subscribe(dummy_event_handler, DummyEvent);
        var subscribers = Bus.getSubscribers(DummyEvent);        
        expect(subscribers).toContain(dummy_event_handler);
    });
    
    it("should subscribe an event handler to more than an event type", function() {
        expect(Bus.subscriptions).toEqual([]);
        
        var dummy_event_handler = "dummy event handler";
        Bus.subscribe(dummy_event_handler, DummyEvent);
        Bus.subscribe(dummy_event_handler, AnotherDummyEvent);
        
        var subscribers = Bus.getSubscribers(DummyEvent);
        expect(subscribers).toContain(dummy_event_handler);
        
        subscribers = Bus.getSubscribers(AnotherDummyEvent);
        expect(subscribers).toContain(dummy_event_handler);
    });
    
    it("should subscribe more than one event handler to an event type", function() {        
        var dummy_event_handler = "dummy event handler";
        var another_dummy_event_handler = "another dummy event handler";
        
        Bus.subscribe(dummy_event_handler, DummyEvent);
        Bus.subscribe(another_dummy_event_handler, DummyEvent);
        
        var subscribers = Bus.getSubscribers(DummyEvent);
        
        expect(subscribers).toContain(dummy_event_handler);
        expect(subscribers).toContain(another_dummy_event_handler);
    });
       
    it("should subscribe more than an event handler to more than an event type", function() {
        expect(Bus.subscriptions).toEqual([]);
        
         var dummy_event_handler = "dummy event handler";
        var another_dummy_event_handler = "another dummy event handler";
        
        Bus.subscribe(dummy_event_handler, DummyEvent);
        Bus.subscribe(another_dummy_event_handler, DummyEvent);
        
        Bus.subscribe(dummy_event_handler, AnotherDummyEvent);
        Bus.subscribe(another_dummy_event_handler, AnotherDummyEvent);
        
        var subscribers = Bus.getSubscribers(DummyEvent);
        expect(subscribers).toContain(dummy_event_handler);
        expect(subscribers).toContain(another_dummy_event_handler);
        
        subscribers = Bus.getSubscribers(AnotherDummyEvent);
        expect(subscribers).toContain(dummy_event_handler);
        expect(subscribers).toContain(another_dummy_event_handler);
    });
    
    it("should broadcast an event to a subscriber", function() {
        var dummy_thing = {};
        dummy_thing.handler = function() {};        
        spyOn(dummy_thing, "handler");
        
        Bus.subscribe(dummy_thing.handler, DummyEvent);
        
        var the_event = new DummyEvent();
        Bus.broadcast(the_event);
        
        expect(dummy_thing.handler).toHaveBeenCalledWith(the_event);        
    });
    
    it("should broadcast an event to more than a subscriber", function() {
        var dummy_thing = {};
        dummy_thing.handler = function() {};
        dummy_thing.another_handler = function() {};
        spyOn(dummy_thing, "handler");
        spyOn(dummy_thing, "another_handler");
        
        Bus.subscribe(dummy_thing.handler, DummyEvent);
        Bus.subscribe(dummy_thing.another_handler, DummyEvent);
        
        var the_event = new DummyEvent();
        Bus.broadcast(the_event);
        
        expect(dummy_thing.handler).toHaveBeenCalledWith(the_event);   
        expect(dummy_thing.another_handler).toHaveBeenCalledWith(the_event);        
    });
});