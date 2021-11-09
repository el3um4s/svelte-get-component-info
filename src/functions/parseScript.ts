import acorn = require("acorn");
import walk = require("acorn-walk");

function getAST(s:string):acorn.Node {
   const ast = acorn.parse(s, {ecmaVersion: "latest", sourceType:"module", locations: true});
   return ast;
}

function getArryOfExportedNameDeclaration(s:acorn.Node):Array<acorn.Node> {
   const result: Array<acorn.Node> = [];
   walk.simple(s, {
      ExportNamedDeclaration(node) {
         result.push(node);
      }
   });

   return result;
}

// function convertExportedNameToObject(s:acorn.Node) {}


export {getAST, getArryOfExportedNameDeclaration};
