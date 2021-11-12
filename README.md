# Svelte - Get Component Info

_A function to extract information about the props of a Svelte file. Designed to simplify the creation of documentation_

NPM link: [@el3um4s/svelte-get-component-info](https://www.npmjs.com/package/@el3um4s/svelte-get-component-info)

### Install and use the package

To use the package in a project:

```bash
npm i @el3um4s/svelte-get-component-info
```

and then in a file:

```ts
import { getInfo } from "@el3um4s/svelte-get-component-info";

const info = getInfo("./src/lib/hello.svelte");
console.log(info.props); //  [{ name: "message", type: "string", defaultValue: "Hello World" }]
```

### Note

It is still a work in progress project. My idea is to get an item like this:

```json
{
    "props": [
        { "name": "color", "type":"string", "defaultValue":"red" },
        { "name": "steps", "type":"number", "defaultValue":"8" }
        { "name": "title", "type":"string", "defaultValue":undefined },
        { "name": "description", "type":undefined, "defaultValue":undefined}
    ],
    "actions": [
        "click",
        "hover",
        "customAction"
    ],
    "slots": [
        "",
        "header",
        "footer"
    ]
}
```

### To Do List:

- [x] get props:
  - [x] name
  - [x] type
  - [x] defaultValue
- [ ] actions
- [ ] slots
  - [ ] anonyms
  - [ ] named
