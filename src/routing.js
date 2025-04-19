const path = require("node:path");



function setupRouting(base,funcs,app){
  var preUrl = base?"base":"";
  for(let method in funcs){
    for(let endpoint in funcs[method]){
      let endpointToUseInUrl=endpoint;
      if(endpoint == "index"){
        endpointToUseInUrl="";
      }
      
      let url = "/"+[base,endpointToUseInUrl].filter(i=>i).join("/")
      console.log(url,"->",method,endpoint);
        app[method](url,(req,res)=>{funcs[method][endpoint](req,res)});
      }
    }
}


module.exports = function(app){
  require("fs").readdirSync(path.resolve(__dirname,"routes")).forEach(function(file) {
    var base = file.split(".")[0];
    console.log("-  - - ")
    console.log(file+" - "+base);
    var funcs = require("./routes/" + file);
    if(base == "home"){
      base = "";
    }
    setupRouting(base,funcs,app);
  });
}