const path = require("node:path");



function setupRouting(base,controller,funcs,app){
  var preUrl = base?"base":"";
  for(let method in funcs){
    for(let endpoint in funcs[method]){
      let endpointToUseInUrl=endpoint;
      if(endpoint == "index"){
        endpointToUseInUrl="";
      }
      
      let url = "/"+[base,endpointToUseInUrl].filter(i=>i).join("/");
      let viewLoc = controller+"/"+endpoint;
      console.log(url,"->",method,endpoint);
        app[method](url,(req,res)=>{funcs[method][endpoint](req,res,viewLoc)});
      }
    }
}


module.exports = function(app){
  require("fs").readdirSync(path.resolve(__dirname,"routes")).forEach(function(file) {
    var controller = file.split(".")[0];
    base=controller;
    console.log("-  - - ")
    console.log(file+" - "+controller);
    var funcs = require("./routes/" + file);
    if(controller == "home"){
      base = "";
    }
    setupRouting(base,controller,funcs,app);
  });
}