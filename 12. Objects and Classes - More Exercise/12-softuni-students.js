function solve(inputArray) {
    let courses = {};
    for (const line of inputArray) {
        if (line.includes(": ")) {
            let [courseName, capacity] = line.split(": ");
            if (courses.hasOwnProperty(courseName)) {
                courses[courseName].freePlaces += parseInt(capacity);
            } else {
                courses[courseName] = {
                    freePlaces: parseInt(capacity),
                    students: []
                }
            }            
        } else {
            let tokens = line.split(" ");
            let [username, creditsCountwithBracket] = tokens[0].split("[");
            creditsCount = parseInt(creditsCountwithBracket.substring(0, creditsCountwithBracket.length - 1));
            let email = tokens[3];
            let courseName = tokens[5];

            if (courses.hasOwnProperty(courseName) && courses[courseName].freePlaces > 0) {
                courses[courseName].freePlaces--;
                courses[courseName].students.push({
                    credits: creditsCount,
                    userInfo: `${username}, ${email}`
                });
            }
        }
    }

    let sortedCoursesEntries = Object.entries(courses).sort((a, b) => b[1].students.length - a[1].students.length);
    for (const [courseName, courseEntry] of sortedCoursesEntries) {
        console.log(`${courseName}: ${courseEntry.freePlaces} places left`);
        let sortedStudents = courseEntry.students.sort((a, b) => b.credits - a.credits);
        for (const student of sortedStudents) {
            console.log(`--- ${student.credits}: ${student.userInfo}`);
        }
    }
}