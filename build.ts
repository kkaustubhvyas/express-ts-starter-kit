import s from 'shelljs';

const config = require('./tsconfig-build.json');

const { outDir } = config.compilerOptions;

s.rm('-rf', outDir);
s.mkdir(outDir);
// s.cp('.env', `${outDir}/.env`);
// s.cp('server/docs/api.yml', `${outDir}/server/docs/api.yml`);
