var Bus = function() {};
Bus.subscriptions = [];

Bus.subscribe = function(subscriber, event_type) {
    var subscription = Bus.getSubscription(event_type);
    Bus.subscriptions.splice(subscription);
    
    var event_has_no_subscribers = (subscription == null);   
    if(event_has_no_subscribers) {
        subscription = {};
        subscription.event_type = event_type;
        subscription.subscribers = [];
    }
    
    subscription.subscribers.push(subscriber);    
    Bus.subscriptions.push(subscription);
};

Bus.getSubscription = function(event_type_to_search) {
    for(subscription_index in Bus.subscriptions) {
        var subscription = Bus.subscriptions[subscription_index];
        var is_this_event_type = (subscription.event_type == event_type_to_search);
        return subscription;
    }
    
    return null;
};

Bus.getSubscribers = function(event_type) {
    var subscription = Bus.getSubscription(event_type);
    
    var no_subscription_found = (subscription == null);
    if(no_subscription_found) {
        return [];
    }
    
    return subscription.subscribers;
};

Bus.broadcast = function(event) {
    var subscribers = Bus.getSubscribers(event.constructor);
    
    for(subscriber_index in subscribers) {
        var subscriber = subscribers[subscriber_index];
        subscriber(event);
    }
};