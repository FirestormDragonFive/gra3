 // Create the state that will contain the whole game
var mainState = {  
    preload: function() {  
        // Here we preload the assets
        game.load.image('player','assets/sprite.png');
        game.load.image('wall', 'assets/wall.png');
        game.load.image('coin', 'assets/points.png');
    	game.load.image('enemy', 'assets/sprite2.png');    
    },

    create: function() {  
		// Tutaj będzie wszystko co dotyczy tworzena 
 		//Tworze tło
        game.stage.backgroundColor = '#3598db';
        //uruchamiamy fizyke gry
        game.physics.startSystem(Phaser.Physics.ARCADE);
     
     
        //fizyka uruchamiana jest dla wszystkich obiektów
        game.world.enableBody= true;
//zmienna w której będę przechowywać dane o tym 
        //jaki przycisk jest wciśnięty
        this.cursor = game.input.keyboard.createCursorKeys();
        
        //Umiejscowienie plejera w grze
        this.player=game.add.sprite(70,100,'player');
        //width-szerokość
        this.player.width = 20;
        //heigt wysokość
        this.player.height = 30;
        //spadanie naszego plejera
        this.player.body.gravity.y= 200;
    
        game.camera.follow(player);

        //łączenie elementów w grupy
        this.walls = game.add.group();
        this.enemies = game.add.group();
        this.coins = game.add.group();
        //robimy poziom, tworzymy level 
        // x-oznacza ściane o-coin !-enemy
        //możemy dodawać w tablicy kolejne wersy i kolumny, dzięki temu nasz poziom będzie odpowiednio wyższy i szerszy
        var level = [
        'x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x ',
        'x x                                                         x x',
        'x x                                                         x x',
        'x x     o  o   o   o   o  o                      o          x x',
        'x x x x x x x x x x x x x x x x          x x x              x x',
        'x x          x x x x                               x x x    x x',
        'x x                                                         x x',
        'x x                          x x x                          x x',
        'x x                                     x x x               x x',
        'x x           x x x                                         x x',
        'x x                                                         x x',
        'x x         x x           x x x                             x x',
        'x x     o   x x ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! x x',
        'x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x x',
        ];
        //sprawdzanie naszej tablicy, jaki jest znak? Kompilator będzie sprawdzał
        // od najwyższego znaku po lewej stronie do najniższego po prawej
        // i oraz j to liczba porządkowa odpowiednio wersu i kolumny
        //i++ dodaje nam 1 do zmiennej czyli jeżeli mamy i = 0, potem napiszem i++ to wartość naszej zmiennej będzie wynosiła i=1
        for (var i = 0; i < level.length; i++) {
   			 for (var j = 0; j < level[i].length; j++) {

        // Tworzymy ściany  jeżeli dodajemy sprite o dowolnej nazwie to taki będzie na to wzór
        //var nazwaduszka = game.add.sprite(x, y, nazwaktóranadaliśmyduszkowi)
        	if (level[i][j] == 'x') {
            var wall = game.add.sprite(20*j, 20*i, 'wall');
            //za pomocą dwóch poniższych linijek mogę zwiększać i zmniejszać moje ściany
            wall.width = 30;
            wall.height = 20;
            this.walls.add(wall);
            wall.body.immovable = true; 
        	}

        // Tworzy pieniądze i łączy je w grupy 
        	else if (level[i][j] == 'o') {
            var coin = game.add.sprite(20*j, 20*i, 'coin');
             coin.width = 20;
            coin.height = 20;
            this.coins.add(coin);
           

        	}

        //dodaje wrogów tam gdzie są ! i łączy ich w grupę
        	else if (level[i][j] == '!') {
            var enemy = game.add.sprite(20*j,20*i, 'enemy');
            enemy.width=30;
            enemy.height=20;


            this.enemies.add(enemy);
        											}
    												}
    											}

	},
        

    

    update: function() { 

        //To są zdarzenia, decydują o tym co ma się stać, gdy jeden duszek spotka drugiego duszka, tak jak mówiłam program wczytywany jest
        //od góry do dołu i jeśli chcecie mieć skakanie to najpierw trzeba zaprogramować zdarzenia, a dopiero potem sterowanie, jak 
        //zamienicie kolejność to powinno być wszystko dobrz 
            game.physics.arcade.collide(this.player, this.walls);
            game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);
            game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
        //sterowanie duszka
       if (this.cursor.left.isDown){
       	  this.player.body.velocity.x= -200;
       }
       else if (this.cursor.right.isDown) {
       	  this.player.body.velocity.x= 200;
       }
       
       else{
       	this.player.body.velocity.x=0;
       }

       if(this.cursor.up.isDown && this.player.body.touching.down ) {
    	this.player.body.velocity.y = -250;
        
        }
        

 },

 //funkcja odpowiadająca za zabieranie pieniążka
takeCoin: function(player, coin) {
        coin.kill();
},
//funkcja odpowiadająca za restartowanie gry gdy wpadnie się do lawy
restart: function() {
    game.state.start('main');
},

};

// Initialize the game and start our state

var game = new Phaser.Game(1300,300);  
game.state.add('main', mainState);  
game.state.start('main');









