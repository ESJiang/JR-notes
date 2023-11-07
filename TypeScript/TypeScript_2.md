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
    - [Unions](#unions)
    - [Intersections](#intersections)

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


### Unions
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

### Intersections
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
