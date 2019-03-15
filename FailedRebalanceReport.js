$(document).ready(function () {

    var validationSummary = $('#validationSummary')[0];

    if (validationSummary.innerText === "") {
        $('#divError').hide();
    }
    else {
        $('#divError').show();
    }
}); 

function loadGridByPageID(page) {
    
    var sortingModel = getGridSortingModel();

    if (!isPopupOpen()) {
        $(hidLastSelectedPageID).val(page);

        var dataUrl = $('#hidPagingDataUrlFR').val();

        $("#failedRebalanceList").load(dataUrl, { 'currentPageIndex': page, 'sortingModel': sortingModel },
            function (response, status, xhr) {
                if (status == "error") {
                    alert("An error occurred while loading the results.");
                }
            });
    } else {
    
        $(hidLastSelectedPageID).val(page);

        var dataUrl = $('#hidPagingDataUrlFRD').val();

        $("#failedRebalanceDetailsGrid").load(dataUrl, { 'currentPageIndex': page, 'sortingModel': sortingModel },
            function (response, status, xhr) {
                if (status == "error") {
                    alert("An error occurred while loading the results.");
                }
            });
    }
}

function isPopupOpen() {
    return $('#failedRebalanceDetailsGrid').is(':visible');
}

function openSummaryDetailPopup(i, e) {
    e.preventDefault();

    var trName = "#trFailedRebalance_" + i;
 
    var dataUrl = $('#hidPopupDataUrl').val();
 
    $.ajax({
        cache: false,
        type: "Get",
        url: dataUrl,
        data: {
            SSN: $(trName + " td:nth-child(1)").text(),
            PlanNumber: $(trName + " td:nth-child(2)").text(),
            FailedDaysTotal: $(trName + " td:nth-child(4)").text(),
            ErrorText: $(trName + " td:nth-child(5)").text(),
        },
        datatype: "html",
        success: function (data) {
         
            $('#failedRebalanceDetailsIndex').html(data);
            $('#popupHeaderTxt').html('Failed Rebalance Details.'); 
            $('#divSummaryDetailPopup').modal( { backdrop: 'static', keyboard: false });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function closeSummaryDetailPopup()
{
    $('#failedRebalanceDetailsIndex').html('');
    $('#divSummaryDetailPopup').modal('hide');
    initializeGridSortingView();
}
