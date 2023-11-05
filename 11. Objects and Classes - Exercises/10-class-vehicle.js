class Vehicle {
    constructor(type, model, parts, fuel) {
        this.type = type;
        this.model = model;
        this.fuel = fuel;
        this.parts = {
            engine: parts.engine,
            power: parts.power,
            quality: parts.engine * parts.power
        };
    }

    drive(fuelLoss) {
        this.fuel -= fuelLoss;    
    }
}