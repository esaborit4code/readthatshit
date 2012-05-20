describe("URLReader", function() {
  var section_separator = "#";
  var parameter_separator = "/";
   
  it("should return the parameters after the section separator using a determined char to sepparate parameters", function() {
    var first_parameter = "first";
    var second_parameter = "second";
    var the_url = "example#" + first_parameter + "/" + second_parameter;
    
    var the_parameters = URLReader.getParameters(the_url, section_separator, parameter_separator);
    expect(the_parameters[0]).toEqual(first_parameter);
    expect(the_parameters[1]).toEqual(second_parameter);
  });
  
  it("should return an empty array if url has no parameter separator", function () {
    var the_url = "example";
      
    var the_parameters = URLReader.getParameters(the_url, section_separator, parameter_separator);
    
    expect(the_parameters).toEqual([]);
  });
  
  it("should return an empty array if url has no parameter section", function () {
    var the_url = "example#";
      
    var the_parameters = URLReader.getParameters(the_url, section_separator, parameter_separator);
    
    expect(the_parameters).toEqual([]);
  });
});