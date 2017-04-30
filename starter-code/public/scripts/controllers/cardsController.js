angular.module('CardsAgainstAssembly')
  .controller('CardsController', CardsController);

CardsController.$inject = ['$scope', '$http'];

function CardsController($scope, $http){
console.log('cards controller');
  
  var self = this;
  self.all=[];
  self.newCard = {};

  self.addCard = addCard;
  self.getCards = getCards;
  self.deleteCard = deleteCard;

  function getCards(){
    $http
    .get('http://localhost:3000/cards')
    .then(function(res){
      console.log(res.data);
      self.all = res.data;
    });
  }
  getCards();

  function addCard(){
    console.log('Adding card');
    $http
      .post('http://localhost:3000/cards', self.newCard) 
      .then(function(res){
        getCards(); 
      });
      self.newCard = {};

  function deleteCard(){
    console.log("deleting");
    $http
      .delete('http://localhost:3000/cards/:id')
      .then(function(res){
        console.log(res.data);
      });
    }
  }
}
//   var vm = this;
//   vm.questionsList = [
//     {question: "What is Batman's guilty pleasure?"},
//     {question: "I'm sorry professor, I couldn't complete my homework because _________."},
//     {question: "I get by with a little help from _________."},
//     {question: "_________. It's a trap!"},
//     {question: "The class field trip was completely ruined by _________."},
//     {question: "What's my secret power?"}
//   ]
// }