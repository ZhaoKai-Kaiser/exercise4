describe('this', function() {
  it('setTimeout', function(done) {
    var obj = {
      say: function() {
        setTimeout(() => {
          // this 是什么？想想为什么？
          // this 是 say 的 this, 而 say 的 this 通过隐式绑定规则绑定,其值为 obj
          this.should.equal(obj)
          done()
        }, 0)
      }
    }
    obj.say()
  })

  it('global', function() {
    function test() {
      // this 是什么？想想为什么？
      // 默认绑定
      this.should.equal(global)
    }
    test()
  })

  describe('bind', function() {
    it('bind undefined', function() {
      var obj = {
        say: (function() {
          function _say() {
            // this 是什么？想想为什么？
            this.should.equal(global)
          }
          // 硬绑定 但此时 obj 虽已声明但未赋值 故为 undefined 故 this 为 global
          return _say.bind(obj)
        })()
      }
      obj.say()
    })

    it('bind normal', function() {
      var obj = {}
      obj.say = (function() {
        function _say() {
          // this 是什么？想想为什么？
          this.should.equal(obj)
        }
        // 硬绑定 但此时 obj = {} 故 this 为 obj
        return _say.bind(obj)
      })()
      obj.say()
    })
  })
})
