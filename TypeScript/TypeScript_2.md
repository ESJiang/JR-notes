- [Self-learning Notes](#self-learning-notes)
  - [Resources](#resources)
  - [TypeScript\_2 (`08/11/2023`)](#typescript_2-08112023)
    - [How to assign types and type inference](#how-to-assign-types-and-type-inference)
    - [Array Type](#array-type)
    - [Object Type](#object-type)
    - [Type vs Interface](#type-vs-interface)
      - [Type](#type)
      - [Interface](#interface)

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