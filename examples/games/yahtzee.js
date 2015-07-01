
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example');

var Die = function (game) {

    this.game = game;

    this.value = 1;
    this.locked = false;

    this.sprite = game.make.sprite(0, 0, 'dice', 'dieWhite1');
    this.sprite.inputEnabled = true;
    this.sprite.input.useHandCursor = true;
    this.sprite.events.onInputDown.add(this.clicked, this);

};

Die.prototype = {

    roll: function () {

        if (!this.locked)
        {
            this.value = this.game.rnd.between(1, 6);
            this.sprite.frameName = 'dieWhite' + this.value;
        }

    },

    clicked: function () {

        if (this.game.canLock)
        {
            if (this.locked)
            {
                this.unlock();
            }
            else
            {
                this.lock();
            }
        }

    },

    lock: function () {

        if (!this.locked)
        {
            this.locked = true;
            this.sprite.frameName = 'dieRed' + this.value;
        }

    },
    
    unlock: function () {

        if (this.locked)
        {
            this.locked = false;
            this.sprite.frameName = 'dieWhite' + this.value;
        }

    },

    reset: function () {

        this.unlock();
        this.roll();

    }

};

var Cup = function (game) {

    this.game = game;

    this.die1 = new Die(game);
    this.die2 = new Die(game);
    this.die3 = new Die(game);
    this.die4 = new Die(game);
    this.die5 = new Die(game);

};

Cup.prototype = {

    reset: function () {

        this.die1.reset();
        this.die2.reset();
        this.die3.reset();
        this.die4.reset();
        this.die5.reset();

    },

    shake: function () {

        this.die1.roll();
        this.die2.roll();
        this.die3.roll();
        this.die4.roll();
        this.die5.roll();

    },

    getDie: function (value) {

        var out = { total: 0, qty: 0, value: value };

        for (var i = 1; i <= 5; i++)
        {
            if (this['die' + i].value === value)
            {
                out.total += value;
                out.qty++;
            }
        }

        return out;

    },

    getFullSet: function () {

        return [
            this.getDie(1),
            this.getDie(2),
            this.getDie(3),
            this.getDie(4),
            this.getDie(5),
            this.getDie(6)
        ];

    }

};

//  Yahtzee combos:
//  
//  Top Row:
//  
//  1s, 2s, 3s, 4s, 5s, 6s
//  
//  Top Row Bonus: 35 points for getting 63+
//  
//  Bottom Row:
//  
//  Three of a Kind
//  Four of a Kind
//  Full House (any 3 + any 2)
//  Small straight (1,2,3,4 - 2,3,4,5 - 3,4,5,6)
//  Large straight (1,2,3,4,5 - 2,3,4,5,6)
//  Chance (sum of all dice)
//  Yahtzee (5 of a kind)

var ComboSingle = function (game, value) {

    this.game = game;

    this.value = value;

    this.score = 0;

    this.played = false;

    this.check = function () {

        var dice = this.game.cup.getDie(this.value);

        return (dice.qty);

    };

    this.play = function () {

        var dice = this.game.cup.getDie(this.value);

        this.score = dice.total;
        this.played = true;

    }

};

var ComboChance = function (game) {

    this.game = game;

    this.score = 0;

    this.played = false;

    this.check = function () {

        var set = this.game.cup.getFullSet();
        var score = 0;

        for (var i = 0; i < set.length; i++)
        {
            score += set[i].total;
        }

        return score;

    };

    this.play = function () {

        var set = this.game.cup.getFullSet();

        for (var i = 0; i < set.length; i++)
        {
            this.score += set[i].total;
        }

        this.played = true;

    }

};

var ComboStraight = function (game, size, points) {

    this.game = game;

    this.size = size;

    this.score = 0;

    this.points = points;

    this.played = false;

    //  Small straight (1,2,3,4 - 2,3,4,5 - 3,4,5,6)
    //  11223
    //  Large straight (1,2,3,4,5 - 2,3,4,5,6)

    this.check = function () {

        var set = this.game.cup.getFullSet();

        //  A small straight means the set cannot have a qty 3+ anywhere
        //  A large straight means it cannot have a qty 2+ anywhere

        for (var i = 0; i < set.length; i++)
        {
            if (set[i].qty >= this.size)
            {
                return false;
            }
        }

        return true;

    };

    this.play = function () {

        this.played = true;

        this.score = this.points;

    };

};

var ComboFullHouse = function (game) {

    this.game = game;

    this.score = 0;

    this.played = false;

    this.check = function () {

        var set = this.game.cup.getFullSet();

        //  Full House (any 3 + any 2)

        var any3 = false;
        var any2 = false;

        for (var i = 0; i < set.length; i++)
        {
            if (set[i].qty === 3)
            {
                any3 = true;
            }
            else if (set[i].qty === 2)
            {
                any2 = true;
            }
        }

        return (any3 && any2);

    };

    this.play = function () {

        this.played = true;

        this.score = 35;

    };

};

var ComboXOfAKind = function (game, value, points) {

    this.game = game;

    this.value = value;

    this.score = 0;

    this.points = points;

    this.played = false;

    this.check = function () {

        var set = this.game.cup.getFullSet();

        for (var i = 0; i < set.length; i++)
        {
            if (set[i].qty >= this.value)
            {
                return true;
            }
        }

        return false;

    };

    this.play = function () {

        if (this.points === false)
        {
            var set = this.game.cup.getFullSet();

            for (var i = 0; i < set.length; i++)
            {
                if (set[i].qty >= this.value)
                {
                    this.score = set[i].value * this.value;
                }
            }
        }
        else
        {
            this.score = this.points;
        }

        this.played = true;

    }

};

var Yahtzee = function (game) {

    this.cup = null;

    this.combo1 = new ComboSingle(this, 1);
    this.combo2 = new ComboSingle(this, 2);
    this.combo3 = new ComboSingle(this, 3);
    this.combo4 = new ComboSingle(this, 4);
    this.combo5 = new ComboSingle(this, 5);
    this.combo6 = new ComboSingle(this, 6);

    this.upperBonus = 0;

    this.comboThreeOfAKind = new ComboXOfAKind(this, 3, false);
    this.comboFourOfAKind = new ComboXOfAKind(this, 4, false);
    this.comboFullHouse = new ComboFullHouse(this);
    this.comboSmallStraight = new ComboStraight(this, 3, 30);
    this.comboLargeStraight = new ComboStraight(this, 2, 40);
    this.comboChance = new ComboChance(this);
    this.comboYahtzee = new ComboXOfAKind(this, 5, 50);

    this.total = 0;

    this.roll = 1;
    this.rollButton = null;
    this.canLock = false;

};

Yahtzee.prototype = {

    preload: function () {

        this.load.baseURL = 'assets/games/yahtzee/';
        this.load.image('board');
        this.load.image('glow');
        this.load.image('roll');
        this.load.atlas('dice');

    },

    create: function () {

        this.add.image(0, 0, 'board');

        this.cup = new Cup(this);

        //  Position the die

        for (var i = 1; i <= 5; i++)
        {
            var die = this.cup['die' + i].sprite;

            die.x = 120 * i;
            die.y = 32;

            this.world.add(die);
        }

        //  Score sheet

        // var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
        // var text = game.add.text(game.world.centerX, game.world.centerY, "- phaser -\nwith a sprinkle of\npixi dust", style);

        this.rollButton = this.add.sprite(this.world.centerX, 528, 'roll');
        this.rollButton.anchor.x = 0.5;
        this.rollButton.inputEnabled = true;
        this.rollButton.input.useHandCursor = true;
        this.rollButton.events.onInputDown.add(this.doRoll, this);

    },

    doRoll: function () {

        console.log("\n\nRoll " + this.roll);

        this.cup.shake();

        this.roll++;

        this.canLock = true;

        console.log('1s', this.combo1.check());
        console.log('2s', this.combo2.check());
        console.log('3s', this.combo3.check());
        console.log('4s', this.combo4.check());
        console.log('5s', this.combo5.check());
        console.log('6s', this.combo6.check());
        console.log('3ofaK', this.comboThreeOfAKind.check());
        console.log('4ofaK', this.comboFourOfAKind.check());
        console.log('full', this.comboFullHouse.check());
        console.log('sm. straight', this.comboSmallStraight.check());
        console.log('lg. straight', this.comboLargeStraight.check());
        console.log('yahtzee', this.comboYahtzee.check());
        console.log('chance', this.comboChance.check());

    }

};

game.state.add('Game', Yahtzee, true);

