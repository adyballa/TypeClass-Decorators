# TypeClass-Decorators
Decorators in Typescript to establish Haskell Typeclasses.

Haskell Typeclasses are interfaces in functional programming for types.
Useful and basic functions are collected there. F.e: 

* [Ord-functions](https://www.haskell.org/hoogle/?hoogle=Ord+a+%3D%3E+%5Ba%5D+-%3E+%5Ba%5D+)
* [Eq-function](https://www.haskell.org/hoogle/?hoogle=Eq+a+%3D%3E+%5Ba%5D+-%3E+%5Ba%5D)

This is the __experiment__ to port it in Typescript via Decorators.
I realized it for *Eq* and *Ord*. You can find them in src/app/decorators.

The decorators implement the interfaces (You can do it by yourself) for objects
and provide functions for those as static class members.

I decorate the simple object car in src/app/class/cars.ts and apllied 
useful functionality in the component (src/app/cars/cars.component).
I used Angular2 to establish a short and quick example.

It's not clear to me, how useful it is and if the decorator is the best technique.

### Pro

*  Declarative description
*  Functions collected in a good package
*  Useful basic interfaces
*  with good responsibility
*  which can be implemented manually
*  Use of standards

### Contra

*  Too complicated (__is there a simpler way too establish this?__)
*  Interfaces are not explicit implemented by the decorator
*  Performance