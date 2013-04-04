var write = require("fs").writeFileSync,
    read = require("fs").readFileSync,
    FileList = require("jake").FileList,
    UglifyJS = require("uglify-js2"),
    cleanCSS = require('clean-css'),
    HTMLMinifier = require('html-minifier');

var files_js = ["js/*.js", "js/vendor/*.js", "js/conf/*.js", "js/bin/*.js"];
var files_css = ["css/*.css"];

task("default", ["min_js", "min_css"]);

task("min_js", (new FileList(files_js)).toArray(), function(){
    var i = 0;
    (new FileList(files_js)).forEach(function(file){
        var result = UglifyJS.minify(file);
        write("min/" + i + ".min.js", result.code);
        console.log("Written " + file);
        i++;
    });
});

task("min_css", (new FileList(files_css)).toArray(), function(){
    var i = 0;
    (new FileList(files_css)).forEach(function(file){
        var result = cleanCSS.process(read(file, "utf-8"));
        write("min/" + i + ".min.css", result);
        console.log("Written " + file);
        i++;
    });
});