# couldbe [![Build Status](https://travis-ci.org/mfellner/couldbe.svg)](https://travis-ci.org/mfellner/couldbe) [![Coverage Status](https://coveralls.io/repos/mfellner/couldbe/badge.svg?branch=master&service=github)](https://coveralls.io/github/mfellner/couldbe?branch=master)

A Maybe-style monoid for JavaScript.

## Usage

Given some arbitrary data, e.g.

```javascript
const data = {
  id: 1
  content: {
    title: 'hello'
  }
}
```

Instead of ...

```javascript
if (data.content)
  data.content.body || 'world'
```

... do the following:

```javascript
import couldbe from 'couldbe'

couldbe(data)('content')('title')         === 'hello'
couldbe(data)('content')('body', 'world') === 'world'
```
