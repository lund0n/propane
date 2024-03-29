import { cac } from 'cac';
import * as pkg from '../package.json';
import { generate } from './commands/generate';
import { helloWorld } from './commands/hello-world';

export async function startCli(cwd = process.cwd(), argv = process.argv) {
  const [commandName] = Object.keys(pkg.bin);
  const cli = cac(commandName);

  cli
    .command('hello-world <name>', 'just a test that this works!')
    .action((name: string) => helloWorld(name));

  cli
    .command('generate <template-name>', 'generates a project from a template')
    .option('--src <source>', 'repository or template file path', {
      default: 'lund0n/propane#main',
    })
    .action((templateName: string, { src }: { src: string }) =>
      generate(templateName, src),
    );

  cli.command('').action(() => {
    cli.outputHelp();
  });

  cli.help();
  cli.version(pkg.version);

  // Parse CLI args without running the command to
  // handle command errors globally
  cli.parse(argv, { run: false });

  await cli.runMatchedCommand();
}
