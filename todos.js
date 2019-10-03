const SeleniumInfra = require("./seleniumInfra")

const seleniumInfra = new SeleniumInfra()

class TodosPage {
    constructor(URL) {
        seleniumInfra.getURL(URL)
    }


    async insertAndDelete(todoText) {
        try {
            await seleniumInfra.clickElement("id", "todo-input");
            await seleniumInfra.write(todoText, "id", "todo-input");  // first step insert an input and click the add button
            await seleniumInfra.clickElement("id", "addToDo");

        } catch (error) {
            console.error("you have a problem with the code above" + error)
        }

        try {
            if (await seleniumInfra.isElementExists("xpath", "//div[@id = 'todos']/child::div[1]")) {  // now after the new input we need to find if a new div was created
                console.log("found a new div")

                if (await seleniumInfra.getTextFromElement("xpath", `//div[@id = "todos"]/child::div[1]/span[1]`) == todoText) {
                    console.log("New div has the same text")
                }
                else {
                    console.log("Error: New div does not has the same text")
                }
            }
            else {
                console.log("Error: Can’t find a new div")
            }
        } catch (error) {
            console.error("something went wrong with the DIV search" + error)
        }

        await seleniumInfra.clickElement("xpath", "//i[@class = 'fas fa-trash']")
        if (await seleniumInfra.isElementExists("xpath", "//div[@id = 'todos']/child::div[1]")) {  // find the delete item and make sure that the div wes deleted
            console.log("The div was not deleted")
        } else {
            console.log("The div was deleted")
        }

        await seleniumInfra.close()
    }

    async  insertAndComplete(todoText) {
        await seleniumInfra.clickElement("id", "todo-input");
        await seleniumInfra.write(todoText, "id", "todo-input");  // first step again insert an input and click the add button..
        await seleniumInfra.clickElement("id", "addToDo");

        if (await seleniumInfra.isElementExists("xpath", "//div[@id = 'todos']/child::div[1]")) {  // now after the new input we need to find if a new div was found!
            console.log("found a new div")
        }
        else {
            console.log("Error: Can’t find a new div")
        }

        await seleniumInfra.clickElement("xpath", "//i[@class = 'fas fa-check-circle']") // pressing on the check item
            if(await seleniumInfra.isElementExists("xpath" , "//*[@id='todos']/div/i")) {
                console.log("the new div was checked")
            } 
            else {
                console.log("Error: the new div was NOT checked") // confirm that the input was checked
            }

        await seleniumInfra.close()
    }

    async insertTwoDeleteFirst(todoText1, todoText2) {
        await seleniumInfra.clickElement("id", "todo-input");
        await seleniumInfra.write(todoText1, "id", "todo-input");  // first step again insert an input and click the add button..
        await seleniumInfra.clickElement("id", "addToDo");

        if (await seleniumInfra.isElementExists("xpath", "//div[@id = 'todos']/child::div[1]")) {  // now after the new input we need to find if a new div was found!
            console.log("found a new div")
        }
        else {
            console.log("Error: Can’t find a new div")
        }

        await seleniumInfra.clickElement("id", "todo-input");
        await seleniumInfra.write(todoText2, "id", "todo-input");  // first step again insert an input and click the add button..
        await seleniumInfra.clickElement("id", "addToDo");

        if (await seleniumInfra.isElementExists("xpath", "//div[@id = 'todos']/child::div[1]")) {  // now after the new input we need to find if a new div was found!
            console.log("found a new div")
        }
        else {
            console.log("Error: Can’t find a new div")
        }

        await seleniumInfra.clickElement("xpath", "//i[@class = 'fas fa-trash']")  // delete the first input       
        if (await seleniumInfra.isElementExists("xpath", "//div[@id = 'todos']/child::div[1]")) {  // is the first input deleted??
            console.log("the first div was deleted")
        } else {
            console.log("Error: the first div was NOT deleted")
        }
        await seleniumInfra.close()
    }
}



module.exports = TodosPage



