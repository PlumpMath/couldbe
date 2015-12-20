function not(v) {
  return typeof v === 'undefined' || v === null
}

function yes(v) {
  return !(not(v))
}

function or(a, b) {
  if (yes(a)) return a
  else        return b
}

function atom(v) {
  return typeof v !== 'object'
}

function couldbe(v, v_) {
  function f(a, b) {
    if (not(a))           return v
    if (yes(b) && yes(v)) return or(v[a], b)
    if (yes(b))           return b
    if (yes(v))           return couldbe(v[a])
    else                  return couldbe()
  }
  if (yes(v_))           return or(v, v_)
  if (yes(v) && atom(v)) return v
  else                   return f
}

module.exports = couldbe
