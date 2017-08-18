function queryDABInfo() {

  // Opera 8.0+
  var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
  var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]"
  var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
  var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
  var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
  var isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
  var isBlink = (isChrome || isOpera) && !!window.CSS;

  if(!isSafari){

    var web3;
    var network;
    var networkId;
    var tokenABIArray;
    var depositABIArray;
    var creditABIArray;
    var depositTokenAddress;
    var creditTokenAddress;
    var depositContractAddress;
    var creditContractAddress;
    var depositToken;
    var creditToken;
    var depositContract;
    var creditContract;

    var queryInterval;

    let errors = {
      invalidNetwork: new Error('Sorry, DAB is not available on this network at the moment.')
    };

    function initWeb3() {
      return new Promise((resolve, reject) => {
        let Web3 = require('web3');
        // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/NEefAs8cNxYfiJsYCQjc"));
        // web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/NEefAs8cNxYfiJsYCQjc"));
        resolve();
      })
    }


    function checkConnection() {
      let attempts = 4,
          checkInterval;
      return new Promise((resolve, reject) => {
        function check() {
          attempts--;
          if(web3.isConnected()) {
            clearInterval(checkInterval);
            resolve(web3);
          } else if (attempts <= 0) {
            clearInterval(queryInterval);
            console.log('checking..');
          }
        }
        checkInterval = setInterval(check, 800);
        check();
      });
    }


    function watchDisconnect() {
      function check() {
        if(web3.isConnected()) {
          setTimeout(check, 2500);
        } else {
          initEthereum();
        }
      }

      return new Promise((resolve, reject) => {
        check();
        resolve();
      })
    }

    function checkNetwork() {
      return new Promise((resolve, reject) => {
        web3.eth.getBlock(0, function(e, res){
          if (e) {
            return reject(e)
          }
          console.log('checkNetwork', res.hash);
          networkId = res.hash.slice(2,8);
          switch(res.hash) {
            case '0x41941023680923e0fe4d74a34bdac8141f2540e3ae90623718e47d66d1ca4a2d':
              network='ropsten';
              resolve();
              break;
            case '0x0cd786a2425d16f152c658316c423e6ce1181e15c3295826d7c9904cba9ce303':
              network='morden';
              reject(errors.invalidNetwork);
              break;
            case '0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3':
              network='main';
              resolve();
              break;
            default:
              network='private';
              reject(errors.invalidNetwork);
          }
        });
      })
    }


    function initEthereum() {
      return initWeb3()
          .then(checkConnection)
          .then(watchDisconnect)
          .then(checkNetwork)
          .catch(err => {
            if (err !== errors.invalidNetwork) {
              throw err;
            }
          })
          .then(function () {

            if(network === "ropsten"){
              tokenABIArray = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_disable","type":"bool"}],"name":"disableTransfers","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"withdrawTokens","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_amount","type":"uint256"}],"name":"destroy","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"transfersEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint8"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_token","type":"address"}],"name":"NewSmartToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Issuance","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Destruction","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_prevOwner","type":"address"},{"indexed":false,"name":"_newOwner","type":"address"}],"name":"OwnerUpdate","type":"event"}];
              depositABIArray = [{"constant":false,"inputs":[],"name":"activate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"depositPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"isActive","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"beneficiary","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"formula","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"depositInterest","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"depositBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"freeze","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"depositTokenController","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_user","type":"address"},{"name":"_dptActive","type":"bool"}],"name":"deposit","outputs":[{"name":"success","type":"bool"}],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"depositCurrentCRR","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"acceptDepositTokenControllerOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"tokenSet","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"interest","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"creditAgent","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"depositToken","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferDepositTokenControllerOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"tokens","outputs":[{"name":"supply","type":"uint256"},{"name":"isValid","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_user","type":"address"},{"name":"_dptAmount","type":"uint256"}],"name":"withdraw","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_formula","type":"address"}],"name":"setDABFormula","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_creditAgent","type":"address"},{"name":"_formula","type":"address"},{"name":"_depositTokenController","type":"address"},{"name":"_beneficiary","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amountOfETH","type":"uint256"},{"indexed":false,"name":"_amountOfDPT","type":"uint256"}],"name":"LogDPTIssue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amountOfETH","type":"uint256"},{"indexed":false,"name":"_amountOfDPT","type":"uint256"}],"name":"LogDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amountOfDPT","type":"uint256"},{"indexed":false,"name":"_amountOfETH","type":"uint256"}],"name":"LogWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_amountOfETH","type":"uint256"}],"name":"LogDepositInterest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_prevOwner","type":"address"},{"indexed":false,"name":"_newOwner","type":"address"}],"name":"OwnerUpdate","type":"event"}];
              creditABIArray = [{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferCreditTokenControllerOwnership","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"activate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"subCreditToken","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"acceptSubCreditTokenControllerOwnership","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_wallet","type":"address"},{"name":"_cdtAmount","type":"uint256"}],"name":"loan","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"setDepositAgent","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"isActive","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_user","type":"address"}],"name":"toCreditToken","outputs":[{"name":"success","type":"bool"}],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"beneficiary","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"acceptDiscreditTokenControllerOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"formula","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"creditBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"freeze","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"subCreditTokenController","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferDiscreditTokenControllerOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"creditToken","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_user","type":"address"},{"name":"_sctAmount","type":"uint256"}],"name":"toDiscreditToken","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_user","type":"address"}],"name":"repay","outputs":[{"name":"success","type":"bool"}],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"acceptCreditTokenControllerOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"tokenSet","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"creditTokenController","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferSubCreditTokenControllerOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"creditPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"discreditToken","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_user","type":"address"},{"name":"_cdtAmount","type":"uint256"}],"name":"cash","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_user","type":"address"},{"name":"_uCDTAmount","type":"uint256"},{"name":"_fCDTAmount","type":"uint256"}],"name":"issue","outputs":[{"name":"success","type":"bool"}],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"depositAgent","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"tokens","outputs":[{"name":"supply","type":"uint256"},{"name":"isValid","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"discreditTokenController","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_formula","type":"address"}],"name":"setDABFormula","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_formula","type":"address"},{"name":"_creditTokenController","type":"address"},{"name":"_subCreditTokenController","type":"address"},{"name":"_discreditTokenController","type":"address"},{"name":"_beneficiary","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amountOfETH","type":"uint256"},{"indexed":false,"name":"_amountOfCDT","type":"uint256"}],"name":"LogCDTIssue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amountOfCDT","type":"uint256"},{"indexed":false,"name":"_amountOfETH","type":"uint256"}],"name":"LogCash","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_loanAgent","type":"address"},{"indexed":false,"name":"_amountOfCDT","type":"uint256"},{"indexed":false,"name":"_amountOfETH","type":"uint256"},{"indexed":false,"name":"_amountOfIssueCDT","type":"uint256"},{"indexed":false,"name":"_amountOfSCT","type":"uint256"}],"name":"LogLoan","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amountOfETH","type":"uint256"},{"indexed":false,"name":"_amountOfSCT","type":"uint256"},{"indexed":false,"name":"_amountOfCDT","type":"uint256"}],"name":"LogRepay","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amountOfETH","type":"uint256"},{"indexed":false,"name":"_amountOfDCT","type":"uint256"},{"indexed":false,"name":"_amountOfCDT","type":"uint256"}],"name":"LogToCreditToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amountOfSCT","type":"uint256"},{"indexed":false,"name":"_amountOfDCT","type":"uint256"}],"name":"LogToDiscreditToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_prevOwner","type":"address"},{"indexed":false,"name":"_newOwner","type":"address"}],"name":"OwnerUpdate","type":"event"}];

              depositTokenAddress = "0xff99ba7b71637e5d5873a0b84d28bbb8803190bc";
              creditTokenAddress = "0x1b24128b678137f034f1ec8e323a67d645222686";
              depositContractAddress = "0x8002b9d0a4bd4ff0f74167f2a6602a52c2209f14";
              creditContractAddress = "0x2270bbbcdcd81e58041f407c6d0a40fbe1a905fa";

            }else if(network === "main"){

            }

            depositToken = web3.eth.contract(tokenABIArray).at(depositTokenAddress);
            creditToken = web3.eth.contract(tokenABIArray).at(creditTokenAddress);
            depositContract = web3.eth.contract(depositABIArray).at(depositContractAddress);
            creditContract = web3.eth.contract(creditABIArray).at(creditContractAddress);
            web3.eth.defaultAccount = depositContractAddress;

            queryInterval = setInterval(query, 3000);
          })
          .catch(err => {
            console.error(err);
          })
    }


    function query() {
      if(typeof web3 === 'undefined'){
        console.log('eth undefined');
        return;
      }

      var number = web3.eth.blockNumber;
      $('#blockNumber').text(number);

      web3.eth.getBalance(depositContractAddress, function (e, depositFundWei) {
        if (e) {
          return
        }
        var depositFund = web3.fromWei(depositFundWei, 'ether');
        $('#deposit').text(Number(depositFund).toFixed(8));
      });

      web3.eth.getBalance(creditContractAddress, function (e, creditFundWei) {
        if (e) {
          return
        }
        var creditFund = web3.fromWei(creditFundWei, 'ether');
        $('#credit').text(Number(creditFund).toFixed(8));
      });

      if(typeof depositContract !== "undefined"){
        depositContract.depositPrice.call(function (e, depositPrice) {
          if (e) {
            return
          }
          $('#depositPrice').text(Number(depositPrice/100000000).toFixed(8));
        });

        depositContract.depositBalance.call(function (e, depositBalanceWei) {
          if (e) {
            return
          }
          var depositBalance = web3.fromWei(depositBalanceWei, 'ether');
          $('#depositBalance').text(Number(depositBalance).toFixed(8));
        });
      }
      //
      if(typeof creditContract !== "undefined") {
        creditContract.creditPrice.call(function (e, creditPrice) {
          if (e) {
            return
          }
          $('#creditPrice').text(Number(creditPrice/100000000).toFixed(8));

        });


        creditContract.creditBalance.call(function (e, creditBalanceWei) {
          if (e) {
            return
          }
          var creditBalance = web3.fromWei(creditBalanceWei, 'ether');
          $('#creditBalance').text(Number(creditBalance).toFixed(8));
        });

      }

      if(typeof depositToken !== "undefined") {
        depositToken.totalSupply.call(function (e, depositSupplyWei) {
          if (e) {
            return
          }
          var depositSupply = web3.fromWei(depositSupplyWei, 'ether');
          $('#depositSupply').text(Number(depositSupply).toFixed(8));
        });

      }

      if(typeof creditToken !== "undefined") {
        creditToken.totalSupply.call(function (e, creditSupplyWei) {
          if (e) {
            return
          }
          var creditSupply = web3.fromWei(creditSupplyWei, 'ether');
          $('#creditSupply').text(Number(creditSupply).toFixed(8));
        });

      }
    }

    initEthereum();

  }else{
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
}

var allLoaded = setInterval(function() {
  if (/loaded|complete/.test(document.readyState)) {
    clearInterval(allLoaded);  // stop the interval
    queryDABInfo();
  }
}, 10);



