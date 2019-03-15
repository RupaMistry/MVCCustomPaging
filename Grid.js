
// Initalize the entire partial view with proper control name
function initializeGridSortingView() {
    var uniqueControlName = "";
    var divGrid = $('.gridSortStyle');

    if (divGrid.length > 1)
        uniqueControlName = divGrid[divGrid.length - 1].id;
    else
        uniqueControlName = divGrid.attr('id');

    colSortByName = "#ColumnSortBy" + uniqueControlName;
    colOrderNumber = "#ColumnOrderNumber" + uniqueControlName;
    hidLastSelectedPageID = '#hidLastSelectedPageID' + uniqueControlName;
}

// Function to return the current SortingModel 
function getGridSortingModel() {

    var sortingModel = {
        'ColumnOrderNumber': $(colOrderNumber).val(),
        'ColumnSortBy': $(colSortByName).val()
    };

    return sortingModel;
}

// Method to get sorted data from the pre-configured Data URL.
function sortData(colOrderNo) {

    var prevSortBy = $(colSortByName).val();
    var prevOrderNumber = $(colOrderNumber).val();

    // Logic to set ascending, when the previous sort by is descending OR vice versa.
    if (prevSortBy === null) {
        $(colSortByName).val('Ascending');
    }
    else if (prevSortBy === 'Ascending' && prevOrderNumber == colOrderNo) {
        $(colSortByName).val('Descending');
    }
    else if (prevSortBy === 'Descending' && prevOrderNumber == colOrderNo) {
        $(colSortByName).val('Ascending');
    }
    else {
        $(colSortByName).val('Ascending');
    }

    $(colOrderNumber).val(colOrderNo);

    // Call the Grid Paging JS function to rebind the partial view with paged plus sorted data.
    loadGridByPageID($(hidLastSelectedPageID).val());
}
