function myOrderConfirm(refid, txid) {
    if (PayWithStellar.lastOrder() == refid) {
        alert('Thank you for your purchase!\nOrder ID: ' + refid);
        // Confirmed order id {refid}
        // Validate Stellar txid on server for better security
        // redirect to download link
        // window.location.href = 'http://example.com/download/'+refid
        window.location.href = 'pictures/'+refid+'.jpg';
    }
}

function myOrderCancel(refid) {

    console.log("order canceled");
    // alert('Continue shopping!');
    // Cancel order id {refid}
}

function check(paySystem) {
    var orderId = "";
    if(paySystem==="stellar"){
        if ($('input[name=optradio]:checked').length > 0) {
            orderId = $('input[name=optradio]:checked').attr('id');
            PayWithStellar.payment(event, 0.01, orderId);
        } else {
            alert('You did not select anything to buy.');
        }
    } else {
        if ($('input[name=optradio]:checked').length > 0) {
            orderId = $('input[name=optradio]:checked').attr('id');
            PayWithStellar.payment(event, 0.044, orderId);
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
    PayWithStellar.main(options);
};