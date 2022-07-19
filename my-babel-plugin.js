module.exports = function myBabelPlugin() {
  return {
    visitor: {
      // Identifier(path) {
      //   const name = path.node.name;

      //   // 바벨이 만든 AST 노드를 출력한다.
      //   console.log('Identifier() name:', name);

      //   path.node.name = name
      //           .split("")
      //           .reverse()
      //           .join("");
      // }
      VariableDeclaration(path) {
        console.log('VariableDeclaration() kind:', path.node.kind); // const

        // const => bar 변환
        if (path.node.kind === 'const') {
          path.node.kind = 'var';
        }
      }
    }
  } 
}