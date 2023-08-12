# Class Notes

## Resources

## Python_5 (`12/08/2023`)

<p align='center'><img src='../image/python.png' width='30%' height='30%' /></p>

### lambda function
`lambda function是有返回值的匿名函数, 并且只能执行返回值操作`
> 提升可读性, 对于一些只调用一次的函数, 没必要定义一个命名函数, 使用lambda funciton是较好的.

```python
# lambda input: expression

# 1. 求和
print((lambda x, y: x + y)(2, 3))  #5

# 2. array每个元素平方
arr = [1,2,3,4,5]
new_arr=list(map(lambda x:x**2, arr))
print(new_arr) # [1, 4, 9, 16, 25]

# 3. sort
a = [2, 3, 9, 7, 4]
a.sort(key=lambda x: x)
print(a) # [2, 3, 4, 7, 9]
a.sort(key=lambda x: -x)
print(a) # [9, 7, 4, 3, 2]
```

#### dis库
```python
import dis

# 使用 dis 模块查看代码在底层是如何执行的
dis.dis(lambda x, y: x + y)
```

#### lambda的优势和使用场景
- 简洁性&匿名性: 减少了不必要的命名和函数定义，使代码更加紧凑
- 匿名性: 避免命名冲突, 覆盖本地库
- 内联使用:  Lambda 函数通常用于一些只在一个地方被调用一次的操作，避免了为简单操作创建单独的命名函数; 避免覆盖本地库

> lambda不能直接使用->这种annotation, 但可以使用Callable检查<br>

```python
from typing import Callable

addition: Callable[[int], int] = lambda x: x + 1
result = addition([3]) # 会提示type error
print(result)
```

### Decorator
`Higher Order Function`
> 一定是嵌套函数(nested function)<br>
> 在不修改原始代码的情况下, 对函数或类的功能进行增强或修改

```python
from typing import Callable, Tuple

addition: Callable[[int, int, int], int] = lambda x, y, z: x + y + z


def high_order(func, input: Tuple[int, int, int]) -> int:
    return func(*input)


print(high_order(addition, (1, 2, 3)))  # 6
```

```python
def my_decorator(func):
    def wrapper():
        print('before')
        func()
        print('after')
    return wrapper

@my_decorator
def say_hello():
    print('Hello')

say_hello() # before Hello after

def say_hi():
    print('Hi')
decorated_say_hi = my_decorator(say_hi)
print(decorated_say_hi)
```

#### Decorator例子1: 计算运行时间

#### Decorator例子2: logging


#### cProfile
> 提供了一个轻量级的性能分析器，可以用来测量函数调用的时间和调用次数，帮助您识别代码中的瓶颈和优化点

```python
import cProfile


def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)


if __name__ == "__main__":
    cProfile.run("fibonacci(30)")
```

### map/filter/reduce
#### map 返回一个迭代器 (每个元素统一进行操作)
```python
print(list(map(lambda x: x * 2, [1, 2, 3, 4, 5]))) # [2, 4, 6, 8, 10]
```

#### filter 返回一个迭代器 (挑选满足条件的元素)
```python
print(list(filter(lambda x: x % 2 == 0, [1, 2, 3, 4, 5, 6]))) # [2, 4, 6]
```

#### reduce 返回一个值 (累加, 累乘)
```python
from functools import reduce
print(reduce(lambda x, y: x * y, [1,2,3]))
```

### 使用list comprehension实现map/filter/reduce
***一般推荐使用list comprehensive替代使用map/filter/reduce***
