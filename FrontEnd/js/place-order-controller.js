$("#spnOrderDate").text(new Date().getFullYear() + "-" + new Date().getMonth() + 1 +"-"+ new Date().getDate());
$(document).ready(function () {
    loadAllCustomersIds();
    $("#cmbCustomerId").val("");
    loadAllItemCodes();
    $("#cmbItemCode").val("");

    getorderid();

});

function getorderid() {
    var ajaxConfig = {
        method: "GET",
        url: "http://localhost:8080/api/v1/oders",
        async: true,
        // data: JSON.stringify(customer),
        // contentType: "application/json"
    };

    $.ajax(ajaxConfig).done(function (orderid) {
        console.log(orderid);
            $("#orderid").text(orderid);

    }).fail(function (jxhr, textStatus, errorMsg) {
        console.log(errorMsg);
        alert("Failed to loard the order id");
    });
}

var itemArray=[];


function loadAllCustomersIds() {
    var ajaxConfig = {
        method: "GET",
        url: "http://localhost:8080/api/v1/customers",
        async: true,
        // data: JSON.stringify(customer),
        //contentType: "application/json"
    };

    $.ajax(ajaxConfig).done(function (customers) {


        customers.forEach(function(customer){

                var html = `<option value=" ${customer.id} ">${customer.id}</option>`;
                // console.log(html);
            $("#cmbCustomerId").append(html);
            cmdCucstomerChange();


        });

    }).fail(function (jxhr, textStatus, errorMsg) {
        console.log(errorMsg);
        alert("Failed to loard the customer");
    });



}
function cmdCucstomerChange() {
    $("#cmbCustomerId").off('change');
    $("#cmbCustomerId").change(function () {
        var customerId = $(this).val();

        var customer = {
            id:  customerId

        };

        var ajaxConfig = {
            method: "GET",
            url: "http://localhost:8080/api/v1/customers/"+encodeURIComponent(customerId.trim()),
            async: true,
            // data: customer
            // contentType: "application/json"
        };
        $.ajax(ajaxConfig).done(function (customers) {
            var Cname =customers.name;
                console.log(Cname);
                $("#lblCustomerName").text(Cname);
            }).fail(function (jxhr, textStatus, errorMsg) {
            console.log(errorMsg);
            alert("Failed to loard the customer");
        });
    });


}

function loadAllItemCodes() {


    var ajaxConfig = {
        method: "GET",
        url: "http://localhost:8080/api/v1/items",
        async: true,
        // data: JSON.stringify(customer),
        //contentType: "application/json"
    };

    $.ajax(ajaxConfig).done(function (items) {

        itemArray=items;
        console.log(itemArray);
        items.forEach(function(item){

            var html = `<option value=" ${item.code} ">${item.code}</option>`;
            // console.log(html);
            $("#cmbItemCode").append(html);

            cmdItemsChange();

        });


    }).fail(function (jxhr, textStatus, errorMsg) {
        console.log(errorMsg);
        alert("Failed to loard the customer");
    });



}



function cmdItemsChange() {
    $("#cmbItemCode").off('change');
    $("#cmbItemCode").change(function () {
        var itemID = $(this).val();


        var ajaxConfig = {
            method: "GET",
            url: "http://localhost:8080/api/v1/items/"+encodeURIComponent(itemID.trim()),
            async: true
            // data: customer
            // contentType: "application/json"
        };
        $.ajax(ajaxConfig).done(function (itemss) {
                console.log(itemss);
            $("#lblDescription").text(itemss.description);
            $("#lblUnitPrice").text(itemss.unitPrice);
            $("#lblQtyOnHand").text(itemss.qtyOnHand);
            $("#txtQty").select();
        }).fail(function (jxhr, textStatus, errorMsg) {
            console.log(errorMsg);
            alert("Failed to loard the Items");
        });
    });


}







$("#txtQty").keypress(function (eventData) {
    if (eventData.which == 13) {

        var code = $("#cmbItemCode").val();
        var unitPrice = parseFloat($("#lblUnitPrice").text());
        var qty = parseInt($(this).val());
        var description = $("#lblDescription").text();
        var qtyOnHand = parseInt($("#lblQtyOnHand").text());
        console.log(qtyOnHand);
        console.log(qty);

        if (qty<=0 && qty>qtyOnHand) {
            alert("Invalid qty. Please enter valid Qty");
            $(this).select();
            return;
        }

        var disabled = $("#cmbItemCode").attr("disabled");
        if (disabled) {

            $("#tblOrderDetails tbody tr td:first-child").each(function () {
                var itemCode = $(this).text();
                if (itemCode.trim() == code.trim()) {

                    var oldQty = parseInt($(this).parents("tr").find("td:nth-child(3)").text());
                    $(this).parents("tr").find("td:nth-child(3)").text(qty);
                    $(this).parents("tr").find("td:nth-child(5)").text(qty * unitPrice);

                    var item = itemArray.find(function (item) {
                        return item.code == code.trim();
                    });
                    item.qty += oldQty;
                    item.qty = item.qty - qty;
                }
                clearTextFields();
            });

        } else {
            var isExist = false;
            $("#tblOrderDetails tbody tr td:first-child").each(function () {
                var itemCode = $(this).text();
                if (itemCode.trim() == code.trim()) {
                    var oldQty = parseInt($(this).parents("tr").find("td:nth-child(3)").text());
                    $(this).parents("tr").find("td:nth-child(3)").text(oldQty + qty);
                    $(this).parents("tr").find("td:nth-child(5)").text(qty * unitPrice);
                    isExist = true;
                }
            });
            if (!isExist) {
                var html = '<tr>' +
                    '<td>' + code + '</td>' +
                    '<td>' + description + '</td>' +
                    '<td>' + qty + '</td>' +
                    '<td>' + unitPrice + '</td>' +
                    '<td>' + qty * unitPrice + '</td>' +
                    '<td><i class="fas fa-trash"></i></td>' +
                    '</tr>';
                $("#tblOrderDetails tbody").append(html);

                $("#tblOrderDetails tbody tr:last-child").click(function () {
                    var code = $(this).find("td:first-child").text();
                    var qty = $(this).find("td:nth-child(3)").text();
                    $("#txtQty").val(qty);
                    $("#cmbItemCode").val(code);
                    $("#cmbItemCode").trigger('change');
                    $("#cmbItemCode").attr('disabled', true);
                });

                $("#tblOrderDetails tbody tr:last-child td:last-child i").click(function () {




                    var item = itemArray.find(function (item) {
                        console.log("Working");
                        // console.log(itemArray);
                        return item.code == code.trim();
                    });
                    console.log(item);

                    var qty = parseInt($(this).parents("tr").find("td:nth-child(3)").text());
                    item.qty += qty;

                    var row = $(this).parents("tr");
                    row.fadeOut(500, function () {
                        row.remove();
                        clearTextFields();
                        calculateTotal();
                    });

                });
            }
            var item = itemArray.find(function (item) {
                return item.code == code.trim();
            });
            item.qty = item.qty - qty;
        }

        clearTextFields();
        calculateTotal();

    }
});

function clearTextFields() {
    $("#cmbItemCode").val("");
    $("#lblDescription").text("");
    $("#lblUnitPrice").text("");
    $("#lblQtyOnHand").text("");
    $("#txtQty").val("");
    $("#cmbItemCode").focus();
    $("#cmbItemCode").attr('disabled', false);
}

function calculateTotal() {
    var total = 0;
    $("#tblOrderDetails tbody tr td:nth-child(5)").each(function () {
        total += parseFloat($(this).text());
    });
    $("#spnTotal").text(total);
}

var odersDetail =[];


$("#placeOR").click(function () {


      var cusid= $("#cmbCustomerId").val().trim();
      var date = $("#spnOrderDate").text().trim();
      var orid = $("#orderid").text().trim();


    $("#tblOrderDetails tbody tr").each(function (index , obj) {

        odersDetail.push({orderId:orid,itemCode:obj.children[0].textContent.trim(),qty:obj.children[2].textContent.trim(),itemTotalPrice:obj.children[4].textContent.trim()});
    });
    if (cusid.trim().length==0 && odersDetail.length==0)
    {
        return;
    }

    console.log(odersDetail);

    var ordervalue ={

        orderId :orid,
        orderDate : date,
        customerId: cusid,
        orderDetails:odersDetail

    }
    var ajaxconfig = {
        method: "POST",
        url: "http://localhost:8080/api/v1/oders",
        async: true,
        data: JSON.stringify(ordervalue),
        contentType: "application/json"
    }

    $.ajax(ajaxconfig).done(function (getdata, textstatus, jxhr) {

        if (getdata.status=200)
        {
            alert("Order Save");
            $("#tblOrderDetails tbody tr").remove();
            $("#cmbCustomerId,#txtCustomerName").clear();
            getorderid();
            $("#spnTotal").text("");
            $("#spnOrderDate").text(new Date().getFullYear() + "-" + new Date().getMonth() + 1 +"-"+ new Date().getDate());

        }else alert("Order not Save")

    })
        .fail(function (jxhr, textstatus, errorMsg) {
            console.log(errorMsg);
        });

});


