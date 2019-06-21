$(document).ready(function () {
    $("#txtItemId").focus();
    loadAllCustomers();
});

function loadAllCustomers() {

    var ajaxConfig = {
        method: "GET",
        url: "http://localhost:8080/api/v1/items",
        async: true,
        // data: JSON.stringify(customer),
        // contentType: "application/json"
    };

    $.ajax(ajaxConfig).done(function (items) {
        $("#tblItems tbody tr").remove();
    console.log(items);


        items.forEach(function(item){
            var html = `<tr>
                                <td>${item.code}</td>
                                <td>${item.description}</td>
                                <td>${item.qtyOnHand}</td>
                                <td>${item.unitPrice}</td>
                                <td><i class="fas fa-trash"></i></td>
                            </tr>`;

            $("#tblItems tbody").append(html);
            attachDeleteCustomerEventListener();



            $("#tblItems tbody tr").click(function () {
                var code = $(this).find("td:first-child").text();
                var des = $(this).find("td:nth-child(2)").text();
                var qut = $(this).find("td:nth-child(3)").text();
                var uprice = $(this).find("td:nth-child(4)").text();

                $("#txtItemId").val(code);
                $("#txtItemsDes").val(des);
                $("#txtItemsQut").val(qut);
                $("#txtItemsUprice").val(uprice);

                $("#txtCustomerId").attr("disabled", true);
                $("#btnSave").text("Update");
            });
        });


    }).fail(function (jxhr, textStatus, errorMsg) {
        console.log(errorMsg);
        alert("Failed to loard the customer");
    });






}

function attachDeleteCustomerEventListener() {
    $("#tblItems tbody i").off('click');
    $("#tblItems tbody i").click(function () {
        if (confirm("Are you sure to delete this customer?")) {
            var row = $(this).parents("tr");
            var Icode=$(this).parents("tr").find("td:first-child").text();
            console.log(Icode);
            row.fadeOut(500, function () {

                var Item = {
                    code:  Icode

                };
                var ajaxConfig = {
                    method: "DELETE",
                    url: "http://localhost:8080/api/v1/items/"+Icode,
                    async: true,
                    data: JSON.stringify(Item),
                    contentType: "application/json"
                };

                $.ajax(ajaxConfig).done(function (resp) {
                        if (!resp.status==400)
                        {
                            alert("costomer delete");
                            row.remove();
                            $("#txtItemId, #txtItemsDes, #txtItemsQut ,#txtItemsUprice").val("");
                            $("#txtItemId").focus();
                            $("#btnSave").text("Save");
                        }else {
                            alert("customer not delete");
                        }
                    loadAllCustomers();

                });

            });
        }
    });
}

$("#btnClear").click(function () {
    console.log("weda bn");
    $("#txtItemId, #txtItemsDes, #txtItemsQut ,#txtItemsUprice").val("");
    $("#txtItemId").focus();
    $("#btnSave").text("Save");
});

$("#btnSave").click(function () {
    console.log("lol");
    var ItemCode = $("#txtItemId").val();
    var ItenDes = $("#txtItemsDes").val();
    var ItemQut = $("#txtItemsQut").val();
    var ItemUprice = $("#txtItemsUprice").val();

    var flag = true;

    if (ItenDes.trim().length == 0) {
        $("#txtItemsDes").select();
        flag = false;
    }

    if (ItemQut.trim().length == 0) {
        $("#txtItemsQut").select();
        flag = false;
    }
    if (ItemUprice.trim().length == 0) {
        $("#txtItemsUprice").select();
        flag = false;
    }

    if (ItemCode.trim().length == 0) {
        $("#txtCustomerId").select();
        flag = false;
    }

    if ($("#btnSave").text() !== "Update") {
        $("#tblItems tbody tr td:first-child").each(function () {
            var id = $(this).text();
            if (id === ItemCode) {
                alert("Customer Id is already exists in the table");
                $("#txtItemId").select();
                flag = false;

            }
        });
    }

    if (!flag) return;

    if ($("#btnSave").text() === "Update") {


        var item ={

            description: ItenDes,
            unitPrice: ItemQut,
            qtyOnHand : ItemUprice
        }
        console.log(item);
        var ajaxconfig = {
            method: "PUT",
            url: "http://localhost:8080/api/v1/items/"+ItemCode.trim(),
            async: true,
            data: JSON.stringify(item),
            contentType: "application/json"
        }
        $.ajax(ajaxconfig).done(function (getdata, textstatus, jxhr) {

            if (getdata.status==400)
            {
                alert("Customer Not Update");
            }else {
                alert("Customer Update")

                loadAllCustomers();

                $("#txtItemId, #txtItemsDes, #txtItemsQut ,#txtItemsUprice").val("");
                $("#txtItemId").focus();
                $("#txtItemId").attr("disabled", false);
                $("#btnSave").text("Save");
            }

        })
            .fail(function (jxhr, textstatus, errorMsg) {
            console.log(errorMsg);
        });
        // var customer = customers.find(function (customer) {
        //     return customer.id == customerId;
        // });
        //
        // customer.name = customerName;
        // customer.address = customerAddress;
        // $("#btnSave").text("Save");
        // $("#txtCustomerId").attr("disabled",false);

        // for (var i = 0; i < customers.length ; i++) {
        //     if (customers[i].id == customerId){
        //
        //     }
        // }


    } else {
        var item ={
            code: ItemCode,
            description: ItenDes,
            unitPrice: ItemUprice,
            qtyOnHand : ItemQut
        }
        console.log(item);

        var ajaxconfig = {
            method: "POST",
            url: "http://localhost:8080/api/v1/items",
            async: true,
            data: JSON.stringify(item),
            contentType: "application/json"
        }

        $.ajax(ajaxconfig).done(function (getdata, textstatus, jxhr) {
            loadAllCustomers();
            if (!getdata.status==200)
            {
                alert("Customer Not Save");
            }else {
                alert("Customer Save")

                loadAllCustomers();

                $("#txtItemId, #txtItemsDes, #txtItemsQut ,#txtItemsUprice").val("");
                $("#txtItemId").focus();
                loadAllCustomers();
            }
        })
        .fail(function (jxhr, textstatus, errorMsg) {
            console.log(errorMsg);
        });
    }
    loadAllCustomers();


    $("#txtItemId, #txtItemsDes, #txtItemsQut ,#txtItemsUprice").val("");
    $("#txtItemId").focus();
    $("#txtItemId").attr("disabled", false);
    $("#btnSave").text("Save");

});
