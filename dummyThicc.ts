interface Surface {
  entities: Entity[];
  variables: Variable[];
}

type Entity =
  | {
      type: "input";
      matches?: RegExp;
      placeholder?: string;
      width?: number | "auto";
      height?: number | "auto";
      var: string;
    }
  | {
      type: "image";
      src: string;
      width?: number | "auto";
      height?: number | "auto";
    }
  | {
      type: "text";
      content: string;
    }
  | {
      type: "layout";
      direction: "x" | "y";
      children: Entity[];
      width?: number | "auto";
      height?: number | "auto";
    }
  | {
      type: "map";
      source: string;
      entity: Entity;
    };

interface Variable {
  name: string;
  type?: "individual" | "vector";
  defaultValue?: any;
}

const zero: Surface = {
  variables: [{ name: "os", type: "vector" }],
  entities: [
    {
      type: "map",
      source: "$os",
      entity: {
        type: "input",
        var: "out{--k}",
        placeholder: "Choose : {--v}",
      },
    },
  ],
} as const;

async function render<S extends Surface>(
  surface: S,
  values: Record<S["variables"][number]["name"], string>
) {}

render(zero, {});
