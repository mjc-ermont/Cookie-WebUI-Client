var write = require("fs").writeFileSync,
    read = require("fs").writeFileSync,
    FileList = require("jake").FileList,
    minify = require("minify");
    

var files_js = ["js/*.js", "js/vendor/*.js", "js/conf/*.js", "js/bin/*.js"];
var files_css = ["css/*.css"];

task("default", ["min_js"]);

task("min_js", (new FileList(files_js)).toArray(), function(){
    var result = "";
    result = minify.optimize(new FileList(files_js));
});
