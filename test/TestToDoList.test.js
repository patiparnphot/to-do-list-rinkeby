const { assert } = require('chai');

const ToDoList = artifacts.require('ToDoList')

require('chai')
  .use(require('chai-as-promised'))
  .should()

function tokens(n) {
  return web3.utils.toWei(n, 'ether');
}

contract('ToDoList', ([owner]) => {
  let toDoList

  before(async () => {
    // Load Contracts
    toDoList = await ToDoList.new()

  })

  describe('ToDoList deployment', async () => {
    it('has a name', async () => {
      const name = await toDoList.name()
      assert.equal(name, 'TO_DO_LIST')
    })

    it('has list', async () => {
      const list = await toDoList.listGetter()
      assert.equal(list.length, 1)
      const firstTodo = await toDoList.list(0)
      assert.equal(firstTodo, "first todo")
    })
  })

  describe('ToDoList function', async () => {
    it('add todo', async () => {
      await toDoList.add().should.be.rejected
      await toDoList.add("new todo")
      const list = await toDoList.listGetter()
      assert.equal(list[1], "new todo")
    })

    it('remove todo', async () => {
      await toDoList.remove().should.be.rejected
      await toDoList.remove(2).should.be.rejected
      await toDoList.remove(-1).should.be.rejected
      await toDoList.remove(0)
      const list = await toDoList.listGetter()
      assert.equal(list[0], "new todo")
    })

    it('edit todo', async () => {
      await toDoList.edit().should.be.rejected
      await toDoList.edit("").should.be.rejected
      await toDoList.edit("", 1).should.be.rejected
      await toDoList.edit("", -1).should.be.rejected
      await toDoList.edit("edited todo", 0)
      const list = await toDoList.listGetter()
      assert.equal(list[0], "edited todo")
    })
  })

})