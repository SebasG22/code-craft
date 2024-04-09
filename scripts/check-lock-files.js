// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

function checkLockFiles() {
  const errors = [];
  if (fs.existsSync("package-lock.json")) {
    errors.push(
      'Invalid occurrence of "package-lock.json" file. Please remove it and use only "pnpm-lock.yaml"',
    );
  }
  if (fs.existsSync("yarn.lock")) {
    errors.push(
      'Invalid occurrence of "yarn.lock" file. Please remove it and use only "pnpm-lock.yaml"',
    );
  }
  try {
    const content = fs.readFileSync("pnpm-lock.yaml", "utf-8");
    if (content.match(/localhost:487/)) {
      errors.push(
        'The "pnpm-lock.yaml" has reference to local yarn repository ("localhost:4873"). Please use "registry.yarnpkg.com" in "yarn.lock"',
      );
    }
  } catch {
    errors.push('The "pnpm-lock.yaml" does not exist or cannot be read');
  }

  return errors;
}

const invalid = checkLockFiles();
if (invalid.length > 0) {
  // eslint-disable-next-line no-console
  invalid.forEach((e) => console.log(e));
  process.exit(1);
} else {
  process.exit(0);
}
