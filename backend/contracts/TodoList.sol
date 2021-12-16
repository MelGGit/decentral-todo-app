// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;


contract TodoList {
  address private owner;

  struct Task {
    string text;
    bool done;
  }

 // addressTo... {
   // 0xndm,k : ['Test']
//  }
  mapping(address => string[]) public addressToListsMapping;

//  addressToListsToTasksMapping ¨{
//   0xbajd {
//     test: {
//       ['ajdgjasd', 'dnfksdfn']
//     }
//   }
// }
  mapping(address => mapping(string => Task[])) public addressToListsToTasksMapping;

  function addList(string memory _listName) public {
    addressToListsMapping[msg.sender].push(_listName);
  }

  function getLists() public view returns(string[] memory) {
    return addressToListsMapping[msg.sender];
  }

  function addUpdateTasks(string memory _listName, Task[] memory _tasks) public {

    Task[] storage currentTasks = addressToListsToTasksMapping[msg.sender][_listName];
    Task memory task;
    for(uint i = 0; i < _tasks.length; i++) {
      task.text = _tasks[i].text;
      task.done = _tasks[i].done;
      if(currentTasks.length > 0 && i < currentTasks.length -1) {
        currentTasks[i].text = task.text;
        currentTasks[i].done = task.done;
      } else {
        currentTasks.push(task);
      }
    }
  }

  function getTasks(string memory _listName) public view returns(Task[] memory) {
    return addressToListsToTasksMapping[msg.sender][_listName];
  }

  function deleteList(string memory _listName, uint index) public {
    string[] storage currentLists = addressToListsMapping[msg.sender];
    currentLists[index] = currentLists[currentLists.length -1];
    currentLists.pop();
    delete addressToListsToTasksMapping[msg.sender][_listName];
  }
}