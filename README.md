# yamma-unifier-cli

This repository contains:

* A [unit test specification](./src/unifier.test.ts) for an API with runs a unification algorithm upon Metamath proof files.
* The API has been [mocked](./mocks/yamma-unifier/src/index.ts), so the tests pass
* The minimal [test data](./mocks/yamma-unifier/src/examples.ts) required by the tests, also mirrored to a [directory](./examples/)
* A [command line interface](./src/index.ts) which wraps the mock API allowing proof files to be unified from a terminal.  When installed, the command is `yammau`.  The hope is it can be attached to a real API someday.

## Public domain

This repository has been placed in the public domain as [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)

