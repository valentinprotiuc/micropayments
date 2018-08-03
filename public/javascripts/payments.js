function requestPicture(refid) {
    alert('Thank you for your purchase!\nOrder ID: ' + refid);
    var reqUrl = '/pictures/' + refid;
    window.open(reqUrl);
}


function myOrderConfirm(refid, txid) {
    if (PayWithStellar.lastOrder() == refid) {

       requestPicture(refid);
    }
}

function myOrderCancel(refid) {

    console.log("order canceled");
    alert('Unfortunately your order has been canceled.');
}

function check(event) {
    var orderId = "";
    var price = 0.01;
    var paySys = event.target.className;
    if(paySys === 'stellar') {
        if ($('input[name=optradio]:checked').length > 0) {
            orderId = $('input[name=optradio]:checked').attr('id');
            price = parseFloat($('input[name=optradio]:checked').attr('value'));
            PayWithStellar.payment(event, price, orderId);
        } else {
            alert('You did not select anything to buy.');
        }
    }else {
        if ($('input[name=optradio]:checked').length > 0) {
            orderId = $('input[name=optradio]:checked').attr('id');
            requestPicture(orderId);
        } else {
            alert('You did not select anything to buy.');
        }
    }



}

window.onload = function () {
    var options = {
        horizon: 'live',
        address: 'GAFA6RZDVDNTO77W3DQGXTFQCJ4FRDXO5QX23ADT4JONXE2IYA5V5EID',
        currency: 'USD',
        onConfirm: myOrderConfirm,
        onCancel: myOrderCancel,
    };
    $('input[type=radio]').click(function(){

        console.log(this.value);

        if(this.id === "blue_large" || this.id === "blue_medium" || this.id === "blue_small"){
            $('#price2').text(this.value);
            $('#price1').text("0.0");
            $('#price3').text("0.0");
        } else if(this.id === "meadow_large" || this.id === "meadow_medium" || this.id === "meadow_small"){
            $('#price1').text(this.value);
            $('#price2').text("0.0");
            $('#price3').text("0.0");
        } else {
            $('#price3').text(this.value);
            $('#price1').text("0.0");
            $('#price2').text("0.0");
        }

    });
    PayWithStellar.main(options);
};