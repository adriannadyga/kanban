'use strict'

//kod aplikacji będzie wykonywany po załadowaniu drzewa DOM
document.addEventListener('DOMContentLoaded', function() {
    //funkcja generująca 10 losowych znaków chars składanych w jeden string
    function randomString() { 
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    function generateTemplate(name, data, basicElement) {
        var template = document.getElementById(name).innerHTML;
        var element = document.createElement(basicElement || 'div');
      
        Mustache.parse(template);
        element.innerHTML = Mustache.render(template, data);
      
        return element;
    }
    //klasa Column
    function Column(name) {
        var self = this;
      
        this.id = randomString();
        this.name = name;
        this.element = generateTemplate('column-template', { name: this.name });

        this.element.querySelector('.column').addEventListener('click', function (event) {
            //usuwanie kolumny po kliknięciu
            if (event.target.classList.contains('btn-delete')) {
              self.removeColumn();
            }
            //dodawanie karty po kliknięciu
            if (event.target.classList.contains('add-card')) {
              self.addCard(new Card(prompt("Enter the name of the card")));
            }
        });
    }
    //dodanie do prototypu metod: usuwanie kolumny i dodawanie karty
    Column.prototype = {
        addCard: function(card) {
          this.element.querySelector('ul').appendChild(card.element);
        },
        removeColumn: function() {
          this.element.parentNode.removeChild(this.element);
        }
    };
    //klasa card
    function Card(description) {
        var self = this;
      
        this.id = randomString();
        this.description = description;
        this.element = generateTemplate('card-template', { description: this.description }, 'li');
        //usunięcie karty
        this.element.querySelector('.card').addEventListener('click', function (event) {
            event.stopPropagation();
          
            if (event.target.classList.contains('btn-delete')) {
              self.removeCard();
            }
        });
    }
    // dodanie do prototypu metody usunięcia karty
    Card.prototype = {
        removeCard: function() {
            this.element.parentNode.removeChild(this.element);
        }
    }
    //tworzenie obiektu tablicy 
    var board = {
        name: 'Kanban Board',
        addColumn: function(column) {
          this.element.appendChild(column.element);
          initSortable(column.id); 
        },
        element: document.querySelector('#board .column-container')
    };
    //korzystanie z biblioteki sortable: opcja drag'n'drop
    function initSortable(id) {
        var el = document.getElementById(id);
        var sortable = Sortable.create(el, {
          group: 'kanban',
          sort: true
        });
    }
    //po kliknięciu dodanie nowej kolumny
    document.querySelector('#board .create-column').addEventListener('click', function() {
        var name = prompt('Enter a column name');
        var column = new Column(name);
        board.addColumn(column);
    });
    //tworzenie kolumn
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');
    //dodawanie kolumn do tablicy
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);
    //tworzenie kart
    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');
    //dodawanie kart do kolumn
    todoColumn.addCard(card1);
    doingColumn.addCard(card2); 
});