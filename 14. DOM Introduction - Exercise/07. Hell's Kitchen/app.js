function solve() {
   document.querySelector('#btnSend').addEventListener('click', onClick);

   function onClick() {
      let inputText = document.getElementsByTagName("textarea")[0].value;
      let inputArray = Array.from(JSON.parse(inputText));

      let restaurants = {};

      for (const line of inputArray) {
         let [thisRestaurantName, workersInfo] = line.split(" - ");
         let workersInfoChunks = workersInfo.split(", ");

         let thisRestaurantWorkers = [];
         let thisRestaurantBestSalary = -1;
         let salariesSumInThisRestaurant = 0;

         if (restaurants.hasOwnProperty(thisRestaurantName)) {
            let duplicateRestaurant = restaurants[thisRestaurantName];
            thisRestaurantWorkers = duplicateRestaurant.workers;
            thisRestaurantBestSalary = duplicateRestaurant.bestSalary;
            salariesSumInThisRestaurant = duplicateRestaurant.averageSalary * thisRestaurantWorkers.length;
         }

         for (const workerInfo of workersInfoChunks) {
            let [workerName, workerSalary] = workerInfo.split(" ");

            let worker = {
               workerName: workerName,
               workerSalary: Number(workerSalary)
            };

            if (worker.workerSalary > thisRestaurantBestSalary) {
               thisRestaurantBestSalary = worker.workerSalary
            };

            salariesSumInThisRestaurant += worker.workerSalary;
            thisRestaurantWorkers.push(worker);
         }

         let thisRestaurantAverageSalary = salariesSumInThisRestaurant / thisRestaurantWorkers.length;

         restaurants[thisRestaurantName] = {
            restaurantName: thisRestaurantName,
            averageSalary: thisRestaurantAverageSalary,
            bestSalary: thisRestaurantBestSalary,
            workers: thisRestaurantWorkers
         }

      }
      let sortedRestaurantEntries = Object.entries(restaurants).sort((a, b) => b[1].averageSalary - a[1].averageSalary);
      let bestRestaurant = sortedRestaurantEntries[0][1];

      let bestRestaurantOutputElement = Array.from(document.getElementById("bestRestaurant").children)[1];
      bestRestaurantOutputElement.textContent = `Name: ${bestRestaurant.restaurantName} Average Salary: ${bestRestaurant.averageSalary.toFixed(2)} Best Salary: ${bestRestaurant.bestSalary.toFixed(2)}`;

      let workersOutputElement = Array.from(document.getElementById("workers").children)[1];
      let sortedWorkers = bestRestaurant.workers.sort((a, b) => b.workerSalary - a.workerSalary);
      let workersOutput = "";

      for (const worker of sortedWorkers) {
         workersOutput += `Name: ${worker.workerName} With Salary: ${worker.workerSalary} `;
      }
      workersOutputElement.textContent = workersOutput;
   }
}