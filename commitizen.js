// prettier-ignore
const scopes = [
    { name: 'coffee-store', description: 'anything coffee-store specific'},
    { name: 'shopping-cart-react', description: 'anything shopping-cart-react specific'},
    { name: 'shopping-cart-qwik', description: 'anything shopping-cart-qwik specific'},
    { name: 'shopping-cart-chrome-extension', description: 'anything shopping-cart-chrome-extension specific'},
    { name: 'shopping-cart-terminal', description: 'anything shopping-cart-terminal specific' },
    { name: 'repo', description: 'anything related to managing the repo itself'},
    { name: 'misc', description: 'misc stuff' },
];

// precomputed scope
const scopeComplete = require("child_process")
  .execSync("git status --porcelain || true")
  .toString()
  .trim()
  .split("\n")
  .find((r) => ~r.indexOf("M  packages"))
  ?.replace(/(\/)/g, "%%")
  ?.match(/packages%%((\w|-)*)/)?.[1];

/** @type {import('cz-git').CommitizenGitOptions} */
module.exports = {
  /** @usage `yarn commit :f` */
  alias: {
    f: "docs(core): fix typos",
    b: "chore(repo): bump dependencies",
  },
  maxSubjectLength: 100,
  allowCustomScopes: false,
  allowEmptyScopes: false,
  allowCustomIssuePrefixs: false,
  allowEmptyIssuePrefixs: false,
  defaultScope: scopeComplete,
  scopes: [...scopes],
  types: [
    { value: "feat", name: "feat:     A new feature" },
    { value: "fix", name: "fix:      A bug fix" },
    { value: "docs", name: "docs:     Documentation only changes" },
    {
      value: "cleanup",
      name: "cleanup:  A code change that neither fixes a bug nor adds a feature",
    },
    {
      value: "chore",
      name: "chore:    Other changes that don't modify src or test files",
    },
  ],
};
