// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract ToDoList {
  string public name = "TO_DO_LIST";
  string[] public list = ["first todo"];

  function listGetter() public view returns(string[] memory) {
    return list;
  }

  function add(string memory _todo) public {
    require(bytes(_todo).length > 0, "must enter something");
    list.push(_todo);
  }

  function remove(uint _index) public {
    require(_index < list.length && _index >= 0, "index mismatch");

    for(uint i = _index; i < list.length - 1; i++) {
      list[i] = list[i+1];
    }

    list.pop();
  }

  function edit(string memory _todo, uint _index) public {
    require(bytes(_todo).length > 0, "must enter something");
    require(_index < list.length && _index >= 0, "index mismatch");

    list[_index] = _todo;
  }
}
