asq-matchable-behavior
=======================

`ASQ.asq-matchable-behavior` provides interfaces of managing mappings between two sets.

The element takes care of store mappings in any type, such as `one to one`, `many to many` and `a to b` (a, b are positive integer number). 

Set the `mode` to define the type of mapping. The two sets to be mapped should be defined as descendants elements in light dom. Define selectors using `xMatchable` and `yMatchable` to select them.

`matchedClass` and `matchedAttribute` define the class and attribute that will be added to the items when they are matched.

`asq-matchable-behavior` will not store the reference of item directly. Instead it stores the `value`. The values of items are defined through `attrForMatched`, which is `name` by default.

