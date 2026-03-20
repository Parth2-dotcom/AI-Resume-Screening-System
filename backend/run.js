import { execSync } from 'child_process';
import fs from 'fs';
try {
  execSync('node test-backend.js', { stdio: 'pipe' });
  fs.writeFileSync('error_stdout.txt', 'Success!');
} catch (e) {
  fs.writeFileSync('error_stderr.txt', e.stderr, 'utf8');
}
