export default function (babel){
    const {types: t} = babel;
    return {
        name: "directives-react",
        visitor: {
            JSXAttribute(path){
              if(path.node.name.name?.startsWith("r-")){
                const directive = path.node.name.name;   
                const expression = path.node.value.expression;
                if(directive === 'r-if' && expression){
                    const jsxElement = path.findParent((p) => p.isJSXElement());
                    jsxElement.replaceWith(
                        t.jSXExpressionContainer(
                            t.logicalExpression("&&", expression, jsxElement.node)
                        )
                    );
                    path.remove();
                }
              }
            }
        }
    }
}