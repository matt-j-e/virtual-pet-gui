// Pet's birth values
const START_HUNGER = 0;
const START_FITNESS = 10;

// Max / min settings
const MAXIMUM_FITNESS = 10;
const MINIMUM_HUNGER = 0;

// Effects of growing up:
const HUNGER_INCREMENT = 5;
const FITNESS_DECREMENT = 3;

// Effect of walking
const FITNESS_INCREMENT = 4;

// Effect of feeding
const HUNGER_DECREMENT = 3;

// Fitness level below which a walk is required
const WALK_TRIGGER = 4;

// Hunger level above which a feed is required
const FEED_TRIGGER = 4;

const DEATH_TRIGGER = {
    fitness: 0, // fitness level of 0 or less
    hunger: 10, // hunger level of 10 or more
    age: 30 // age of 30 or more
}

const DEAD_PARROT_MSG = "R.I.P.";


function Pet(name="Your pet") {
    this.name = name;
    this.age = 0;
    this.hunger = START_HUNGER;
    this.fitness = START_FITNESS;
    this.children = [];
}

Pet.prototype = {
    get isAlive() {
        return this.age < DEATH_TRIGGER.age && this.hunger < DEATH_TRIGGER.hunger && this.fitness > DEATH_TRIGGER.fitness;
    }
};

Pet.prototype.growUp = function() {
    if (!this.isAlive) {
        throw new Error(`${this.name} ${DEAD_PARROT_MSG}`);
    }
    this.age += 1;
    this.hunger += HUNGER_INCREMENT;
    this.fitness -= FITNESS_DECREMENT;
}

Pet.prototype.walk = function() {
    if (!this.isAlive) {
        throw new Error(`${this.name} ${DEAD_PARROT_MSG}`);
    }
    this.fitness += FITNESS_INCREMENT;
    if (this.fitness > MAXIMUM_FITNESS) this.fitness = MAXIMUM_FITNESS;
}

Pet.prototype.feed = function() {
    if (!this.isAlive) {
        throw new Error(`${this.name} ${DEAD_PARROT_MSG}`);
    }
    this.hunger -= HUNGER_DECREMENT;
    if (this.hunger < MINIMUM_HUNGER) this.hunger = MINIMUM_HUNGER;

}

Pet.prototype.checkUp = function() {
    if (!this.isAlive) return `${DEAD_PARROT_MSG}`
    if (this.fitness < WALK_TRIGGER && this.hunger > FEED_TRIGGER) {
        return "I am hungry AND I need a walk";
    } else if (this.fitness < WALK_TRIGGER) {
        return "I need a walk";
    } else if (this.hunger > FEED_TRIGGER) {
        return "I am hungry";
    } else {
        return "I feel great!";
    }
}

Pet.prototype.haveBaby = function(name) {
    const child = new Pet(name);
    this.children.push(child);
}

let p = new Pet();
console.log(p)
const status = document.querySelector('#status > p');
const age = document.querySelector('#age');
const fitness = document.querySelector('#fitness');
const hunger = document.querySelector('#hunger');
const controls = document.querySelector('#controls');

status.innerText = p.checkUp();
age.innerText = p.age;
fitness.innerText = p.fitness;
hunger.innerText = p.hunger;

function petLife(e) {
    if (e.target.name === 'restart') {
        p = new Pet();
        controls.style.display = 'block';
    }
    if (e.target.name === 'growUp') p.growUp();
    if (e.target.name === 'feed') p.feed();
    if (e.target.name === 'walk') p.walk();
    status.innerText = p.checkUp();
    age.innerText = p.age;
    fitness.innerText = p.fitness;
    hunger.innerText = p.hunger;
    if (!p.isAlive) controls.style.display = 'none';
}

const buttons = document.querySelectorAll(".btn");
buttons.forEach(button => button.addEventListener("click", petLife));





