function solve(inputArray) {    
    class Grade {
        constructor(grade) {
            this.grade = grade;
            this.studentNames = [];
            this.studentScores = [];
        }

        getAverageScore() {
            return this.studentScores.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
              }, 0) / this.studentScores.length;
        }
    }

    let register = {};

    for (const studentInfo of inputArray) {
        let tokens = studentInfo.split(/[: ,]/);
        let name = tokens[3];
        let grade = parseInt(tokens[7]);
        let score = parseFloat(tokens[15]);

        if (score > 3) {
            if (!Object.keys(register).includes(grade.toString())) {
                register[grade] = new Grade(grade);
            }
            register[grade].studentNames.push(name);
            register[grade].studentScores.push(score);
        }
    }

    let sortedGradeKeys = Object.keys(register).sort((a, b) => a - b);
    for (const gradeKey of sortedGradeKeys) {
        let currentGrade = register[gradeKey];
        console.log(`${currentGrade.grade + 1} Grade`);
        console.log(`List of students: ${currentGrade.studentNames.join(", ")}`);
        console.log(`Average annual score from last year: ${currentGrade.getAverageScore().toFixed(2)}\n`);        
    }
}