function solve(people, type, day) {
    let pricesByDay = {
        'Friday': [8.45, 10.90, 15],
        'Saturday': [9.80, 15.60, 20],
        'Sunday': [10.46, 16, 22.50]
    };

    let total;
    switch (type) {

        case 'Students':
            total = people * pricesByDay[day][0];
            if (people >= 30) {
                total *= 0.85;
            } break;

        case 'Business':
            if (people >= 100) {
                people -= 10;
            }
            total = people * pricesByDay[day][1];
            break;

        case 'Regular':
            total = people * pricesByDay[day][2];
            if (people >= 10 && people <= 20) {
                total *= 0.95;
            }
            break;

        default: break;
    }

    console.log(`Total price: ${total.toFixed(2)}`);
}