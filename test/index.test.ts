import { runCommand } from '@oclif/test';
import { expect } from 'chai';

describe('create-soldev-app', () => {
  it('runs init with default options', async () => {
    const { stdout } = await runCommand('create-soldev-app');
    expect(stdout).to.exist;
  });
});
