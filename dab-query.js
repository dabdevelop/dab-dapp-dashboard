(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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




},{}]},{},[1]);
