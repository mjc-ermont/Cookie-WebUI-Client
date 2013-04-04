var write = require("fs").writeFileSync,
    FileList = require("jake").FileList,
    UglifyJS = require("uglify-js2");
    

var files_js = ["js/*.js", "js/vendor/*.js", "js/conf/*.js", "js/bin/*.js"]

task("default", ["build/min.js"]);
directory("build");


var deps = (new FileList(files_js)).toArray();
deps.unshift("build");

file("build/min.js", deps, function(){
    var result = "";

    result = UglifyJS.minify(new FileList(files_js));

    write("build/min.js", result.code);
    //return result.code;
});
