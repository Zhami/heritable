# Heritable

Inheritance mechanisms for making prototypal classes

## Installation

via [npm]

    npm install heritable

*NOTE:* -- not yet installed in npm registry

## Usage


	var	Heritable = require('heritable.js'),
		Animal, Human,	// Constructors
		animal, human;	// instances

	Animal = new Heritable('Animal');
	animal = new Animal();
	console.log('animal instanceof Animal: ' + (animal instanceof Animal));

	Human = new Heritable('Human');
	human = new Human();
	console.log('human instanceof Animal: ' + (human instanceof Animal));
	console.log('human instanceof Human: ' + (human instanceof Human));
	console.log('animal instanceof Human: ' + (animal instanceof Human));

### Some details

You can provide an initializer function and methods for a Heritable class:

	animalInitializer = function (o) {
		o = o || {};
		this.type = o.type;
	};
	
	animalMethods = {
		getType: function () {
			return this.type;
		}
	};
	
	Animal = new Heritable('Animal', null, animalInitializer, animalMethods);
	animal = new Animal({type: 'gorilla'});
	console.log('animal type:   ' + animal.getType());

## To Do

	1 do not init if already an object
	2 add a method for adding methods to a Heritable class
	3 perhaps: distinguish Heritable class methods from members
