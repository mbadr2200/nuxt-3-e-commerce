// @ts-check
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    ignores: [
      // Ignore build and dist directories
      '**/dist/',
      '**/build/',
      // Ignore specific file types
      '**/*.min.js',
      '**/*.d.ts',
      // Ignore node modules
      '**/node_modules/',
      // Ignore specific files
      '.nuxt/',
      '.output/',
      '.vscode/',
      '.husky/',
      // Ignore specific patterns
      '**/*.config.js',
      '**/*.config.mjs',
      '**/*.md',
      '**/*.config.ts',
      '**.toml'
    ],
    vue: {
      overrides: {
        "vue/define-macros-order": ["error", {
          "order": ["enum", "interface", "defineOptions", "defineProps", "defineEmits", "defineSlots"]
        }],
      }
    },
    typescript: {
      tsconfigPath: './tsconfig.json',
      parserOptions: {
        projectService: true,
        project: './tsconfig.json',
        extraFileExtensions: ['.vue'],
      },
      overrides: {
        'node/prefer-global/process': 'off',
        'style/quote-props': 'off',
        'vue/prop-name-casing': ['error', 'camelCase'],
        'vue/require-name-property': 'error',
        // TypeScript rules

        "ts/consistent-type-definitions": "warn",
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'off',
        camelcase: [
          'error',
          {
            ignoreDestructuring: false,
            ignoreImports: false,
            ignoreGlobals: false,
            properties: 'always',
          },
        ],
        'vue/camelcase': [
          'error',
          {
            ignoreDestructuring: false,
            ignoreImports: false,
            ignoreGlobals: false,
          },
        ],
        'vue/component-api-style': ['error', ['script-setup']],
        'vue/block-order': [
          'error',
          {
            order: ['script[setup]', 'template', 'style'],
          },
        ],
        'vue/block-lang': [
          'error',
          {
            script: { lang: 'ts' },
          },
        ],
        'ts/naming-convention': [
          'error',
          {
            selector: ['interface', 'typeAlias', 'typeLike', 'enum'],
            format: ['PascalCase'],
          },
        ],
        'vue/multi-word-component-names': 'off',
        'vue/component-definition-name-casing': ['error', 'PascalCase'],
        'no-console': 'error',
        'no-debugger': 'error',
        'ts/no-unsafe-member-access': 'error',
        'ts/strict-boolean-expressions': 'off',
        curly: ['off', 'all'],
      },
    },
    formatters: {
      css: true,
      html: true,
    },
    stylistic: {
      semi: false,
      quotes: 'single',
      indent: 2,
    },
  }),
)
