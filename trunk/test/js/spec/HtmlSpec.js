describe("Html", function() {
    it("should trhow an exception when checking an invalid element", function() {
        var anything = "anything";
        
        expect(function() {        
            Html.checkIfValidHTMLElement(anything);
        }).toThrow(Html.INVALID_ELEMENT_ERROR);
    });
});