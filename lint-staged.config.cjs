// const { ESLint } = require('eslint');

// const removeIgnoredFiles = async (files) => {
//   const eslint = new ESLint();
//   const isIgnored = await Promise.all(
//     files.map((file) => eslint.isPathIgnored(file)),
//   );
//   const filteredFiles = files.filter((_, i) => !isIgnored[i]);
//   return filteredFiles.join(' ');
// };

module.exports = {
  '*.{ts,tsx,js,jsx}': async (files) => {
    // const filesToLint = await removeIgnoredFiles(files);
    return [
      // `eslint --max-warnings=0 --fix ${filesToLint}`,
      `prettier --write ${files.join(' ')}`,
    ];
  },
  '*.{yaml,yml,json,md,html,scss,css,graphql}': (files) => [
    `prettier --write ${files.join(' ')}`,
  ],
};
