function checkForValidUrl(inputText) {
    console.log("::: Running checkForName :::", inputText);


    const validUrlRegEx = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

    return validUrlRegEx.test(inputText) ? true : false;

}

export {
    checkForValidUrl
}