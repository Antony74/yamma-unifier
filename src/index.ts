#!/usr/bin/env node

// e.g. npm start examples/example.mm examples/ununified.mmp
// e.g. yammau examples/example.mm examples/ununified.mmp

import { cli } from './cli';
export * from './unifier'

if (require.main === module) {
    cli();
}
