import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import nuxtEslint from "@nuxtjs/eslint-config-typescript"


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  ...nuxtEslint,
  {
    rules: {
      "vue/multi-word-component-names": "off"
    }, 
  },
  {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
];