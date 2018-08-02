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

function check2() {
    console.log("stage1");
    $.get("/pictures/", function () {
        console.log("stage2");
    });

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