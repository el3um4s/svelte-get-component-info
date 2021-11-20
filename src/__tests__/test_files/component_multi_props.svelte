<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let string_noType = "a - no type";
  export let string_yesType: string = "a - yes type";
  export let string_yesType_noValue: string;

  export let number_noType = 1;
  export let number_yesType: number = 2;
  export let number_yesType_noValue: number;

  export let boolean_noType = false;
  export let boolean_yesType: boolean = true;
  export let boolean_yesType_noValue: boolean;

  export let array_string_noType = ["name"];
  export let array_string_yesType: Array<string> = ["yes type"];
  export let array_string_yesType_noValue: Array<string>;

  export let array_number_noType = [1, 2, 3];
  export let array_number_yesType: Array<number> = [1, 2, 3];
  export let array_number_yesType_noValue: Array<number>;

  export let object_noType = { name: "no type" };
  export let object_yesType: object = { name: "yes type" };
  export let object_yesType_noValue: object;

  export let array_object_noType = [
    { name: "no type" },
    { name: "no type 2" },
    { name: "no type 3" },
  ];
  export let array_object_yesType: Array<object> = [
    { name: "yes type" },
    { name: "yes type 2" },
    { name: "yes type 3" },
  ];
  export let array_object_yesType_noValue: Array<object>;

  export let object_complex_noType = { name: "no type", value: "complex" };
  export let object_complex_yesType: object = {
    name: "yes type",
    value: "complex",
  };
  export let object_complex_yesType_noValue: object;

  export let object_complex_object_noType = [
    { name: "no type", value: "complex", n: 1 },
    { name: "no type 2", value: "complex", n: 2 },
    { name: "no type 3", value: "complex", n: 3 },
  ];
  export let object_complex_object_yesType: object = [
    { name: "yes type", value: "complex", n: 1 },
    { name: "yes type 2", value: "complex", n: 2 },
    { name: "yes type 3", value: "complex", n: 3 },
  ];
  export let object_complex_object_yesType_noValue: object;

  export let function_noType = () => "no type";
  export let function_yesType: Function = () => "yes type";
  export let function_yesType_noValue: Function;

  function sayHello() {
    dispatch("message", {
      text: "Hello!",
    });
  }

  function showNotification() {
    dispatch("notify", {
      text: "Hello!",
    });
  }

  function calc() {
    dispatch("calc");
  }
</script>

<button on:click={sayHello}>Fire Event</button>

<button on:click={showNotification}>Fire Event</button>

<button on:click={() => dispatch("claps", "detail value")}>Fire Event</button>

<div on:click={(e) => dispatch("click", { info: "yeah" })}>
  Click me and I will dispatch
</div>

<button on:click={() => dispatch("claps", "detail value")}>Fire Event</button>

<div
  on:mouseenter={() => {
    dispatch("mouse-enter");
  }}
  on:mouseleave={() => dispatch("mouse-leave")}
>
  Hello
</div>

<div on:click={(e) => dispatch("mouse-enter", { info: "yeah" })}>
  Click me and I will dispatch
</div>

<div>
  <slot>
    this fallback content will be rendered when no content is provided, like in
    the first example
  </slot>
</div>
<div>
  <slot name="header">No header was provided</slot>
  <p>Some content between header and footer</p>
  <slot name="footer" />
</div>

<div>
  <slot />
</div>

<div>
  <slot name="header">No header was provided</slot>
  <p>Some content between header and footer</p>
  <slot name="footer" />
</div>
