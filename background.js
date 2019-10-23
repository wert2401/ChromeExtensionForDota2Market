chrome.runtime.onMessage.addListener(function (message, sender, reply) {
    const time = ((message.id + 2) % 7 == 1) ? 500 : 300;
    if (message.itemName) {
        setTimeout(() => {
            fetch("https://steamcommunity.com/market/search/render/?norender=1&query=" + message.itemName)
            .then(response => response.json())
            .then(json => reply(json))
            .catch(reason => reply(reason))
        }, time * message.id);
    }
    return true;
})