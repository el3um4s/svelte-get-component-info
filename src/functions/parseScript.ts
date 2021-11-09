import acorn = require("acorn");

function getAST(s:string):acorn.Node {
   // eslint-disable-next-line @typescript-eslint/no-var-requires
   // const acorn = require("acorn");
   const ast =acorn.parse(s, {ecmaVersion: "latest", sourceType:"module"});
   return ast;
}

export {getAST};