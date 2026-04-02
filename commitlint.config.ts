type CommitlintRule = readonly [
  severity: 0 | 1 | 2,
  when: 'always' | 'never',
  value?: string | readonly string[],
]

const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'style', 'docs', 'test', 'build', 'chore'],
    ],
    'type-case': [2, 'always', 'lower-case'],
  },
} satisfies {
  extends: string[]
  rules: Record<string, CommitlintRule>
}

export default config
