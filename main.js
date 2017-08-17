(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var allLoaded = setInterval(function() {
  if (/loaded|complete/.test(document.readyState)) {
    clearInterval(allLoaded);  // stop the interval
    queryWeb3();
  }
}, 10);

function queryWeb3() {
  var tokenABIArray = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_disable","type":"bool"}],"name":"disableTransfers","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_token","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"withdrawTokens","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_amount","type":"uint256"}],"name":"destroy","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"transfersEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint8"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_token","type":"address"}],"name":"NewSmartToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Issuance","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_amount","type":"uint256"}],"name":"Destruction","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_prevOwner","type":"address"},{"indexed":false,"name":"_newOwner","type":"address"}],"name":"OwnerUpdate","type":"event"}];
  var depositABIArray = [{"constant":false,"inputs":[],"name":"activate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"depositPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"isActive","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"beneficiary","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"formula","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"depositInterest","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"depositBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"freeze","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"depositTokenController","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_user","type":"address"},{"name":"_dptActive","type":"bool"}],"name":"deposit","outputs":[{"name":"success","type":"bool"}],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"depositCurrentCRR","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"acceptDepositTokenControllerOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"tokenSet","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"interest","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"creditAgent","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"depositToken","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferDepositTokenControllerOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"tokens","outputs":[{"name":"supply","type":"uint256"},{"name":"isValid","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_user","type":"address"},{"name":"_dptAmount","type":"uint256"}],"name":"withdraw","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_formula","type":"address"}],"name":"setDABFormula","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_creditAgent","type":"address"},{"name":"_formula","type":"address"},{"name":"_depositTokenController","type":"address"},{"name":"_beneficiary","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amountOfETH","type":"uint256"},{"indexed":false,"name":"_amountOfDPT","type":"uint256"}],"name":"LogDPTIssue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amountOfETH","type":"uint256"},{"indexed":false,"name":"_amountOfDPT","type":"uint256"}],"name":"LogDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amountOfDPT","type":"uint256"},{"indexed":false,"name":"_amountOfETH","type":"uint256"}],"name":"LogWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_amountOfETH","type":"uint256"}],"name":"LogDepositInterest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_prevOwner","type":"address"},{"indexed":false,"name":"_newOwner","type":"address"}],"name":"OwnerUpdate","type":"event"}];
  var creditABIArray = [{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferCreditTokenControllerOwnership","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"activate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"subCreditToken","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"acceptSubCreditTokenControllerOwnership","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_wallet","type":"address"},{"name":"_cdtAmount","type":"uint256"}],"name":"loan","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name":"setDepositAgent","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"isActive","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_user","type":"address"}],"name":"toCreditToken","outputs":[{"name":"success","type":"bool"}],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"beneficiary","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"acceptDiscreditTokenControllerOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"formula","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"creditBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"freeze","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"subCreditTokenController","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferDiscreditTokenControllerOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"creditToken","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_user","type":"address"},{"name":"_sctAmount","type":"uint256"}],"name":"toDiscreditToken","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_user","type":"address"}],"name":"repay","outputs":[{"name":"success","type":"bool"}],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"acceptCreditTokenControllerOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"tokenSet","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"creditTokenController","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferSubCreditTokenControllerOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"creditPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"discreditToken","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_user","type":"address"},{"name":"_cdtAmount","type":"uint256"}],"name":"cash","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_user","type":"address"},{"name":"_uCDTAmount","type":"uint256"},{"name":"_fCDTAmount","type":"uint256"}],"name":"issue","outputs":[{"name":"success","type":"bool"}],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"depositAgent","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"tokens","outputs":[{"name":"supply","type":"uint256"},{"name":"isValid","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"discreditTokenController","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_formula","type":"address"}],"name":"setDABFormula","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_formula","type":"address"},{"name":"_creditTokenController","type":"address"},{"name":"_subCreditTokenController","type":"address"},{"name":"_discreditTokenController","type":"address"},{"name":"_beneficiary","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amountOfETH","type":"uint256"},{"indexed":false,"name":"_amountOfCDT","type":"uint256"}],"name":"LogCDTIssue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amountOfCDT","type":"uint256"},{"indexed":false,"name":"_amountOfETH","type":"uint256"}],"name":"LogCash","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_loanAgent","type":"address"},{"indexed":false,"name":"_amountOfCDT","type":"uint256"},{"indexed":false,"name":"_amountOfETH","type":"uint256"},{"indexed":false,"name":"_amountOfIssueCDT","type":"uint256"},{"indexed":false,"name":"_amountOfSCT","type":"uint256"}],"name":"LogLoan","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amountOfETH","type":"uint256"},{"indexed":false,"name":"_amountOfSCT","type":"uint256"},{"indexed":false,"name":"_amountOfCDT","type":"uint256"}],"name":"LogRepay","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amountOfETH","type":"uint256"},{"indexed":false,"name":"_amountOfDCT","type":"uint256"},{"indexed":false,"name":"_amountOfCDT","type":"uint256"}],"name":"LogToCreditToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_amountOfSCT","type":"uint256"},{"indexed":false,"name":"_amountOfDCT","type":"uint256"}],"name":"LogToDiscreditToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_prevOwner","type":"address"},{"indexed":false,"name":"_newOwner","type":"address"}],"name":"OwnerUpdate","type":"event"}];

  var depositTokenAddress = '0xff99ba7b71637e5d5873a0b84d28bbb8803190bc';
  var creditTokenAddress = '0x1b24128b678137f034f1ec8e323a67d645222686';
  var depositContractAddress = '0x8002b9d0a4bd4ff0f74167f2a6602a52c2209f14';
  var creditContractAddress = '0x2270bbbcdcd81e58041f407c6d0a40fbe1a905fa';

  var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/KcjYFpOOgRnAkO5PMfzm"));

  var depositToken = web3.eth.contract(tokenABIArray).at(depositTokenAddress);
  var creditToken = web3.eth.contract(tokenABIArray).at(creditTokenAddress);
  var depositContract = web3.eth.contract(depositABIArray).at(depositContractAddress);
  var creditContract = web3.eth.contract(creditABIArray).at(creditContractAddress);

  web3.eth.defaultAccount = depositContract;

  setInterval(function() {

    var number = web3.eth.blockNumber;
    $('#blockNumber').text(number);

    var depositFundWei = web3.eth.getBalance(depositContractAddress).toNumber();
    var depositFund = web3.fromWei(depositFundWei, 'ether');
    $('#deposit').text(depositFund);

    var depositPrice = depositContract.depositPrice.call()/100000000;
    $('#depositPrice').text(depositPrice);

    var depositSupplyWei = depositToken.totalSupply.call();
    var depositSupply = web3.fromWei(depositSupplyWei, 'ether');
    $('#depositSupply').text(depositSupply);

    var depositBalanceWei = depositContract.depositBalance.call();
    var depositBalance = web3.fromWei(depositBalanceWei, 'ether');
    $('#depositBalance').text(depositBalance);

    var creditFundWei = web3.eth.getBalance(creditContractAddress).toNumber();
    var creditFund = web3.fromWei(creditFundWei, 'ether');
    $('#credit').text(creditFund);

    var creditPrice = creditContract.creditPrice.call()/100000000;
    $('#creditPrice').text(creditPrice);

    var creditSupplyWei = creditToken.totalSupply.call();
    var creditSupply = web3.fromWei(creditSupplyWei, 'ether');
    $('#creditSupply').text(creditSupply);

    var creditBalanceWei = creditContract.creditBalance.call();
    var creditBalance = web3.fromWei(creditBalanceWei, 'ether');
    $('#creditBalance').text(creditBalance);

  }, 3000);
}



},{}]},{},[1]);
