# This is how to setup your typescript project

---

## Phase 1: Basic Initialization

First, create your project folder and initialize it.

```bash
mkdir my-node-project
cd my-node-project
npm init -y

```

### Install Dependencies

You’ll need the TypeScript compiler, Node.js type definitions, and a "runner" for development.

* **`typescript`**: The core compiler.
* **`@types/node`**: Type definitions so TS understands `process`, `fs`, etc.
* **`tsx`**: The modern, faster successor to `ts-node` for running TS files directly.

```bash
npm install --save-dev typescript @types/node tsx

```

---

## Phase 2: Configuration (`tsconfig.json`)

Generate a configuration file with the latest best practices for Node.js (ESM support).

```bash
npx tsc --init

```

For a modern Node.js project in 2026, update your `tsconfig.json` with these key settings:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}

```

---

## Phase 3: Project Structure & Scripts

Organize your code by creating a `src` folder.

1. **Create your first file:** `src/index.ts`
```typescript
const greeting: string = "Hello, TypeScript!";
console.log(greeting);

```


2. **Update `package.json` scripts:**
Add these scripts to handle development and production builds.
```json
"scripts": {
  "dev": "tsx watch src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}

```

---

## Phase 4: Running Your Project

* **For Development:** Run `npm run dev`. This uses `tsx` to run your code instantly and watches for changes.
* **For Production:** Run `npm run build` to generate JavaScript in the `dist` folder, then use `npm start`.