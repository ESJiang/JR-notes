- [Self-learning Notes](#self-learning-notes)
  - [Resources](#resources)
  - [JavaScript\_Array\_Advanced (`06/12/2023`)](#javascript_array_advanced-06122023)
    - [groupby](#groupby)
    - [with](#with)
    - [at](#at)
    - [fill](#fill)
    - [toReversed](#toreversed)
    - [toSpliced](#tospliced)
    - [findLast/reduceRight](#findlastreduceright)
    - [difference/intersection/symmetricDifference/union](#differenceintersectionsymmetricdifferenceunion)

# Self-learning Notes

## Resources
[Start Using JavaScript Sets Now](https://blog.webdevsimplified.com/2021-01/javascript-sets/)<br>

## JavaScript_Array_Advanced (`06/12/2023`)
> currently some methods are not supported in node.js

<p align='center'><img src='../image/js.png' width='30%' height='30%' /></p>

### groupby
```js
const people = [
  { name: "Jack", age: 28 },
  { name: "John", age: 28 },
  { name: "Sally", age: 63 },
  { name: "John", age: 37 },
]

const a = Object.groupBy(people, person => person.name[0])
console.log(a)
```

### with
> `with`不会改变原数组

```js
const b = [1, 2, 3]
const b1 = b.with(-1, 4)
console.log(`b: ${b}
b1: ${b1}`)
```

### at
> 很方便得到最后一个元素

```js
const a = [1,2,3]
console.log(a.at(-1)) // 3
```

### fill
> 方便整体修改数组元素, 但会修改原数组, 返回一个新数组

```js
const b = [1, 2, 3]
b.fill(1, 2)
console.log(b) // [1, 2, 1]
```

### toReversed
> 不修改原数组情况下生成一个倒序的数组

```js
const a = [1, 2, 3]
const b = a.toReversed()
console.log(a) // [1, 2, 3]
console.log(b) // [3, 2, 1]
```

### toSpliced
> 不修改原数组情况下在给定的索引处删除/替换了一些元素

```js
const months = ["Jan", "Mar", "Apr", "May"];

// 在索引 1 处添加一个元素
const months2 = months.toSpliced(1, 0, "Feb");
console.log(months2); // ["Jan", "Feb", "Mar", "Apr", "May"]

// 从第 2 个索引开始删除两个元素
const months3 = months2.toSpliced(2, 2);
console.log(months3); // ["Jan", "Feb", "May"]

// 在索引 1 处用两个新元素替换一个元素
const months4 = months3.toSpliced(1, 1, "Feb", "Mar");
console.log(months4); // ["Jan", "Feb", "Mar", "May"]

// 原数组不会被修改
console.log(months); // ["Jan", "Mar", "Apr", "May"]
```

### findLast/reduceRight
```js
const a = [1, 2, 3, 0]
const b = a.findLast(n => n < 2)
console.log(b)

const numbers = [1, 2, 3, 4]
console.log(numbers.reduce((acc, num) => acc + num, "")) // 1234
console.log(numbers.reduceRight((acc, num) => acc + num, "")) // 4321
```

### difference/intersection/symmetricDifference/union

| Method | Return type | Mathematical equivalent |
| :---: | :---: | :---: |
| ***A.difference(B)*** | ***`Set`*** | ***A\B*** |
| ***A.intersection(B)*** | ***`Set`*** | ***A∩B*** |
| ***A.symmetricDifference(B)*** | ***`Set`*** | ***(A\B)∪(B\A)*** |
| ***A.union(B)*** | ***`Set`*** | ***A∪B*** |
| ***A.isDisjointFrom(B)*** | ***`Boolean`*** | ***A∩B=∅*** |
| ***A.isSubsetOf(B)*** | ***`Boolean`*** | ***A⊆B*** |
| ***A.isSupersetOf(B)*** | ***`Boolean`*** | ***A⊇B*** |
