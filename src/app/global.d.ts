import type { IStaticMethods } from "flyonui/flyonui";

declare global {
  interface Window {
    // Optional third-party libraries
    _;
    $: typeof import("jquery");
    jQuery: typeof import("jquery");

    // FlyonUI
    HSStaticMethods: IStaticMethods;
  }
}

export {};
