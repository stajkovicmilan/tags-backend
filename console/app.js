// libs
const fs = require("fs");
const readline = require("readline");
const readlineSync = require("readline-sync");
const path = require("path");
const figlet = require("figlet");

// globals
const genericControllerTemplate = path.join(__dirname, "./templates/generic_controller");
const emptyActionTemplateLocation = path.join(__dirname, "./templates/empty_action");
const createEntityTemplate = path.join(__dirname, "./templates/createEntityTemplate");
const readEntityTemplate = path.join(__dirname, "./templates/readEntityTemplate");
const readAllEntityTemplate = path.join(__dirname, "./templates/readAllEntityTemplate");
const updateEntityTemplate = path.join(__dirname, "./templates/updateEntityTemplate");
const deleteEntityTemplate = path.join(__dirname, "./templates/deleteEntityTemplate");
const entityTemplateLocation = path.join(__dirname, "./templates/generic_entity");
const repositoryTemplateLocation = path.join(__dirname, "./templates/generic_repository");
const dbImplementationTemplateLocation = path.join(__dirname, "./templates/generic_db_implementation");
const inversifyConfigFile = "./src/dependency-injection/inversify.config.ts";
const inversifyTypes = "./src/dependency-injection/Types.ts";
const entitiesFolderLocation = "./src/entities/";
const controllersFolderLocation = "./src/web/controllers/";
const actionsFolderLocation = "./src/actions/";
const repositoryFolderLocation = "./src/repositories/";
const databaseFolderLocation = "./src/database/";

// scritp start

printUserInterface();

var loop = true

while (loop) {
    var answer = readlineSync.question("Please state your intentions :)  ");

    if (answer == 1) {
        var actionName = readlineSync.question("Give me the name for action you want to create ? ");
        creatAction(actionName);
        loop = false;
    };

    if (answer == 2) {
        var actionName = readlineSync.question("Give me the name for action you want to remove ? ");
        removeAction(actionName);
        loop = false;
    }

    if (answer == 3) {
        var entityName = readlineSync.question("Set entity name : ");
        createEntity(entityName);
        loop = false;
    }

    if (answer == 4) {
        var entityName = readlineSync.question("What is the entity name ? : ");
        removeEntity(entityName);
        loop = false;
    }

    if (answer == 5) {
        var entityName = readlineSync.question("Ok i will make repository and db implementation file for you, just give me entity name without I prefix and first letter capital ? : ");
        createRepositoryAndDbImplementationFile(entityName);
        loop = false;
    }

    if (answer == 6) {
        var entityName = readlineSync.question("Ok i will remove repository and its db implementation file for you, just give me entity name without I prefix ? : ");
        removeRepositoryFileAndItsImplementationFile(entityName);
        loop = false;
    }

    if (answer == 0) {
        loop = false;
        console.log("Bye bye");
    }
}
// script end

// function definitions
function printUserInterface() {
    console.log("\n\r");
    console.log(figlet.textSync('Clean', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }));
    console.log("\n\r");
    console.log("   1.Create action.    4.Remove entity.       0.Exit.");
    console.log("   2.Remove action.    5.Create repository.");
    console.log("   3.Create entity.    6.Remove repository.");
    console.log("\n\r");
    console.log("\n\r");
}

function creatAction(actionName) {
    if (checkIfFileExist(actionName + ".ts", actionsFolderLocation)) {
        console.log("Action alredy exist, please delete old one first !");
        return;
    }
    copyFile(emptyActionTemplateLocation, actionsFolderLocation + actionName + ".ts");
    createActionIndexFile();
    console.log("Action created.");
}

function removeAction(actionName) {
    if (!checkIfFileExist(actionName + ".ts", actionsFolderLocation)) {
        console.log("There is no such action :)");
        return;
    }
    fs.unlinkSync(actionsFolderLocation + actionName + ".ts");
    createActionIndexFile();
    console.log("Action removed.");
}

function createEntity(entityName) {
    if (checkIfFileExist("I" + entityName + ".ts", entitiesFolderLocation)) {
        console.log("Entity already exist, please delete old one first.");
        return;
    }
    copyFile(entityTemplateLocation, entitiesFolderLocation + "I" + entityName + ".ts");
    setStringToPlaceHolder("I" + entityName, "{{entityName}}", entitiesFolderLocation + "I" + entityName + ".ts");
    createIndexFile(entitiesFolderLocation, "../core/entities");

    var answer = readlineSync.question("Do you want me to generate CRUD components for this entity ? yes/no : ");
    if (answer == "yes") {
        createRepositoryAndDbImplementationFile(entityName);
        createCrudActionsForEntity(entityName, actionsFolderLocation);
        createCrudControllerForEntity(entityName);
    }
    console.log("Operation completed.");
}

function removeEntity(name) {
    if (!checkIfFileExist(name + ".ts", entitiesFolderLocation)) {
        console.log("There is no such entity :)");
        return;
    }
    fs.unlinkSync(entitiesFolderLocation + name + ".ts");
    createIndexFile(entitiesFolderLocation, "../core/entities");
    console.log("Entity removed.");
}

function createRepositoryAndDbImplementationFile(entityName) {
    if (!checkIfFileExist("I" + entityName + ".ts", entitiesFolderLocation)) {
        var answer = readlineSync.question("There is no entity with this name, would you like me to make entity file as well  ?  = >  yes/no : ");

        if (answer == "yes") {
            createEntity("I" + entityName);
        } else {
            console.log("Over and out.");
            return;
        }
    }
    var repositoryName = "I" + entityName + "Repository";

    copyFile(repositoryTemplateLocation, repositoryFolderLocation + repositoryName + ".ts");
    setStringToPlaceHolder(repositoryName, "{{RepositoryName}}", repositoryFolderLocation + repositoryName + ".ts");
    setStringToPlaceHolder(entityName, "{{EntityName}}", repositoryFolderLocation + repositoryName + ".ts");
    createIndexFile(repositoryFolderLocation, "../core/repositories");

    // create db implemenation file and its index file
    copyFile(dbImplementationTemplateLocation, databaseFolderLocation + entityName + ".ts");
    setStringToPlaceHolder(entityName, "{{EntityName}}", databaseFolderLocation + entityName + ".ts");
    createIndexFile(databaseFolderLocation, "../core/database");

    registerNewRepoInDependancyInjection(repositoryName, entityName);
}

function removeRepositoryFileAndItsImplementationFile(entityName) {
    var repositoryName = "I" + entityName + "Repository";
    if (!checkIfFileExist(repositoryName + ".ts", repositoryFolderLocation)) {
        console.log("There is no " + "I" + entityName + ".ts" + " file in repositories folder.")
        return;
    }
    fs.unlinkSync(repositoryFolderLocation + repositoryName + ".ts");
    createIndexFile(repositoryFolderLocation, "../core/repositories");

    fs.unlinkSync(databaseFolderLocation + entityName + ".ts");
    createIndexFile(databaseFolderLocation, "../core/database");
    console.log("Please update manually inversify.config and Types file ! ");
}

function createCrudActionsForEntity(entityName, folder) {
    var entityNameUpperCaseFirstLetter = entityName.charAt(0).toUpperCase() + entityName.slice(1);
    var entityNameLowerCaseFirstLetter = entityName.charAt(0).toLowerCase() + entityName.slice(1);

    var newFolder = createFolder(folder + entityNameLowerCaseFirstLetter);

    var importActions = `import * as ${entityNameLowerCaseFirstLetter}Actions from "../.${newFolder}";`;
    appendTextLineAfterKeyword(inversifyConfigFile, importActions, "// import section [console_app_comment]");

    copyFile(createEntityTemplate, newFolder + "Create" + entityNameUpperCaseFirstLetter + ".ts");
    setStringToPlaceHolder(entityNameUpperCaseFirstLetter, "{{EntityName}}", newFolder + "Create" + entityNameUpperCaseFirstLetter + ".ts");
    setStringToPlaceHolder(entityNameLowerCaseFirstLetter, "{{entityName}}", newFolder + "Create" + entityNameUpperCaseFirstLetter + ".ts");
    var configureCreateAction = `container.bind<IAction>(Types.IAction).to(${entityNameLowerCaseFirstLetter}Actions.Create${entityNameUpperCaseFirstLetter}).whenTargetNamed(${entityNameLowerCaseFirstLetter}Actions.Create${entityNameUpperCaseFirstLetter}.alias);`;
    appendTextLineAfterKeyword(inversifyConfigFile, configureCreateAction, "// actions [console_app_comment]");
    
    copyFile(readEntityTemplate, newFolder + "Get" + entityName + ".ts");
    setStringToPlaceHolder(entityNameUpperCaseFirstLetter, "{{EntityName}}", newFolder + "Get" + entityNameUpperCaseFirstLetter + ".ts");
    setStringToPlaceHolder(entityNameLowerCaseFirstLetter, "{{entityName}}", newFolder + "Get" + entityNameUpperCaseFirstLetter + ".ts");
    var configureGetAction = `container.bind<IAction>(Types.IAction).to(${entityNameLowerCaseFirstLetter}Actions.Get${entityNameUpperCaseFirstLetter}).whenTargetNamed(${entityNameLowerCaseFirstLetter}Actions.Get${entityNameUpperCaseFirstLetter}.alias);`;
    appendTextLineAfterKeyword(inversifyConfigFile, configureGetAction, "// actions [console_app_comment]");
    
    copyFile(readAllEntityTemplate, newFolder + "GetAll" + entityName + ".ts");
    setStringToPlaceHolder(entityNameUpperCaseFirstLetter, "{{EntityName}}", newFolder + "GetAll" + entityNameUpperCaseFirstLetter + ".ts");
    setStringToPlaceHolder(entityNameLowerCaseFirstLetter, "{{entityName}}", newFolder + "GetAll" + entityNameUpperCaseFirstLetter + ".ts");
    var configureGetAllAction = `container.bind<IAction>(Types.IAction).to(${entityNameLowerCaseFirstLetter}Actions.GetAll${entityNameUpperCaseFirstLetter}).whenTargetNamed(${entityNameLowerCaseFirstLetter}Actions.GetAll${entityNameUpperCaseFirstLetter}.alias);`;
    appendTextLineAfterKeyword(inversifyConfigFile, configureGetAllAction, "// actions [console_app_comment]");

    copyFile(updateEntityTemplate, newFolder + "Update" + entityName + ".ts");
    setStringToPlaceHolder(entityNameUpperCaseFirstLetter, "{{EntityName}}", newFolder + "Update" + entityNameUpperCaseFirstLetter + ".ts");
    setStringToPlaceHolder(entityNameLowerCaseFirstLetter, "{{entityName}}", newFolder + "Update" + entityNameUpperCaseFirstLetter + ".ts");
    var configureUpdateAction = `container.bind<IAction>(Types.IAction).to(${entityNameLowerCaseFirstLetter}Actions.Update${entityNameUpperCaseFirstLetter}).whenTargetNamed(${entityNameLowerCaseFirstLetter}Actions.Update${entityNameUpperCaseFirstLetter}.alias);`;
    appendTextLineAfterKeyword(inversifyConfigFile, configureUpdateAction, "// actions [console_app_comment]");
    
    copyFile(deleteEntityTemplate, newFolder + "Delete" + entityName + ".ts");
    setStringToPlaceHolder(entityNameUpperCaseFirstLetter, "{{EntityName}}", newFolder + "Delete" + entityNameUpperCaseFirstLetter + ".ts");
    setStringToPlaceHolder(entityNameLowerCaseFirstLetter, "{{entityName}}", newFolder + "Delete" + entityNameUpperCaseFirstLetter + ".ts");
    var configureDeleteAction = `container.bind<IAction>(Types.IAction).to(${entityNameLowerCaseFirstLetter}Actions.Delete${entityNameUpperCaseFirstLetter}).whenTargetNamed(${entityNameLowerCaseFirstLetter}Actions.Delete${entityNameUpperCaseFirstLetter}.alias);`;
    appendTextLineAfterKeyword(inversifyConfigFile, configureDeleteAction, "// actions [console_app_comment]");
    
    createNewActionIndex(newFolder);
}

function createCrudControllerForEntity(entityName) {
    var entityNameUpperCaseFirstLetter = entityName.charAt(0).toUpperCase() + entityName.slice(1);
    var entityNameLowerCaseFirstLetter = entityName.charAt(0).toLowerCase() + entityName.slice(1);
    copyFile(genericControllerTemplate, controllersFolderLocation + entityNameUpperCaseFirstLetter + "Controller.ts");
    setStringToPlaceHolder(entityNameUpperCaseFirstLetter, "{{EntityName}}", controllersFolderLocation + entityNameUpperCaseFirstLetter + "Controller.ts");
    setStringToPlaceHolder(entityNameLowerCaseFirstLetter, "{{entityName}}", controllersFolderLocation + entityNameUpperCaseFirstLetter + "Controller.ts");
    addNewControllerInIndexFile(entityNameUpperCaseFirstLetter + "Controller");
}

function addNewControllerInIndexFile(controllerName) {
    var controllersIndexFile = controllersFolderLocation + "index.ts";
    var importControllerLine = `import { ${controllerName} } from "./${controllerName}";`;
    appendTextLineAfterKeyword(controllersIndexFile, importControllerLine, "// import new controller [console_app_comment]");
    var registerControllerLine = `    registerController(server, ${controllerName}, () => new ${controllerName}());`;
    appendTextLineAfterKeyword(controllersIndexFile, registerControllerLine, "// register new controller [console_app_comment]");
}

function createNewActionIndex(folder) {
    var fileNames = readFilesFromFolder(folder);

    // remove index.ts 
    var indexFile = fileNames.indexOf("index.ts");
    if (indexFile != -1) {
        fileNames.splice(indexFile, 1);
        fs.unlinkSync(folder + "index.ts");
    }

    var newIndexFile = fs.createWriteStream(folder + "index.ts", {
        flags: 'a' // appending to a file
    });

    // generate import statements
    for (var i = 0; i < fileNames.length; i++) {
        newIndexFile.write("export * from " + "\"./" + fileNames[i].replace(/\.[^/.]+$/, "") + "\"" + ";\r\n");
    }
}

function createActionIndexFile() {
    var fileNames = readFilesFromFolder(actionsFolderLocation);

    // remove index.ts 
    var indexFile = fileNames.indexOf("index.ts");
    if (indexFile != -1) {
        fileNames.splice(indexFile, 1);
        fs.unlinkSync(actionsFolderLocation + "index.ts");
    }

    var newIndexFile = fs.createWriteStream(actionsFolderLocation + "index.ts", {
        flags: 'a' // appending to a file
    });


    // generate import statements
    newIndexFile.write("import { ActionContext as ActionContext } from \"./ActionBase\";\r\n");
    for (var i = 0; i < fileNames.length; i++) {
        newIndexFile.write("import * as " + fileNames[i].replace(/\.[^/.]+$/, "") + " from " + "\"./" + fileNames[i].replace(/\.[^/.]+$/, "") + "\"" + ";\r\n");
    }

    // generate export statement
    newIndexFile.write("export { ");

    for (var i = 0; i < fileNames.length; i++) {
        if (i != fileNames.length - 1) {
            newIndexFile.write(fileNames[i].replace(/\.[^/.]+$/, "") + ", ");
        } else {
            newIndexFile.write(fileNames[i].replace(/\.[^/.]+$/, ""));
        }
    }

    newIndexFile.write(", ActionContext};\r\n");
}

function createIndexFile(folderPath, defaultImport) {
    var fileNames = readFilesFromFolder(folderPath);

    // remove index.ts 
    var indexFile = fileNames.indexOf("index.ts");
    if (indexFile != -1) {
        fileNames.splice(indexFile, 1);
        fs.unlinkSync(folderPath + "index.ts");
    }

    var newIndexFile = fs.createWriteStream(folderPath + "index.ts", {
        flags: 'a' // appending to a file
    });
    if (defaultImport) {
        newIndexFile.write(`export * from "${defaultImport}";\r\n`)
    }
    // generate export statements
    for (var i = 0; i < fileNames.length; i++) {
        var bla = fileNames[i].replace(/\.[^/.]+$/, "");
        console.log(bla, 'logging bla')
        if (!bla) {
            continue;
        }
        newIndexFile.write("export * from " + "\"./" + fileNames[i].replace(/\.[^/.]+$/, "") + "\"" + ";\r\n");
    }
}

function registerNewRepoInDependancyInjection(repoName, entityName) {
    // construct new type definition
    var typeDefinition = "    " + repoName + ":" + " Symbol(\"" + repoName + "\"),"
    // append new type to a Types file
    appendTextLineAfterKeyword(inversifyTypes, typeDefinition, "// types definitions [console_app_comment]");

    // construct kernel repo statement
    var kernelRegisterDefinition = "container.bind<Repositories." + repoName + ">(Types." + repoName + ").to(DB." + entityName + ");";
    var kernelVariableBindingDefinition = "container.bind<string>(\"entityName\").toConstantValue(\"" + entityName[0].toLowerCase() + entityName.substring(1) + "\").whenInjectedInto(DB." + entityName + ");";

    // append new statement to a file
    appendTextLineAfterKeyword(inversifyConfigFile, kernelRegisterDefinition, "// repo definitions [console_app_comment]");
    appendTextLineAfterKeyword(inversifyConfigFile, kernelVariableBindingDefinition, "// variable bindings [console_app_comment]");
}

function appendTextLineAfterKeyword(file, entryToAppend, keyword) {
    var newData = "";
    fs.readFileSync(file).toString().split('\n').forEach(function (line) {
        if (line.trim() == keyword) {
            newData = newData + line.toString() + "\n";
            newData = newData + entryToAppend + "\n";

        } else {
            var lastLine = line == "";
            lastLine ? newData = newData + line.toString() : newData = newData + line.toString() + "\n";
        }
    });
    fs.writeFileSync(file, newData, 'utf8');
}

function copyFile(source, destination) {
    var data = fs.readFileSync(source, 'utf8');
    fs.writeFileSync(destination, data, 'utf8');
}

function setStringToPlaceHolder(string, placeholder, fileLocation) {
    var data = fs.readFileSync(fileLocation, 'utf8');
    var result = data.replace(new RegExp(placeholder, 'g'), string);
    fs.writeFileSync(fileLocation, result, 'utf8');
}

function checkIfFileExist(fileName, folderPath) {
    var listOfFiles = readFilesFromFolder(folderPath);
    var fileNameIndex = listOfFiles.indexOf(fileName);
    if (fileNameIndex != -1) {
        return true;
    }
    return false;
}

function readFilesFromFolder(folderPath) {
    return fs.readdirSync(folderPath);
}

function createFolder(folderPath) {
    if (!fs.existsSync(folderPath)){
        fs.mkdirSync(folderPath);
    }
    return (folderPath + "/");
}