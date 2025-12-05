export default function (babel, options = {}){
    const {types: t} = babel;
    const { removeUnusedVars = true } = options;
    return {
        name: "optimize-code",
        visitor: {
            VariableDeclarator(path){
                if(!removeUnusedVars) return;
                //获取到当前变量的绑定信息，path.node.id.name  // → "aaa"
                const binding = path.scope.getBinding(path.node.id.name);
                //references 变量的引用次数
                if (binding && binding.references === 0) {
                    // 跳过 React Refresh 注入的变量（通常以 _ 开头）
                    if (path.node.id.name.startsWith('_')) return;
                    console.log(path.node.id.name);// → "aaa"
                    if (path.parent.declarations.length === 1) {
                        //这种情况是const aaa = 1;
                        path.parentPath.remove();
                    } else {
                        //这种情况是声明了多个const aaa = 1, bbb = 2;，只移除当前变量的声明
                        path.remove();
                    }
                }
                
            }
        }
    }
}