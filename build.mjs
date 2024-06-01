import node_child_process from 'node:child_process';

/**
 * @param {string} program
 * @param {string|string[]} args
 * @param {(import('node:fs').ObjectEncodingOptions & import('node:child_process').ExecFileOptions)} options
 * @returns {Promise<void>}
 */
export function run(program, args = [], options = {}) {
  console.log('run', options, `${program} ${Array.isArray(args) ? args.join(' ') : args}`);
  return new Promise((resolve) => {
    node_child_process.execFile(program, Array.isArray(args) ? args : args.split(' '), options, (error, stdout, stderr) => {
      if (error) console.log(error);
      if (stdout) console.log(stdout);
      if (stderr) console.log(stderr);
      resolve();
    });
  });
}

await run('bunx', 'tsc');
await run('bunx', 'prettier . --write', { cwd: './out' });
