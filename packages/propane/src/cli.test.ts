import process from 'node:process';
import * as mockProcess from 'vitest-mock-process';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import * as pkg from '../package.json';
import { collectMessagesFromMock } from './test-helpers';

describe('cli', () => {
  const [CMD_NAME] = Object.keys(pkg.bin);
  const CMD = ['node', CMD_NAME];

  let mockConsoleLog: ReturnType<typeof mockProcess.mockConsoleLog>;
  let mockStderr: ReturnType<typeof mockProcess.mockProcessStderr>;
  let mockExit: ReturnType<typeof mockProcess.mockProcessExit>;

  beforeEach(() => {
    // Used to allow us to re-import the same module multiple times.
    vi.resetModules();
    vi.resetAllMocks();

    mockStderr = mockProcess.mockProcessStderr();
    mockExit = mockProcess.mockProcessExit();
    mockConsoleLog = mockProcess.mockConsoleLog();
  });

  afterEach(() => {
    mockStderr.mockRestore();
    mockExit.mockRestore();
    mockConsoleLog.mockRestore();
  });

  test('runs help command', async () => {
    process.argv = CMD.concat('--help');

    await import('./cli');

    const [log] = collectMessagesFromMock(mockConsoleLog);
    const output = log
      .replace(new RegExp(pkg.version, 'g'), '<VERSION>') // replace specific version with generic token.
      .replace(new RegExp(CMD_NAME, 'g'), '<CMD>'); // replace command name with a generic token.

    expect(output).toMatchInlineSnapshot(`
      "<CMD>/<VERSION>

      Usage:
        $ <CMD> 

      Commands:
        hello-world <name>  just a test that this works!
        clone-it            clone the repo
                            

      For more info, run any command with the \`--help\` flag:
        $ <CMD> hello-world --help
        $ <CMD> clone-it --help
        $ <CMD> --help

      Options:
        -h, --help     Display this message 
        -v, --version  Display version number"
    `);
  });

  test('runs help command as default command', async () => {
    // collect help command output.
    process.argv = CMD.concat('--help');
    await import('./cli');
    const [output1] = collectMessagesFromMock(mockConsoleLog);

    vi.resetModules();
    mockConsoleLog.mockClear();

    // collect default command output.
    process.argv = CMD;
    await import('./cli');
    const [output2] = collectMessagesFromMock(mockConsoleLog);

    expect(output2).toEqual(output1);
  });

  // test.each([
  //   // relative sub-directory
  //   {
  //     directory: './my-project',
  //     expected: resolve(process.cwd(), './my-project'),
  //   },
  //   // absolute directory
  //   { directory: '/my-project', expected: '/my-project' },
  //   // nested sub-directory
  //   {
  //     directory: 'workspaces/my-project/',
  //     expected: resolve(process.cwd(), './workspaces/my-project'),
  //   },
  // ])(
  //   'Invokes setup with the correct path for $directory',
  //   async ({ directory, expected }) => {
  //     process.argv = CMD.concat('setup', directory);

  //     // Mock the setup function
  //     vi.mock('./commands/setup');
  //     const { setup } = await import('./commands/setup');
  //     vi.mocked(setup).mockResolvedValueOnce();

  //     // Run the command
  //     await import('./cli');

  //     expect(setup).toHaveBeenLastCalledWith(expected);
  //   },
  // );

  // test('exits with error when invoking setup without a directory', async () => {
  //   process.argv = CMD.concat('setup');

  //   // Mock the setup function
  //   vi.mock('./commands/setup');
  //   const { setup } = await import('./commands/setup');
  //   vi.mocked(setup).mockResolvedValueOnce();

  //   // Run the command
  //   await import('./cli');

  //   expect(setup).not.toHaveBeenCalled();

  //   const log = collectMessagesFromMock(mockConsoleLog);
  //   expect(log).toMatchInlineSnapshot(`
  //   [
  //     "ERROR! missing required args for command \`setup <directory>\`",
  //   ]
  // `);
  //   expect(mockExit).toHaveBeenCalledWith(1);
  // });
});
