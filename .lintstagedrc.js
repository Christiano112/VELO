const buildTypeCheckCommand = () =>
  `tsc --noEmit --skipLibCheck --project tsconfig.json --pretty`;

const buildEslintCommand = (filenames) => `eslint --fix ${filenames.join(" ")}`;

const buildPrettierCommand = (filenames) =>
  `prettier --write ${filenames.join(" ")}`;

module.exports = {
  "*.ts?(x)": [buildTypeCheckCommand],
  "*.{ts,tsx,js,jsx}": [buildEslintCommand],
  "*.{ts,tsx,js,jsx,json,md}": [buildPrettierCommand],
};
