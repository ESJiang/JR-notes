- [Self-learning Notes](#self-learning-notes)
  - [Resources](#resources)
  - [TypeScript\_2 (`08/11/2023`)](#typescript_2-08112023)
    - [How to assign types and type inference](#how-to-assign-types-and-type-inference)
    - [Array Type](#array-type)
    - [Object Type](#object-type)
    - [Type vs Interface](#type-vs-interface)
      - [Type](#type)
      - [Interface](#interface)
    - [Function](#function)
      - [Optional parameters](#optional-parameters)
      - [Destructured and Rest Parameters](#destructured-and-rest-parameters)
      - [Typing Variables As Functions](#typing-variables-as-functions)
    - [Type Modifiers](#type-modifiers)
      - [Unions](#unions)
      - [Intersections](#intersections)
      - [ReadOnly](#readonly)
      - [keyof](#keyof)
      - [Typeof](#typeof)
      - [Index Types](#index-types)
    - [Advanced Types](#advanced-types)
      - [As Const And Enums](#as-const-and-enums)
      - [Tuples](#tuples)
      - [Generics](#generics)
      - [Async Functions](#async-functions)

# Self-learning Notes

## Resources

## TypeScript_2 (`08/11/2023`)

<p align='center'><img src='../image/TypeScript.png' width='30%' height='30%' /></p>

### How to assign types and type inference
```ts
let a: number = 4
let b: string = "Jack"

a = "xxx" // error, coz a must be a number
```

### Array Type
```ts
const a: number[] = [1,2,3]
a.push(4)
a.push("4") // error, coz all elements in array a must have a type of number
```

> 尽量避免使用any

### Object Type
```ts
const person: { name: string; age: number; isProgrammer?: boolean } = { name: "Kyle", age: 28 }
person.isProgrammer = true
```

***我们不希望每次定义时写很长的props+type, 解决方法是用interface***

### Type vs Interface
#### Type
```ts
type Person = { name: string; age: number; isProgrammer?: boolean };

const person: Person = {
    name: "Kyle",
    age: 28,
}
```

#### Interface
```ts
interface Person {
    name: string;
    age: number;
    isProgrammer?: boolean;
}

const person: Person = {
    name: "Kyle",
    age: 28,
}
```

### Function
```ts
function printName(person: { name: string }) {
    console.log(person.name);
}

const person = { name: "James", age: 28 };

printName(person);
printName({ name: "James", age: 28 }); // error

function sum(a: number, b: number) {
    return a + b;
}

const c = sum(1, 2);

function printAge(age: number): void { // no return value or only contains return keywords
    console.log(age);
}

```

> 尽量不要明确规定return type, typescript会自己判断

#### Optional parameters
```ts
function printNameandAge(name: string, options?: { debugMode: boolean }) {
    console.log(name, options);
}

printNameandAge("Jack");
printNameandAge("Jack", { debugMode: true });
```

#### Destructured and Rest Parameters
```ts
type Option = {
    debugMode?: boolean;
    logLevel?: number;
};
function printNameandAge(name: string, { debugMode = false, logLevel }: Option = {}) {
    console.log(name, debugMode, logLevel);
}

printNameandAge("Jack", { logLevel: 5 });

function sum(...nums: number[]) {
    return nums.reduce((acc, n) => acc + n, 0);
}

sum(1, 2, 3); // 6
```

#### Typing Variables As Functions
```ts
type PrintNameFunc = (name: string) => number;

const f: PrintNameFunc = name => Number(name);
```

### Type Modifiers
#### Unions
> type支持union语法, 但是interface不支持

```ts
type Todo = {
    name: string;
    status: "Complete" | "Incomplete" | "Draft";
};

type TodoPerson =
    | Todo
    | {
          name: string;
          age: number;
      };

const todo: Todo = { name: "Laundry", status: "Complete" };
```

#### Intersections
```ts
type Person = {
    name: string;
    age: number;
};

type Employee = {
    employeeID: string;
    department: string;
};

type PersonWithEmployeeInfo = Person & Employee;

const person: PersonWithEmployeeInfo = {
    name: "Alice",
    age: 30,
    employeeID: "12345",
    department: "HR",
};
```

```ts
interface Person {
    name: string;
    age: number;
}

interface Employee {
    employeeID: string;
    department: string;
}

interface PersonWithEmployeeInfo extends Person, Employee {}

const person: PersonWithEmployeeInfo = {
    name: "Alice",
    age: 30,
    employeeID: "12345",
    department: "HR"
};
```

#### ReadOnly
```ts
type Person = {
    readonly id: number;
    name: string;
    age: number;
};

const person: Person = { id: 1, name: "James", age: 18 };
person.id = 2; // error, coz id cannot be modified
```

#### keyof
```ts
type Person = {
    name: string;
    age: number;
    isProgrammer?: boolean;
};

function getValue(key: keyof Person, person: Person) {
    return person[key];
}

const age = getValue("age", { name: "Jack", age: 28 }); //age = string | number | boolean | undefined
```

#### Typeof
```ts
const person = { name: "Jack", age: 24 };
const people: (typeof person)[] = [];
// const people: { name: string; age: number }[] = [];

people.push(person);
people.push({ name: "Sally", age: 24 });

function sayHi(name: string) {
    console.log(name);
}

type FuncType = typeof sayHi;
```

#### Index Types
```ts
type Person = {
    name: string;
    skillLevel: "Beiginner" | "Intermediate" | "Expert" | "Master";
};

const person: Person = { name: "James", skillLevel: "Intermediate" };

function printSkillLevel(skillLevel: Person["skillLevel"]) {
    console.log(skillLevel);
}

printSkillLevel(person.skillLevel);

type PeopleGroupBySkillLevel = {
    [index in Person["name"]]: Person[];
};

const a: PeopleGroupBySkillLevel = {
    Expert: [{ name: "John", skillLevel: "Expert" }],
};

const x = ["sdf", "d", false];
type X = (typeof x)[keyof typeof x];
type Y = (typeof x)[number];
```

### Advanced Types
#### As Const And Enums
```ts
const SKILL_LEVELS = ["Beginner", "Intermediate", "Expert"] as const; // as const changes everything to readonly
type Person = {
    skillLevel: (typeof SKILL_LEVELS)[number];
};

SKILL_LEVELS.forEach(skillLevel => {
    console.log(skillLevel);
});
```

```ts
const person = {
    name: "",
    age: 28,
    adddress: {
        street: "Main St",
    },
} as const;

person.age = 2; // error, coz as const is readonly
```

#### Tuples
```ts
const person = {
  name: "James",
  age: 28
}

type Tuple = [string, boolean];
const a: Tuple = ["sdfsdf", true];
```

#### Generics
```ts
const input = document.querySelector<HTMLInputElement>(".input");
console.log(input?.value);

function getSecond<ArrayType>(array: ArrayType[]) {
    return array[1];
}

const a = [1, 2, 3];
const b = ["1", "2", "3"];
const ret = getSecond(a);

type APIResponse<TData = { status: number }> = {
    data: TData;
    isError: boolean;
};

type UserResponse = APIResponse<{ name: string; age: number }>;
type BlogResponse = APIResponse<{ title: string }>;

const data1: UserResponse = {
    data: { name: "Amy", age: 24 },
    isError: false,
};

const data2: BlogResponse = {
    data: { title: "blog1" },
    isError: false,
};

function arrayToObject<T>(array: [string, T][]) {
    const obj: {
        [index: string]: T;
    } = {};
    array.forEach(([key, value]) => {
        obj[key] = value;
    });
    return obj;
}

const arr: [string, number | boolean][] = [
    ["keyone", 1],
    ["keytwo", 2],
    ["keythree", true],
];
```

#### Async Functions
```ts
const wait = async (during: number) => await fetch("sdf");

wait(1000).then(value => console.log(value.json()));
```