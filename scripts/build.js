import { join, dirname } from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';
import { writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const run = async () => {
  const basePath = join(__dirname, '..', 'schemas');

  const files = await glob('**/*.schema.js', {
    cwd: basePath,
  });

  for await (const file of files) {
    const { default: schemaDef } = await import(join(basePath, file));
    const schema = schemaDef.valueOf();

    writeFileSync(
      join(basePath, file.replace('.schema.js', '.json')),
      JSON.stringify(schema.valueOf(), undefined, 2),
    );
  }
};

run()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
