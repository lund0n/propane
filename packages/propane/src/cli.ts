import { startCli } from './cli-start';

startCli().catch((err: unknown) => {
  if (err instanceof Error) {
    console.log(`ERROR! ${err.message}`);
  }
  process.exit(1);
});
