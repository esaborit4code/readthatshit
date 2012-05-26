function Navigator() {
    this.display;
    this.current_view;
};

Navigator.prototype.setDisplay = function(display) {
    Html.checkIfValidHTMLElement(display);
    
    this.display = display;
};

Navigator.prototype.navigateTo = function(view) {
    Html.checkIfValidHTMLElement(view);
    if(this.display.hasChildNodes()) {
        this.display.removeChild(this.display.firstChild);
    }
    this.display.appendChild(view);
    this.current_view = view;
};