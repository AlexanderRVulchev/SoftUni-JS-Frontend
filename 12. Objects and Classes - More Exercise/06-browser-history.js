function solve(browser, commands) {
    for (const command of commands) {
        if (command === "Clear History and Cache") {
            browser["Open Tabs"] = [];
            browser["Recently Closed"] = [];
            browser["Browser Logs"] = [];

        } else {
            let [action, ...restOfTheTokens] = command.split(" ");
            let tabName = restOfTheTokens.join(" ");

            if (action === "Open" && !browser["Open Tabs"].includes(tabName)) {
                browser["Open Tabs"].push(tabName);
                browser["Browser Logs"].push(command);

            } else if (action === "Close" && browser["Open Tabs"].includes(tabName)) {
                let indexToRemove = browser["Open Tabs"].indexOf(tabName);
                browser["Open Tabs"].splice(indexToRemove, 1);
                browser["Recently Closed"].push(tabName);
                browser["Browser Logs"].push(command);
            }
        }
    }

    console.log(`${browser["Browser Name"]}`);
    console.log(`Open Tabs: ${browser["Open Tabs"].join(", ")}`);
    console.log(`Recently Closed: ${browser["Recently Closed"].join(", ")}`);
    console.log(`Browser Logs: ${browser["Browser Logs"].join(", ")}`);
}