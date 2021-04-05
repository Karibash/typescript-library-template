# typescript-library-template

This is a template repository for developing libraries for Browser/Node.js with TypeScript.

## How to publish to npm

Rewrite the following items in package.json accordingly.

* name
* description
* keywords
* repository
* author
* bugs
* homepage

Use the following command to confirm that TypeScript to JavaScript compiles successfully.

```bash
$ npm run build
```

Tag the commit with the following command before publishing to npm.

```bash
$ git tag -a v1.0.0
$ git push origin tags/v1.0.0
```

Finally, use the following command to publish the tagged commit to NPM.

```bash
$ npm run publish
```
