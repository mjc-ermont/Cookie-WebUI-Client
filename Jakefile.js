var write = require("fs").writeFileSync,
    read = require("fs").readFileSync,
    FileList = require("jake").FileList,
    UglifyJS = require("uglify-js2"),
    cleanCSS = require('clean-css'),
    copy = require("jake").cpR;

var files_js = ["js/*-vendor/*.js", "js/bin/*.js", "js/conf/*.js", "js/*.js"];
var files_css = ["css/*.css"];

task("default", ["build", "min_js", "min_css", "copy_img"]);

task("min_js", (new FileList(files_js)).toArray(), function(){
    var result = UglifyJS.minify((new FileList(files_js)).sort());
    write("build/min.js", result.code);
    console.log("Minified JS");
});

task("min_css", (new FileList(files_css)).toArray(), function(){
    var result = "";
    (new FileList(files_css)).forEach(function(file){
        result += cleanCSS.process(read(file, "utf-8"));
    });
    write("build/min.css", result);
    console.log("Minified CSS");
});

task("copy_img", (new FileList("css/images/*")).toArray(), function(){
    copy("css/images", "build");
    //console.log("Images copied");
});

directory("build");