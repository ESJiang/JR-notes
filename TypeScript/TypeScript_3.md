- [Self-learning Notes](#self-learning-notes)
  - [Resources](#resources)
  - [TypeScript\_3 (`20/11/2023`)](#typescript_3-20112023)
    - [Generate a new type based on an old type](#generate-a-new-type-based-on-an-old-type)
      - [Pick and Omit](#pick-and-omit)
      - [Partial and Required](#partial-and-required)
    - [ReturnType and Parameters](#returntype-and-parameters)
    - [Record](#record)
    - [Readonly](#readonly)
    - [Awaited](#awaited)
    - [Satisfies](#satisfies)
    - [Discriminated Union](#discriminated-union)
    - [Function Overload](#function-overload)
    - [Type Predicate Function](#type-predicate-function)

# Self-learning Notes

## Resources

## TypeScript_3 (`20/11/2023`)

<p align='center'><img src='../image/TypeScript.png' width='30%' height='30%' /></p>

### Generate a new type based on an old type
#### Pick and Omit
> 使用`Pick`和`Omit`关键字可以避免重复写type定义. 比如typeA有五个属性:<br>
>> typeB需要typeA的少量属性 -> 使用`Pick`<br>
>> typeB需要typeA的大量属性 -> 使用`Omit`<br>

```ts
type Todo = {
    id: string;
    name: string;
    status: string;
    completed: boolean;
};

// type NewTodo = Pick<Todo, "name" | "status" | "completed">;
type NewTodo = Omit<Todo, "id">; // remove duplication

function saveTodo(todo: NewTodo): Todo {
    return { ...todo, id: crypto.randomUUID() };
}

function renderTodo(todo: Todo) {
    const div = document.createElement("div");
    div.id = todo.id;
}
```

#### Partial and Required
> `Partial`和`Required`关键字强制将一个type的所有元素变成`可选`和`必选`<br>
> 根据前面提到的[Pick and Omit](#pick-and-omit), 一般将`Partial`, `Required`, `Pick`, `Omit`联合使用更好的处理type

```ts
type Person = {
    name: string;
    age: number;
};

type PartialPerson = Partial<Person>;

// PartialPerson 的类型为 { name?: string | undefined; age?: number | undefined; }

type PartialPerson1 = {
    name?: string | undefined;
    age?: number | undefined;
};

type RequiredPerson = Required<PartialPerson1>;

// RequiredPerson 的类型为 { name: string; age: number; }
```

```ts
type PartialPerson = Partial<Person>; // 将所有属性设为可选

type RequiredNameAndAge = Required<Pick<PartialPerson, 'name' | 'age'>>; // 选取 'name' 和 'age' 属性，并使它们变为必选
```

### ReturnType and Parameters
> `ReturnType`和`Parameters`可以得到返回类型和参数列表类型

```ts
function checkLength(a: string, b: number) {
    return a.length < b;
}

type Params = Parameters<typeof checkLength>[0]; // less useful
type ReturnOfLengthCheck = ReturnType<typeof checkLength>; // common
```

### Record
> 使用`Record`可读性更强

```ts
type Person = {
    name: string;
    age: number;
};

type PeopleGroupByName = Record<string, Person[]>;
```

### Readonly
> 一般用`Readonly`防止对象被修改, 也可以使用`as const`<br>
> 本质上是`Object.freeze(obj_name)`

```ts
type Todo = {
    title: string;
    completed: boolean;
};

type FinalTodo = Readonly<Todo>;
```

### Awaited
```ts
async function doSomething() {
    return 3;
}

type Value = Awaited<ReturnType<typeof doSomething>>; // number
```

### Satisfies
```ts
type Todo = {
    title: string;
    dueDate: string | Date;
    isComplete: boolean;
};

const todo = {
    title: "sdf",
    dueDate: new Date(),
    isComplete: true,
} satisfies Todo; // better use satisfies keyword here coz const todo is more explicit than type Todo. We want to maintain it while ensuring that const todo meets the minimum requirements of type Todo

todo.dueDate.setDate(4);
```

### Discriminated Union
```ts
type SuccessResponse = {
    status: "Success"; // do not use number/string, only literal value (必须是一个具体的值)
    data: { id: string; name: string };
};

type ErrorResponse = {
    status: "Error"; // do not use number/string, only literal value (必须是一个具体的值)
    errorMessage: string;
};

function handleResponse(res: SuccessResponse | ErrorResponse) {
    // 两个type的status必须同类型, 因此一个为string, 一个为number就不行
    if (res.status === "Success") {
        console.log(res.data.name);
    } else {
        console.log(res.errorMessage.length);
    }
}
```

### Function Overload
> 函数重载可以提升代码可读性

```ts
function sum(a: number[]): number;
function sum(a: number, b: number): number;
function sum(a: number[], b: number): number;
function sum(a: number | number[], b?: number): number {
    if (Array.isArray(a)) a = a.reduce((acc, num) => acc + num, 0);
    if (b) return a + b;
    else return a;
}

const s1 = sum([1, 2]);
const s2 = sum(1, 2);
const s3 = sum([1, 2], 3);
```

### Type Predicate Function
```ts
const PRIORITIES = ["High", "Medium", "Low"] as const;
type Priority = (typeof PRIORITIES)[number];
type Todo = {
    title: string;
    description: string;
};

function func(todo: Todo) {
    if (isPriority(todo.description)) {
        todo.description;
    } else {
        todo.description;
    }
}

function isPriority(description: string): description is Priority {
    return PRIORITIES.includes(description as Priority);
}
```