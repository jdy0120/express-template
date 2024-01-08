//@index('./*.ts', f => (f.path !== `./index` && f.path !== `./global.d`) ? `export * from '${f.path}';` : "")

export * from "./request";
