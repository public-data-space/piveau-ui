module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: {
        'parser': 'babel-eslint',
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    env: {
        node: true,
        browser: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/recommended'
    ],
    rules: {
        'no-console': 'warn',
        'vue/no-use-v-if-with-v-for': 'warn',
        'vue/require-valid-default-prop': 'warn',
        'vue/require-v-for-key': 'warn',
        'vue/valid-v-for': 'warn',
        'vue/no-unused-components': 'warn',
        'vue/no-side-effects-in-computed-properties': 'warn'
    }
}