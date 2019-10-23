document.onreadystatechange = function(){
    if (document.readyState === "complete"){
        var items  = document.getElementsByClassName("item");
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            var name = element.getElementsByClassName("name")[0].innerHTML;

            chrome.runtime.sendMessage({itemName: name.replace(' ', '%20'), id: i/2}, price => {
                var priceElement = element.getElementsByClassName("imageblock")[0].getElementsByClassName("price")[0];
                priceElement.setAttribute("style",  "margin-bottom: 30px;");

                var steamPrice = document.createElement('div');
                steamPrice.className = "price";
                steamPrice.setAttribute("style", "color: #00dcff; margin-bottom: 15px")
                element.getElementsByClassName('imageblock')[0].append(steamPrice);
                steamPrice.innerHTML = JSON.stringify(price.results[0].sale_price_text);

                steamPrice = document.createElement('div');
                steamPrice.className = "price";
                element.getElementsByClassName('imageblock')[0].append(steamPrice);
                const steamPriceNum = JSON.stringify(price.results[0].sale_price_text).replace('"', '').replace('"', '').replace(' pуб.', '');
                steamPrice.innerHTML = steamPriceNum / priceElement.innerHTML.replace(' ', '');
                steamPrice.setAttribute("style", "color: rgb(155, "+ 255 * steamPriceNum  +", 102)");
            })
        }
    }
}

