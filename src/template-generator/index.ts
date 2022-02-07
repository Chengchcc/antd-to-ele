import {
  traverse,
  isPlainElementNode,
  RootNode,
  isDirectiveNode,
} from "@vuedx/template-ast-types";
import assert from "assert";
import { stringify } from "./stringify";
import { FACTORY } from "./factory";
import DirectiveHandler from "./factory/Directive";
import RefHandler from "./factory/Ref";
export default class TemplateGenerator {
  ast!: RootNode;

  constructor(options?: { ast: RootNode }) {
    if (options?.ast) {
      this.ast = options?.ast;
    }
  }

  generate(ast?: RootNode): Promise<string> {
    ast && (this.ast = ast);
    assert.ok(this.ast, "ast required");
    return new Promise((resolve, reject) => {
      const code = stringify(this.ast.children);
      resolve(code!);
    });
  }

  transform(ast?: RootNode) {
    ast && (this.ast = ast);
    assert.ok(this.ast, "ast required");
    traverse(this.ast, (node, ancestors, state) => {
      if (isPlainElementNode(node)) {
        const impl = FACTORY[node.tag];
        if (impl) {
          RefHandler(node, ancestors as any);
          impl(node, ancestors, state);
        }
      } else if (isDirectiveNode(node)) {
        DirectiveHandler(node, ancestors as any);
      }
    });
    return this;
  }
}
