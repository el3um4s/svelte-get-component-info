# Svelte - Get Component Info

_A function to extract information about the props, actions, slots and css variables from a Svelte file. Designed to simplify the creation of documentation_

NPM link: [@el3um4s/svelte-get-component-info](https://www.npmjs.com/package/@el3um4s/svelte-get-component-info)

I recommend using it with [el3um4s/svelte-component-info](https://github.com/el3um4s/svelte-component-info) (npm: [@el3um4s/svelte-component-info](https://www.npmjs.com/package/@el3um4s/svelte-component-info))

### Install and use the package

To use the package in a project:

```bash
npm i @el3um4s/svelte-get-component-info
```

and then in a file:

```ts
import type { SvelteInformations } from "@el3um4s/svelte-get-component-info";
import { getInfo } from "@el3um4s/svelte-get-component-info";

const info: SvelteInformations = getInfo("./src/lib/hello.svelte");
console.log(info.props); //  [{ name: "message", type: "string", defaultValue: "Hello World" }]
console.log(info.actions); /// [ { name: "notify" }]
```

`info` looks like this:

```json
{
    "props": [
        { "name": "color", "type":"string", "defaultValue":"red" },
        { "name": "steps", "type":"number", "defaultValue":"8" }
        { "name": "title", "type":"string" },
        { "name": "description"}
    ],
    "actions": [
        { "name": "click" },
        { "name": "hover" },
        { "name": "customAction" }
    ],
    "slots": [
        { "anonymous": true },
        { "name": "header", "anonymous": false },
        { "name": "footer", "anonymous": false }
    ],
    "css": [
      { "name": "--color-primary" },
      { "name": "--color-secondary" }
    ]
}
```

### To Do List:

- [x] get props:
  - [x] name
  - [x] type
  - [x] defaultValue
- [x] actions
- [x] slots
  - [x] anonyms
  - [x] named
- [x] css variables
