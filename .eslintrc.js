module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "plugin:vue/essential",
        "eslint:recommended",
        "@vue/typescript/recommended",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended"
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        camelcase: 0,
        "space-before-function-paren": 0,
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 1,
        'vue/attributes-order': 'warn',
        "vue/attribute-hyphenation": 0,
        "vue/html-closing-bracket-newline": 0,
        "vue/html-closing-bracket-spacing": 0,
        "vue/mustache-interpolation-spacing": 0,
        "vue/html-self-closing": ["error", {
            "html": {
                "void": "any",
                "normal": "any",
                "component": "always"
            },
            "svg": "always",
            "math": "always"
        }],
        "vue/max-attributes-per-line": 0,
        "vue/multiline-html-element-content-newline": 0,
        "vue/singleline-html-element-content-newline": 0,
        "vue/require-default-prop": 0,
        "vue/order-in-components": [
            "error",
            {
                order: [
                    "el",
                    "name",
                    "parent",
                    "functional",
                    ["delimiters", "comments"],
                    ["components", "directives", "filters"],
                    "extends",
                    "mixins",
                    "inheritAttrs",
                    "model",
                    ["props", "propsData"],
                    "data",
                    "computed",
                    "watch",
                    "LIFECYCLE_HOOKS",
                    "methods",
                    ["template", "render"],
                    "renderError"
                ]
            }
        ],
        "vue/valid-template-root": 0,
        "@typescript-eslint/type-annotation-spacing": 0,
        "@typescript-eslint/camelcase": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/ban-ts-ignore": 0,
        "@typescript-eslint/member-delimiter-style": 0,
        "@typescript-eslint/interface-name-prefix": 0,
        "@typescript-eslint/no-non-null-assertion": 0,
        "@typescript-eslint/no-unused-vars": 0,
        "prefer-rest-params": 0,
        "no-prototype-builtins": 0,
        "@typescript-eslint/no-use-before-define": 0,
        
        "prettier/prettier": 1
    }
}
