(function () {

	var app = document.getElementById('app');

	var inputCharacters = document.getElementById('password-length');

	var config = {
		characters: parseInt(inputCharacters.value),
		symbols: true,
		numbers: true,
		uppercase: true,
		lowercase: true
	}

	var characters = {
		numbers: '0 1 2 3 4 5 6 7 8 9',
		symbols: '! @ # $ % ^ & * ( ) _ - + = { [ } ] ; : < , > . ? /',
		uppercase: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
		lowercase: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
	}

	app.addEventListener('submit', function (e) {
		e.preventDefault();
	});

	app.elements.namedItem('btn-plus-one').addEventListener('click', function () {
		config.characters++;
		inputCharacters.value = config.characters;
	});

	app.elements.namedItem('btn-minus-one').addEventListener('click', function () {
		if (config.characters > 1) {
			config.characters--;
			inputCharacters.value = config.characters;
		}
	});

	app.elements.namedItem('btn-symbols').addEventListener('click', function () {
		btnToggle(this);
		config.symbols = !config.symbols;
	});

	app.elements.namedItem('btn-numbers').addEventListener('click', function () {
		btnToggle(this);
		config.numbers = !config.numbers;
	});

	app.elements.namedItem('btn-uppercase').addEventListener('click', function () {
		btnToggle(this);
		config.uppercase = !config.uppercase;
	});

	app.elements.namedItem('btn-generate').addEventListener('click', function () {
		generatePassword();
	});

	app.elements.namedItem('input-password').addEventListener('click', function () {
		copyPassword();
	});

	function btnToggle(element) {
		element.classList.toggle('false');
		element.childNodes[0].classList.toggle('fa-check');
		element.childNodes[0].classList.toggle('fa-times');
	}

	function generatePassword() {
		var finalCharacters = '';
		var password = '';

		for (row in config) {
			if (config[row] == true) {
				finalCharacters += characters[row] + ' ';
			}
		}

		finalCharacters = finalCharacters.trim();
		finalCharacters = finalCharacters.split(' ');

		for (var i = 0; i < config.characters; i++) {
			password += finalCharacters[Math.floor(Math.random() * finalCharacters.length)];
		}

		app.elements.namedItem('input-password').value = password;
	}

	function copyPassword() {
		app.elements.namedItem('input-password').select();
		document.execCommand("copy");
		document.getElementById('alert-copied').classList.add('active');

		setTimeout(function () {
			document.getElementById('alert-copied').classList.remove('active');
		}, 2000);
	}

	generatePassword();

}());