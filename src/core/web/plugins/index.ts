import * as Inert from "inert";
import * as Vision from "vision";
import SwaggerPlugin from "./SwaggerPlugin";
import ConsoleLogPlugin from "./ConsoleLogPlugin";

let plugins = [];

plugins = plugins.concat([
  Inert,
  Vision,
  SwaggerPlugin,
  ConsoleLogPlugin,
]);

export = plugins;
