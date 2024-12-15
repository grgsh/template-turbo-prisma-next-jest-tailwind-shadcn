# Jest

## How to implement jest for a new project

### 1. Install dependencies

```bash
pnpm -F <name-of-your-project> add -D \
jest jest-environment-jsdom ts-node @swc/jest \
@testing-library/jest-dom @testing-library/react \
@testing-library/user-event @types/jest
```

### 2. Add `@repo/jest-config` as devDependency

```jsonc
// Your project's package.json
{
  // ...
  "devDependencies": {
    // ...
    "@repo/jest-config": "workspace:*",
    // ...
  }
  // ...
}
```

### 3. Apply the manual dependency addition

```bash
pnpm install
```

### 4. Copy template config files

- `/packages/config-jest/templates/jest.config.ts` ->
  `<your-project-path>/jest.config.ts`
- `/packages/config-jest/templates/global.d.ts` ->
  `<your-project-path>/global.d.ts`

### 5. Done! 🎉
