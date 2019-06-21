$(document).ready(function () {
    $("#txtCustomerId").focus();
    loadAllCustomers();
});

function loadAllCustomers() {

    var ajaxConfig = {
        method: "GET",
        url: "http://localhost:8080/api/v1/customers",
        async: true,
        // data: JSON.stringify(customer),
        // contentType: "application/json"
    };

    $.ajax(ajaxConfig).done(function (customers) {
        $("#tblCustomers tbody tr").remove();

        customers.forEach(function(customer){
            var html = `<tr>
                                <td>${customer.id}</td>
                                <td>${customer.name}</td>
                                <td>${customer.address}</td>
                                <td><i class="fas fa-trash"></i></td>
                            </tr>`;

            $("#tblCustomers tbody").append(html);
            attachDeleteCustomerEventListener();



            $("#tblCustomers tbody tr").click(function () {
                var id = $(this).find("td:first-child").text();
                var name = $(this).find("td:nth-child(2)").text();
                var address = $(this).find("td:nth-child(3)").text();

                $("#txtCustomerId").val(id);
                $("#txtCustomerName").val(name);
                $("#txtCustomerAddress").val(address);

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
    $("#tblCustomers tbody i").off('click');
    $("#tblCustomers tbody i").click(function () {
        if (confirm("Are you sure to delete this customer?")) {
            var row = $(this).parents("tr");
            var Cid=$(this).parents("tr").find("td:first-child").text();
            console.log(Cid);
            row.fadeOut(500, function () {

                var customer = {
                    id:  Cid

                };
                var ajaxConfig = {
                    method: "DELETE",
                    url: "http://localhost:8080/api/v1/customers/"+Cid.trim(),
                    async: true,
                    // data: JSON.stringify(customer),
                    contentType: "application/json"
                };

                $.ajax(ajaxConfig).done(function (resp) {
                        if (!resp.status==404)
                        {
                            alert("costomer delete");
                            row.remove();
                            $("#txtCustomerId, #txtCustomerName, #txtCustomerAddress").val("");
                            $("#txtCustomerId").focus();
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
    $("#txtCustomerId, #txtCustomerName, #txtCustomerAddress").val("");
    $("#txtCustomerId").focus();
    $("#btnSave").text("Save");
});

$("#btnSave").click(function () {
    console.log("lol");
    var customerId = $("#txtCustomerId").val();
    var customerName = $("#txtCustomerName").val();
    var customerAddress = $("#txtCustomerAddress").val();

    var flag = true;

    if (customerAddress.trim().length == 0) {
        $("#txtCustomerAddress").select();
        flag = false;
    }

    if (customerName.trim().length == 0) {
        $("#txtCustomerName").select();
        flag = false;
    }

    if (customerId.trim().length == 0) {
        $("#txtCustomerId").select();
        flag = false;
    }

    if ($("#btnSave").text() !== "Update") {
        $("#tblCustomers tbody tr td:first-child").each(function () {
            var id = $(this).text();
            if (id === customerId) {
                alert("Customer Id is already exists in the table");
                $("#txtCustomerId").select();
                flag = false;

            }
        });
    }

    if (!flag) return;

    if ($("#btnSave").text() === "Update") {


        var customer ={
            // id:customerId.trim(),
            name:$("#txtCustomerName").val().trim(),
            address: $("#txtCustomerAddress").val().trim()
        }

        console.log("hiiiii");

        var ajaxconfig = {
            method: "PUT",
            url: "http://localhost:8080/api/v1/customers/"+encodeURIComponent(customerId.trim()),
            async: true,
            data: JSON.stringify(customer),
            contentType: "application/json"
        }
        $.ajax(ajaxconfig).done(function (getdata, textstatus, jxhr) {

            if (getdata.status==400)
            {
                alert("Customer Not Update");
            }else {
                alert("Customer Update")


                loadAllCustomers();

                $("#txtCustomerId, #txtCustomerName, #txtCustomerAddress").val("");
                $("#txtCustomerId").focus();
                $("#txtCustomerId").attr("disabled", false);
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
        var customer = {
            id: customerId,
            name: customerName,
            address: customerAddress
        }

        var ajaxconfig = {
            method: "POST",
            url: "http://localhost:8080/api/v1/customers",
            async: true,
            data: JSON.stringify(customer),
            contentType: "application/json"
        }

        $.ajax(ajaxconfig).done(function (getdata, textstatus, jxhr) {
            loadAllCustomers();
            if (getdata.status(200))
            {
                alert("Customer Not Save");
            }else alert("Customer Save")

            loadAllCustomers();

            $("#txtCustomerId, #txtCustomerName, #txtCustomerAddress").val("");
            $("#txtCustomerId").focus();
            loadAllCustomers();
        })
        .fail(function (jxhr, textstatus, errorMsg) {
            console.log(errorMsg);
        });
    }
    loadAllCustomers();

    $("#txtCustomerId, #txtCustomerName, #txtCustomerAddress").val("");
    $("#txtCustomerId").focus();
    $("#txtCustomerId").attr("disabled", false);
    $("#btnSave").text("Save");

});
