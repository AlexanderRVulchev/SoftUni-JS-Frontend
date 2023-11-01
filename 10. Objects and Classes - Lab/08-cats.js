function solve(inputArray) {
    class Cat {        
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }

        meow = () => console.log(`${this.name}, age ${this.age} says Meow`);
    }

    for (const item of inputArray) {
        let [name, age] = item.split(" ");
        let cat = new Cat(name, age);
        cat.meow();
    }
}