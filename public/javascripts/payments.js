function myOrderConfirm(refid, txid) {
    if (PayWithStellar.lastOrder() == refid) {
        alert('Thank you for your purchase!\nOrder ID: ' + refid);
        // Confirmed order id {refid}
        // Validate Stellar txid on server for better security
        // redirect to download link
        // window.location.href = 'http://example.com/download/'+refid
        window.location.href = '/images/' + refid + '.jpg';
    }
}

function myOrderCancel(refid) {

    console.log("order canceled");
    // alert('Continue shopping!');
    // Cancel order id {refid}
}

function check(event) {
    var orderId = "";
    var price = 0.01;

    if ($('input[name=optradio]:checked').length > 0) {
        orderId = $('input[name=optradio]:checked').attr('id');
        price = parseFloat($('input[name=optradio]:checked').attr('value'));
        PayWithStellar.payment(event, price, orderId);
    } else {
        alert('You did not select anything to buy.');
    }

    /*else {
        if ($('input[name=optradio]:checked').length > 0) {
            orderId = $('input[name=optradio]:checked').attr('id');
            PayWithStellar.payment(event, 0.044, orderId);
        } else {
            alert('You did not select anything to buy.');
        }}*/


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
        if(this.value == "blue_large" || this.value == "blue_medium" || this.value == "blue_small"){
            $('#price2').text(this.value);
        } else if(this.value == "meadow_large" || this.value == "meadow_medium" || this.value == "meadow_small"){
            $('#price1').text(this.value);
        } else {
            $('#price3').text(this.value);
        }

    });
    PayWithStellar.main(options);
};