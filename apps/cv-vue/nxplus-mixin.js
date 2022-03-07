const workspace_1 = require('@nrwl/workspace');
const devkit_1 = require('@nrwl/devkit');

workspace_1.toClassName = (args) => devkit_1.names(args).className;
workspace_1.toFileName = (args) => devkit_1.names(args).fileName;

Object.entries(workspace_1).forEach(([key, value]) =>
  Object.defineProperty(exports, key, { enumerable: true, value })
);
