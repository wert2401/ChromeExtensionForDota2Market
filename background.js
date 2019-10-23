chrome.runtime.onMessage.addListener(function (message, sender, reply) {
    if (message.itemName) {
        setTimeout(() => {
            fetch("https://steamcommunity.com/market/search/render/?norender=1&query=" + message.itemName)
            .then(response => response.json())
            .then(json => reply(json))
            .catch(reason => reply(reason))
        }, 1000*message.id);
    }
    return true;
})