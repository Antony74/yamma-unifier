import fsp from 'fs/promises';
import path from 'path';

import { exampleFiles } from 'yamma-unifier';
export { exampleFiles };

Object.entries(exampleFiles).forEach(([filename, content]) => {
    const filePath = path.join(__dirname, '..', 'examples', filename);
    fsp.writeFile(filePath, content);
});
