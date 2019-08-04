/*
 * Extra typings definitions
 */
import jasmine = require('jasmine');

// SystemJS module definition
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare type Spied<T> = { [Method in keyof T]: jasmine.Spy };
