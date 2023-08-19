import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    watch: false,
    environment: 'node',
    reporters: ['verbose'],
    coverage: {
      include: ['lib/**/*.ts'],
      reporter: ['lcov', "text", "html"],
      all: true,
      lines: 85,
      functions: 90,
      branches: 95,
      statements: 85,
    },
  },
})
