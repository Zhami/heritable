var	Heritable = require('../index.js'),
//	eyes = require('eyes'),
	Animal, Human,
	animal, human,
	animalInitializer, animalMethods, humanInitializer, humanMethods;

console.log('\n========New Test========\n');

animalInitializer = function (o) {
	o = o || {};
	this.type = o.type;
};

animalMethods = {
	getType: function () {
		return this.type;
	}
};

humanInitializer = function (o) {
	o = o || {};
	this.name = o.name || '';
	this.age = o.age || 0;
	this.type = 'Human';
};

humanMethods = {
	getAge: function () {
		return this.age;
	},
	getName: function () {
		return this.name;
	}
};

	
console.log('test: about to create Heritable Animal');
Animal = new Heritable('Animal', null, animalInitializer, animalMethods);
//eyes.inspect(Animal, 'Animal: ');

console.log('Animal getClassName() = ' + Animal.getClassName());
console.log('Animal serialNum by func = ' + Animal.getSerialNum());
console.log('Animal serialNum by proxy = ' + Animal.proxy('getSerialNum'));

animal = new Animal({type: 'gorilla'});
eyes.inspect(animal, 'animal: ');
console.log('animal type by property: ' + animal.type);
console.log('animal type by getter:   ' + animal.getType());
console.log('animal instanceof Animal: ' + (animal instanceof Animal));

Human = new Heritable('Human', Animal, humanInitializer, humanMethods);
//eyes.inspect(Man, 'Man: ');
console.log('Man getClassName() = ' + Human.getClassName());
console.log('Man serialNum by func = ' + Human.getSerialNum());
console.log('Man serialNum by proxy = ' + Human.proxy('getSerialNum'));

human = new Human({name: 'Ryan', age: 'ageless'});
eyes.inspect(human, 'human: ');
console.log('human type by property: ' + human.type);
console.log('human type by getter:   ' + human.getType());
console.log('human name by property: ' + human.name);
console.log('human name by getter:   ' + human.getName());
console.log('human age by property: ' + human.age);
console.log('human age by getter:   ' + human.getAge());
console.log('human instanceof Animal: ' + (human instanceof Animal));
console.log('human instanceof Human: ' + (human instanceof Human));
console.log('animal instanceof Human: ' + (animal instanceof Human));

console.log('human.constructor.className: ' + human.constructor.className);
console.log('human.constructor.uberClass.className: ' + human.constructor.uberClass.className);


