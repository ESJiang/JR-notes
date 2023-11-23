- [Self-learning Notes](#self-learning-notes)
  - [Resources](#resources)
  - [TypeScript\_4 (`28/11/2023`)](#typescript_4-28112023)
    - [Debugging](#debugging)
    - [Importing Types](#importing-types)
      - [main.ts](#maints)
      - [otherFile.ts](#otherfilets)
      - [third-party libraries](#third-party-libraries)
    - [Declaration Files](#declaration-files)
      - [vite-env.d.ts](#vite-envdts)
      - [lodash.d.ts](#lodashdts)
      - [globals.d.ts](#globalsdts)

# Self-learning Notes

## Resources

## TypeScript_4 (`28/11/2023`)

<p align='center'><img src='../image/TypeScript.png' width='30%' height='30%' /></p>

### Debugging
> When debugging, it is recommended to look at the last sentence -> it will tell you the reason.<br>
>> You can install a plugin called [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors) from VScode Marketplace.<br>

>> You can also use `Command/Control+click funtion name` to find function definition near the error, which will give you more information.<br>

>> Besides, if you expect an error to happen, you can put `// @ts-expect-error` before error line. In fact, when there is no error found, `// @ts-expect-error` will throw an error, which is much better than simply using `// @ts-ignore`.

```ts
type Options = {
    debug: boolean;
    format: {
        tabs: boolean;
        tabWidth: number;
    };
};

const printNumber = (num: number, options?: Options) => console.log(num);

// @ts-expect-error
printNumber(3, { debug: false, format: { tabs: true } });
```

### Importing Types
#### main.ts
```ts
export type User = {
    id: string;
    name: string;
    age: number;
};
```

#### otherFile.ts
```ts
import type { User } from "./main.ts";

function printUser(user: User) {
    console.log(user.name);
}
```

#### third-party libraries
```shell
npm i date-fns
npm i -D @types/lodash
```

```ts
import { addDays } from "date-fns";
import { times } from "lodash";
addDays(new Date(), 3);
times(4, () => {});
```

### Declaration Files
#### vite-env.d.ts
```ts
/// <reference types="vite/client">
```

#### lodash.d.ts
```ts
declare module "lodash" {
    function times(num: string): number[];
}
```

#### globals.d.ts
```ts
declare global {
    interface Console {
        superLog: () => void;
    }
}
```