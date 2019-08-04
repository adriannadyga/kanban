
//ZMIENNE DO KOMUNIKACJI Z SERWEREM
var baseUrl = 'https://cors-anywhere.herokuapp.com/https://kodilla.com/pl/bootcamp-api'; //podstawowy adres serwera
var myHeaders = { 
  'X-Client-Id': '4283',
  'X-Auth-Token': 'd286fa5e04cce319d15d4b2b697f4191'
};

//FUNKCJA ODPYTAUJĄCA SERWER O ZASÓB TABLICY
fetch(baseUrl + '/board', { headers: myHeaders })
  .then(function(resp) {
    return resp.json();
  })
  .then(function(resp) {
    setupColumns(resp.columns);
});

function setupColumns(columns) {
  columns.forEach(function(column) {
		var col = new Column(column.id, column.name);
      board.addColumn(col);
      setupCards(col, column.cards);
  });
}

function setupCards(col, cards) {
	cards.forEach(function (card) {
    var cardObj = new Card(card.id, card.name);
  	col.addCard(cardObj);
	});
}

function generateTemplate(name, data, basicElement) {
  	var template = document.getElementById(name).innerHTML;
  	var element = document.createElement(basicElement || 'div');
  
  	Mustache.parse(template);
  	element.innerHTML = Mustache.render(template, data);
  
  	return element;
}
