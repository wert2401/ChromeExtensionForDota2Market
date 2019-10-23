document.onreadystatechange = function(){
    if (document.readyState === "complete"){
        var items  = document.getElementsByClassName("item");
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            var name = element.getElementsByClassName("name")[0].innerHTML;
            const imageblock = element.getElementsByClassName('imageblock')[0];
            
            chrome.runtime.sendMessage({itemName: name.replace(' ', '%20'), id: i}, price => {
                var priceElement = imageblock.getElementsByClassName("price")[0];
                const steamPriceNum = JSON.stringify(price.results[0].sale_price_text).replace('"', '').replace('"', '').replace(' pуб.', '').replace(',', '.');
                const percent = (((steamPriceNum / parseFloat(priceElement.innerHTML.replace('&nbsp', '').replace(' ', '').replace(';', ''))) - 1)*100);
                priceElement.setAttribute("style",  "margin-bottom: 30px;");

                var steamPrice = document.createElement('div');
                steamPrice.className = "price";
                steamPrice.setAttribute("style", "color: #00dcff; margin-bottom: 15px")
                imageblock.append(steamPrice);
                steamPrice.innerHTML = JSON.stringify(price.results[0].sale_price_text).replace('"', '').replace('"', '');

                steamPrice = document.createElement('div');
                steamPrice.className = "price";
                if (percent > 0) {
                    steamPrice.setAttribute("style", "color: rgb(0, "+((255 * percent/100) + 100) +", 0)");
                } else {
                    steamPrice.setAttribute("style", "color: rgb("+((255 * -percent/100) + 150) +", 0, 0)");                    
                }
                imageblock.append(steamPrice);
                steamPrice.innerHTML = (((steamPriceNum / parseFloat(priceElement.innerHTML.replace('&nbsp', '').replace(' ', '').replace(';', ''))) - 1)*100).toFixed(2) + ' %';
            })
        }
    }
}

