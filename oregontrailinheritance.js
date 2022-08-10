class Traveler {
    constructor(name){
        this.name = name;
        this.comida = 1;
        this.isHealthy = true;
    }
    hunt() {
        this.comida += 2;
    }
    eat() {
        if(this.comida > 0) {
            this.comida--;
        }else {
            this.isHealthy = false;
        }
    }
}
class Wagon {
    constructor(capacity) {
        this.capacity = capacity;
        this.passageiros = [];
    }
    getAvailableSeatCount() {
        return this.capacity - this.passageiros.length;
    }
    join(pessoa) {
        if(this.getAvailableSeatCount() > 0) {
            this.passageiros.push(pessoa)
        } 
    }
    shouldQuarantine() {
        return this.passageiros.some((pessoa) => pessoa.isHealthy == false)
    }
    totalFood() {
        return this.passageiros.reduce((acc, cur) => acc + cur.comida, 0);
    }
}
class Hunter extends Traveler{
    constructor(name) {
        super(name);
        this.comida = 2;
    }
    hunt() {
        this.comida += 5;
    }
    eat() {
        if(this.comida >= 2) {
            this.comida -= 2;
        }else {
            this.comida = 0;
            this.isHealthy = false;
        }
    }
    giveFood(traveler, numOfFoodUnits) {
        if(this.comida >= numOfFoodUnits) {
            traveler.comida += numOfFoodUnits;
            this.comida -= numOfFoodUnits;
        }
    }
}
class Doctor extends Traveler {
    constructor(name) {
        super(name);
    }
    heal(traveler) {
        if(!traveler.isHealthy) {
            traveler.isHealthy = true;
        }
    }
}
// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');

console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);

wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);

sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();

console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);

henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)

console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);

drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);

sarahunter.giveFood(juan, 4);
sarahunter.eat(); // Ela só tem um, então ela come e fica doente

console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);