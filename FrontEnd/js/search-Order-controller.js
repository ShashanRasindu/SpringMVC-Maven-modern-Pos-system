// $(window).on('load',function () {
//     loadTable();
// });
//
//
// function loadTable() {
//
//     $('#tblSearch').DataTable().destroy();
//     $('#tblSearch tbody tr').remove();
//
//     var ajaxConfig = {
//         method : 'GET',
//         url : 'http://localhost:8080/api/v1/oders',
//         async : true,
//         contentType : 'application/json'
//     };
//
//     $.ajax(ajaxConfig).done(function (response) {
//
//         var orders = response;
//
//         for (var i = 0; i < orders.length; i++) {
//
//             var totPrice = 0;
//             var orderDetails = orders[i].detailDTOList;
//
//             for (var j = 0; j < orderDetails.length; j++) {
//                 if (orderDetails[j].orderId == orders[i].orderId) {
//                     totPrice += parseFloat(orderDetails[j].unitPrice) * parseInt(orderDetails[j].qty);
//                 }
//             }
//
//             $('#tblSearch tbody').append(
//                 '<tr>' +
//                 '<td>' + orders[i].orderId + '</td>' +
//                 '<td>' + orders[i].orderDate + '</td>' +
//                 '<td>' + orders[i].customerName + '</td>' +
//                 '<td>' + totPrice + '</td>' +
//                 '</tr>'
//             );
//             $('#tblSearch tbody tr').last('tr').click(function () {
//                 showDetails($(this));
//             });
//         }
//         $('#tblSearch').DataTable().destroy();
//         $('#tblSearch').DataTable({
//             "paging":true,
//             "pageLength":5
//         });
//     }).fail(function(jqxhr,textStatus,errorMsg) {
//         console.log(errorMsg);
//     });
// }
//
// function showDetails(id){
//
//     $('#tblOrderedItems').DataTable().destroy();
//     $('#tblOrderedItems tbody tr').remove();
//     var code = $(id.children('td')[0]).text();
//
//     var ajaxConfig = {
//         method : 'GET',
//         url : 'http://localhost:8080/api/v1/oders/'+code,
//         async : true,
//         contentType : 'application/json'
//     };
//
//     $.ajax(ajaxConfig).done(function (response) {
//         var orderDetails = response;
//
//         for(var i=0; i<orderDetails.length; i++){
//             console.log(orderDetails[i]);
//             $('#tblOrderedItems tbody').append(
//                 '<tr>' +
//                 '<td>'+orderDetails[i].code+'</td>' +
//                 '<td>'+orderDetails[i].description+'</td>' +
//                 '<td>'+orderDetails[i].unitPrice+'</td>' +
//                 '<td>'+orderDetails[i].qtyOnHand+'</td>' +
//                 '<td>'+parseInt(orderDetails[i].qtyOnHand) * parseFloat(orderDetails[i].unitPrice)+'</td>' +
//                 '</tr>'
//             );
//         }
//         $('#tblOrderedItems').DataTable().destroy();
//         $('#tblOrderedItems').DataTable({
//             "paging":true,
//             "pageLength":5
//         });
//     }).fail(function(jqxhr,textStatus,errorMsg) {
//         console.log(errorMsg);
//     });
//
// }
//
// $('#txtSearchText').keyup(function () {
//     var searchVal = $('#txtSearchText').val();
//     if(searchVal.length == 0){
//         loadTable();
//     }else{
//         $('#tblSearch tbody tr').hide();
//         // $( 'td:contains('+searchVal+')' ).parent('tr').css('background-color','blue');
//         $( 'td:contains('+searchVal+')' ).parent('tr').show();
//
//     }
// });