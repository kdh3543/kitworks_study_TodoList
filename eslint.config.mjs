import pluginJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 적용 파일 설정
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: globals.browser } },

  // 기본 ESLint와 React 설정
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,

  // Prettier 규칙 비활성화
  prettierConfig,

  // import 규칙 추가
  {
    plugins: { import: pluginImport },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off', // prop-types 관련 경고 // TODO: 타입스크립트 적용
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // React, Node.js 기본 모듈
            'external', // 외부 라이브러리 (npm)
            'internal', // 내부 프로젝트 모듈
            'parent', // 상대경로 부모 import
            'sibling', // 같은 디렉토리의 파일
            'index', // index 파일
          ],
          'newlines-between': 'always', // 그룹 간 줄바꿈
          alphabetize: {
            order: 'asc', // 알파벳 순서로 정렬
            caseInsensitive: true, // 대소문자 무시
          },
        },
      ],
    },
  },
];
