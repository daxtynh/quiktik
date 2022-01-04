const key = ''
document.addEventListener('DOMContentLoaded', function () {
	
	var table = document.getElementById('price')
    var table2 = document.getElementById('volume')
    var spy = document.getElementById('spy')
    var dow = document.getElementById('dow')
    var nsdq = document.getElementById('nsdq')
    fetch('https://cloud.iexapis.com/stable/stock/spy/quote?token='+atob(key))
    .then(response => response.json())
    .then(data => {
        var price
        var percent

        if (data.isUSMarketOpen == true){
            price = data.latestPrice
            percent = data.changePercent
        } else {
            price = data.extendedPrice
            percent = data.extendedChangePercent
        }
        percent = Number(percent) * 100

        spy.innerHTML = "SPY " + price + " %" + new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(percent)
        if (percent > 0){
            spy.style.color = "green"
        } else {
            spy.style.color = "red"
        }
     });
     fetch('https://cloud.iexapis.com/stable/stock/dia/quote?token='+atob(key))
    .then(response => response.json())
    .then(data => {
        var price
        var percent
        if (data.isUSMarketOpen == true){
            price = data.latestPrice
            percent = data.changePercent
        } else {
            price = data.extendedPrice
            percent = data.extendedChangePercent

        }
        percent = Number(data.changePercent) * 100
        dow.innerHTML = "DOW " + price + " %" + new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(percent)
        if (percent > 0){
            dow.style.color = "green"
        } else {
            dow.style.color = "red"
        }
     });
     fetch('https://cloud.iexapis.com/stable/stock/qqq/quote?token='+atob(key))
    .then(response => response.json())
    .then(data => {
        var price
        var percent
        if (data.isUSMarketOpen == true || data.extendedPrice == null){
            price = data.latestPrice
            percent = data.changePercent
        } else {
            price = data.extendedPrice
            percent = data.extendedChangePercent

        }
        percent = Number(data.changePercent) * 100
        nsdq.innerHTML = "QQQ " + price + " %" + new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(percent)
        if (percent > 0){
            nsdq.style.color = "green"
        } else {
            nsdq.style.color = "red"
        }
     });

     function searchTicker(){
        var ticker = document.getElementById('box').value
        ticker = ticker.replace(/\s+/g, '');
        fetch('https://cloud.iexapis.com/stable/stock/'+ticker+'/quote?token='+atob(key))
        .then(response => response.json())
        .then(data => {
            try {
                if(table.innerHTML !== "") {
                    table.innerHTML = ""
                }
                if(table2.innerHTML !== "") {
                    table2.innerHTML = ""
                }
                var price
                var percent
                if (data.isUSMarketOpen == true){
                    price = data.latestPrice
                    percent = data.changePercent
                } else {
                    price = data.extendedPrice
                    percent = data.extendedChangePercent
        
                }
                percent =  Number(percent) * 100
                //var advanced_a = document.createElement('a')
                //advanced_a.setAttribute("href", "advanced.html")
                //advanced_a.innerHTML = " More"
                //document.getElementById("price").innerHTML = "Price: " +data.latestPrice + " Percent Change: " + percent + "%" 
                //document.getElementById("price").appendChild(advanced_a)
                var row = table.insertRow()
                var cell = row.insertCell()
                var row6 = table2.insertRow()
                var cell6 = row6.insertCell()
                var row2 = table2.insertRow()
                var cell2 = row2.insertCell()
                var row3 = table.insertRow()
                var row4 = table2.insertRow()
                var cell3 = row3.insertCell()
                var cell4 = row4.insertCell()
                var row5 = table.insertRow()
                var cell5 = row5.insertCell()
                var volume
                var avgVolume
                if (data.avgTotalVolume.toString().length > 6){
                    avgVolume  = getNumberUnit(data.avgTotalVolume)
                } else {
                    avgVolume = data.avgTotalVolume
                }
                if (data.volume.toString().length > 6){
                    volume = getNumberUnit(data.volume)
                } else {
                    volume = data.volume
                }
                if (data.isUSMarketOpen == true){
                    cell.innerHTML = "Price: " + "<b>" + price + "</b>"
                    cell6.innerHTML = "Percent Change: " + "<b>" + new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(percent) + "%</b>"
                } else {
                    cell.innerHTML = "AH Price: " + "<b>" + price + "</b>"
                    cell6.innerHTML = " AH Percent Change: " + "<b>" + new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(percent) + "%</b>"
                }
                cell2.innerHTML = "Volume: " + "<b>" + volume + "</b>"
                cell3.innerHTML = "52 Week High: " + "<b>" + data.week52High + "</b>"
                cell4.innerHTML = "Average Volume: " + "<b>" + avgVolume + "</b>"
                let ytdPercent = Number(data.ytdChange) * 100
                cell5.innerHTML = "YTD Change: " + "<b>" + new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(ytdPercent) + "%</b>"
                
                addSearchItem(ticker, price, percent)
            } catch (error) {
                alert(error)
            }
            
        });

    }

    function addSearchItem(ticker, price, percent){
        var table = document.getElementById('pastSearchesTable')
        var row = table.insertRow(0)
        var cell = row.insertCell(0)
        cell.innerHTML = "Symbol: " +ticker.toUpperCase() + " Price: " + price + " Percent Change:" +  new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(percent) + "%"
        if (percent > 0){
            cell.style.color = "green"
        } else {
            cell.style.color = "red"
        }
    }

    document.getElementById('searchButton').addEventListener("click",searchTicker)
    //add onsubmit so if you press enter it adds it
    document.getElementById("box")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === "Enter") {
        document.getElementById('searchButton').click()
    }
	});

  }, false);
  
  getNumberUnit = function(num) {
    var units = ["Million","Billion","Trillion","Quadrillion","Quintillion","Sextillion"]
    var unit = Math.floor((num / 1.0e+1).toFixed(0).toString().length)
    var r = unit%3
    var x =  Math.abs(Number(num))/Number('1.0e+'+(unit-r)).toFixed(2)
    return x.toFixed(2)+ ' ' + units[Math.floor(unit / 3) - 2]
}
   

