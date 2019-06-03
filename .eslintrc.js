module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "graphql"
    ],
    "globals": {
        "process": "readonly",
        "test": "readonly",
        "expect": "readonly",
        "describe": "readonly",
        "jest": "readonly"
    },
    "rules": {
        "react/jsx-uses-vars": 2,
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "graphql/template-strings": ['error', {
            env: 'apollo',
        },
        {
            env: 'literal'
        }],
        "graphql/named-operations": ['error', {
        },
        {
            env: 'literal'
        }],
        "graphql/capitalized-type-name": ['warn', {
        },
        {
            env: 'literal'
        }],
    }
};