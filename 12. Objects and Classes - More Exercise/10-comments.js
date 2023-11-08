function solve(inputArray) {
    let users = [];
    let articles = {};

    for (const line of inputArray) {
        if (line.startsWith("user ")) {
            let username = line.slice("user ".length);
            if (!users.includes(username)) {
                users.push(username);
            }

        } else if (line.startsWith("article ")) {
            let articleName = line.slice("article ".length);
            articles[articleName] = [];

        } else {
            let [leftSideText, rightSideText] = line.split(": ");
            let [username, articleName] = leftSideText.split(" posts on ");
            let commentContent = rightSideText.replace(", ", " - ");

            if (users.includes(username) && articles.hasOwnProperty(articleName)) {
                let article = articles[articleName];
                let newComment = {
                    user: username,
                    content: commentContent
                }
                article.push(newComment);
            }
        }
    }

    let sortedArticleEntries = Object.entries(articles).sort((a, b) => b[1].length - a[1].length);
    for (const [articleName, comments] of sortedArticleEntries) {
        console.log(`Comments on ${articleName}`);
        let sortedComments = comments.sort((a, b) => a.user.localeCompare(b.user));
        
        for (const comment of sortedComments) {
            console.log(`--- From user ${comment.user}: ${comment.content}`);
        }
    }
}