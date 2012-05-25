describe("ListCreationView", function() {
    it("should have a template", function() {
        var a_view = new ListCreationView();
        expect(a_view.template).toNotEqual(null);
    });
});