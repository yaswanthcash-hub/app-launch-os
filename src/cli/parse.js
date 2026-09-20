/**
 * App Launch OS — AST Parser & Analysis Engine
 * Uses @babel/parser and @babel/traverse with attachComment: false
 * to guarantee that comments never trigger false-positive compliance violations.
 */

const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default || require('@babel/traverse');

/**
 * Parses source code into an AST.
 * Comments are explicitly omitted to prevent comment-only false positives.
 */
function parseCode(code, filename = '') {
  if (!code || typeof code !== 'string') return null;

  const isTs = /\.(ts|tsx)$/i.test(filename);
  const isJsx = /\.(jsx|tsx|js)$/i.test(filename);

  const plugins = [
    'classProperties',
    'classPrivateProperties',
    'classPrivateMethods',
    'dynamicImport',
    'exportDefaultFrom',
    'nullishCoalescingOperator',
    'optionalChaining',
    'objectRestSpread',
    'asyncGenerators',
  ];

  if (isTs) {
    plugins.push('typescript');
  }
  if (isJsx || !isTs) {
    plugins.push('jsx');
  }

  try {
    return parser.parse(code, {
      sourceType: 'module',
      attachComment: false,
      plugins,
    });
  } catch (_e) {
    try {
      return parser.parse(code, {
        sourceType: 'unambiguous',
        attachComment: false,
        plugins,
      });
    } catch (_err) {
      return null;
    }
  }
}

/**
 * Extracts AST facts: imported modules, invoked methods/functions,
 * and JSX element properties without inspecting raw comment text.
 */
function analyzeAst(ast) {
  if (!ast) {
    return {
      imports: [],
      calls: [],
      jsxElements: [],
      stringLiterals: [],
    };
  }

  const imports = [];
  const calls = [];
  const jsxElements = [];
  const stringLiterals = [];

  traverse(ast, {
    ImportDeclaration(path) {
      imports.push({
        source: path.node.source.value,
        specifiers: path.node.specifiers.map((s) => s.local.name),
      });
    },
    CallExpression(path) {
      const callee = path.node.callee;
      let name = '';
      if (callee.type === 'Identifier') {
        name = callee.name;
      } else if (callee.type === 'MemberExpression') {
        if (callee.property.type === 'Identifier') {
          name = callee.property.name;
        }
      }
      if (name) {
        // Collect string arguments if any
        const stringArgs = path.node.arguments
          .filter((arg) => arg.type === 'StringLiteral')
          .map((arg) => arg.value);
        calls.push({ name, stringArgs, node: path.node });
      }
    },
    StringLiteral(path) {
      // Collect relevant string literals in the code (e.g. endpoint URLs or storage keys)
      if (path.node.value && typeof path.node.value === 'string') {
        stringLiterals.push(path.node.value);
      }
    },
    JSXText(path) {
      // Collect text inside JSX tags (e.g. <Text>Terms of Service</Text>)
      if (path.node.value && typeof path.node.value === 'string') {
        const trimmed = path.node.value.trim();
        if (trimmed) {
          stringLiterals.push(trimmed);
        }
      }
    },
    JSXOpeningElement(path) {
      let tagName = '';
      if (path.node.name.type === 'JSXIdentifier') {
        tagName = path.node.name.name;
      } else if (path.node.name.type === 'JSXMemberExpression') {
        tagName = `${path.node.name.object.name}.${path.node.name.property.name}`;
      }

      const attributes = {};
      for (const attr of path.node.attributes) {
        if (attr.type === 'JSXAttribute' && attr.name && attr.name.name) {
          const attrName = attr.name.name;
          if (attr.value) {
            if (attr.value.type === 'StringLiteral') {
              attributes[attrName] = attr.value.value;
            } else if (attr.value.type === 'JSXExpressionContainer') {
              attributes[attrName] = true;
            }
          } else {
            attributes[attrName] = true;
          }
        }
      }

      jsxElements.push({
        name: tagName,
        attributes,
      });
    },
  });

  return {
    imports,
    calls,
    jsxElements,
    stringLiterals,
  };
}

module.exports = {
  parseCode,
  analyzeAst,
};
