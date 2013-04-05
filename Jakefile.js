var write = require("fs").writeFileSync,
    read = require("fs").readFileSync,
    FileList = require("jake").FileList,
    UglifyJS = require("uglify-js2"),
    cleanCSS = require('clean-css'),
    HTMLMinifier = require('html-minifier');

var files_js = ["js/*-vendor/*.js", "js/bin/*.js", "js/conf/*.js", "js/*.js"];
var files_css = ["css/*.css"];

task("default", ["min_js", "cat_css"]);

task("min_js", (new FileList(files_js)).toArray(), function(){

        var result = UglifyJS.minify((new FileList(files_js)).sort());
        write("build/min.js", result.code);
        console.log("Minified JS");
});

task("min_css", (new FileList(files_css)).toArray(), function(){
    var i = 0;
    (new FileList(files_css)).forEach(function(file){
        var result = cleanCSS.process(read(file, "utf-8"));
        write("min/" + i + ".min.css", result);
        console.log("Minified " + file);
        i++;
    });
});

task("cat_css", ["min_css"], function() {
    var result = "";
    new FileList("min/*.min.css").forEach(function(name){
        result += read(name, "utf-8");
        console.log("Written " + name);
    });
    write("build/min.css", result);
    console.log("Written CSS");
});