import * as mockProcess from 'vitest-mock-process';
import type { ExecaReturnValue } from 'execa';

export function collectMessagesFromMock(
  mock:
    | ReturnType<typeof mockProcess.mockProcessStdout>
    | ReturnType<typeof mockProcess.mockProcessStderr>
    | ReturnType<typeof mockProcess.mockConsoleLog>,
) {
  return mock.mock.calls.map(([message]) => String(message).trimEnd());
}

export function toMockedExecaResponse(
  overrides: Partial<ExecaReturnValue<Buffer>> = {},
): ExecaReturnValue<Buffer> {
  return {
    isCanceled: false,
    stdout: Buffer.from(''),
    command: '',
    escapedCommand: '',
    exitCode: 0,
    killed: false,
    failed: false,
    timedOut: false,
    stderr: Buffer.from(''),
    ...overrides,
  };
}
