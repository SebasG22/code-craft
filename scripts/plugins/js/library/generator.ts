import { Tree, formatFiles } from '@nx/devkit';
import { Linter } from '@nx/eslint';
import { libraryGenerator as jsLibraryGenerator } from '@nx/js';

import { LibraryGeneratorSchema } from './schema';

export async function libraryGenerator(
  tree: Tree,
  options: LibraryGeneratorSchema,
) {
  const projectRoot = `libs/${options.projectName}/${options.domain}/${options.type}`;

  await jsLibraryGenerator(tree, {
    buildable: true,
    bundler: 'swc',
    directory: projectRoot,
    linter: Linter.EsLint,
    name: `${options.projectName}-${options.type}`,
    setParserOptionsProject: false,
    skipTsConfig: false,
    strict: true,
    projectNameAndRootFormat: 'as-provided',
    tags: `scope:${options.projectName},type:${options.type},js`,
    unitTestRunner: 'vitest',
  });

  await formatFiles(tree);
}

export default libraryGenerator;
