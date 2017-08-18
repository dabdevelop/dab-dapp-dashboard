function queryDABInfo() {

    function getDABInfoAsync(callback){
      $.ajax({
        url: 'https://api.dab-foundation.org/v1/all', // transactions
        type: 'GET',
        dataType: 'json',
        success: callback
      });
    }

    function getDABInfo(){
      getDABInfoAsync(function (result) {
        if(result.status === 1){
          var data = result.data;
          $('#blockNumber').text(data.blockNumber);
          $('#deposit').text(data.depositFund);
          $('#depositPrice').text(data.depositPrice);
          $('#depositBalance').text(data.depositBalance);
          $('#depositSupply').text(data.depositSupply);

          $('#credit').text(data.creditFund);
          $('#creditPrice').text(data.creditPrice);
          $('#creditBalance').text(data.creditBalance);
          $('#creditSupply').text(data.creditSupply);
        }
      })
    }

    setInterval(getDABInfo, 3000);
}

var allLoaded = setInterval(function() {
  if (/loaded|complete/.test(document.readyState)) {
    clearInterval(allLoaded);  // stop the interval
    queryDABInfo();
  }
}, 10);



