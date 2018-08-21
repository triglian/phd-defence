## Basic functionality for ASQ elements.
This element exposes mixins that all ASQ elements should be augmented with.

### Usage
The convenient method: 

```
ASQ.asqify(prototype, isQuestionType)
```

augments a `prototype` object with `role` and `uid` attributes; `Roles` and `isASQElement` properties; and also takes care of updating the `role` attribute of children elements that are ASQ elements when the  `roleChanged` event is triggered on the element. If `isQuestionType` is set to `true`, the element also acquires an `isASQQuestionTypeElement = true` property.

You may also use the individual mixins if you wish so.