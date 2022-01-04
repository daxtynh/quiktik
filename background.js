//Lookup the highlighted stock ticker
function lookupOnClick(text){
    var stockTicker = text.selectionText;
    //chrome.tabs.create({url: "http://stocktwits.com/symbol/" + stockTicker});
    fetch('https://cloud.iexapis.com/stable/stock/'+stockTicker+'/quote?token='+atob(key))
    .then(response => response.json())
    .then(data => {
        try {
            let percent =  Number(data.changePercent) * 100
            percent.toFixed(2)
            alert("Stock: " + data.symbol + "\n" + "Latest Price: "+data.latestPrice + "\n" + "Percent G/L today: " +new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(percent) + "%")
        } catch (error) {
            alert("Not a valid ticker symbol!!!")
        }
        
    });
}
// Create context menu
chrome.contextMenus.create({title: "Lookup ticker",
                            contexts:["selection"],          
                            onclick:lookupOnClick
});
