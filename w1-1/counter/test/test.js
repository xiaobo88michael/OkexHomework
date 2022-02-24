//const { func } = require("assert-plus");

//const { iteratee } = require("lodash");

const Counter = artifacts.require("Counter");

contract('Counter', (accounts) => {
  var counterInstance;
  it("Counter", function() {
    return Counter.deployed()
    .then(function(instance){
      counterInstance = instance;
      return counterInstance.count();

    }).then(function() {
      return counterInstance.counter();
    }).then(function(count) {
      assert.equal(count, 1);
    })
  })
});
