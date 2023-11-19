- [Self-learning Notes](#self-learning-notes)
  - [Resources](#resources)
  - [TypeScript\_3 (`19/11/2023`)](#typescript_3-19112023)
    - [Generate a new type based on an old type](#generate-a-new-type-based-on-an-old-type)
      - [Pick and Omit](#pick-and-omit)
      - [Partial and Required](#partial-and-required)
    - [ReturnType and Parameters](#returntype-and-parameters)
    - [Record](#record)
    - [Readonly](#readonly)
    - [Awaited](#awaited)

# Self-learning Notes

## Resources

## TypeScript_3 (`19/11/2023`)

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