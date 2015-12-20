import blanket from 'blanket'
import { expect } from 'chai'

blanket({ pattern: f => !/node_modules/.test(f)})
const couldbe = require('../')

describe('couldbe', () => {
  it('should resolve 42 -> 42', () =>
    expect(couldbe(42)).to.equal(42)
  )
  it('should resolve 42 24 -> 42', () =>
    expect(couldbe(42, 24)).to.equal(42)
  )
  it('should resolve "42" 24 -> "42"', () =>
    expect(couldbe("42", 24)).to.equal("42")
  )

  it('should resolve "" 24 -> "42"', () =>
    expect(couldbe("", 24)).to.equal("")
  )
  it('should resolve 0 24 -> 0', () =>
    expect(couldbe(0, 24)).to.equal(0)
  )
  it('should resolve false 24 -> false', () =>
    expect(couldbe(false, 24)).to.equal(false)
  )
  it('should resolve null 24 -> 24', () =>
    expect(couldbe(null, 24)).to.equal(24)
  )
  it('should resolve undefined 24 -> 24', () =>
    expect(couldbe(undefined, 24)).to.equal(24)
  )
  it('should resolve null -> null', () =>
    expect(couldbe(null)()).to.equal(null)
  )
  it('should resolve undefined -> undefined', () =>
    expect(couldbe(undefined)()).to.equal(undefined)
  )
  it('should resolve (undefined) -> undefined', () =>
    expect(couldbe()()).to.equal(undefined)
  )

  it('should resolve {} -> {}', () => {
    const o = {}
    expect(couldbe(o)()).to.equal(o)
  })
  it('should resolve [] -> []', () => {
    const a = []
    expect(couldbe(a)()).to.equal(a)
  })

  it('should resolve {x}.x -> x', () =>
    expect(couldbe({x: 'x_'})('x')).to.equal('x_')
  )
  it('should resolve {x}.y -> function', () =>
    expect(couldbe({x: 'x_'})('y')).to.be.a('function')
  )
  it('should resolve {x}.y! -> undefined', () =>
    expect(couldbe({x: 'x_'})('y')()).to.equal(undefined)
  )
  it('should resolve {x}.y z -> z', () =>
    expect(couldbe({x: 'x_'})('y', 'z_')).to.equal('z_')
  )
  it('should resolve {w}.x.y z -> z', () =>
    expect(couldbe({w: 'w_'})('x')('y', 'z_')).to.equal('z_')
  )
  it('should resolve {u.v}.w.x.y z -> z', () =>
    expect(couldbe({u: {v: 'v_'}})('w')('x')('y', 'z_')).to.equal('z_')
  )

  it('should resolve {w.x}.w.x -> x', () =>
    expect(couldbe({w: {x: 'x_'}})('w')('x')).to.equal('x_')
  )
  it('should resolve {w.x}.w.y -> function', () =>
    expect(couldbe({w: {x: 'x_'}})('w')('y')).to.be.a('function')
  )
  it('should resolve {w.x}.w.y z -> z', () =>
    expect(couldbe({w: {x: 'x_'}})('w')('y', 'z_')).to.equal('z_')
  )
  it('should resolve {w.x<null>}.w.x z -> z', () =>
    expect(couldbe({w: {x: null}})('w')('x', 'z_')).to.equal('z_')
  )

  it('should resolve [i].i -> i', () =>
    expect(couldbe([0,1,2])(1)).to.equal(1)
  )
  it('should resolve [i<null>].i k -> k', () =>
    expect(couldbe([0,null,2])(1, 3)).to.equal(3)
  )
  it('should resolve [i].j k -> k', () =>
    expect(couldbe([0,1,2])(9, 3)).to.equal(3)
  )
  it('should resolve [i{x}].i.x -> x', () =>
    expect(couldbe([0,{x: 'x_'},2])(1)('x')).to.equal('x_')
  )
})
