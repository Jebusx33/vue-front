var columnDefs = [
    { field: 'ImagePriduct' },
    { field: 'TitleProduct', sort: 'desc' },
    { field: 'DescriptionProduct' },
    { field: 'PriceProduct' , sort: 'desc'},
    { field: 'id'},
  ];
  
  function dateComparator(date1, date2) {
    var date1Number = monthToComparableNumber(date1);
    var date2Number = monthToComparableNumber(date2);
  
    if (date1Number === null && date2Number === null) {
      return 0;
    }
    if (date1Number === null) {
      return -1;
    }
    if (date2Number === null) {
      return 1;
    }
  
    return date1Number - date2Number;
  }
  
  // eg 29/08/2004 gets converted to 20040829
  function monthToComparableNumber(date) {
    if (date === undefined || date === null || date.length !== 10) {
      return null;
    }
  
    var yearNumber = date.substring(6, 10);
    var monthNumber = date.substring(3, 5);
    var dayNumber = date.substring(0, 2);
  
    var result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
    return result;
  }
  
  var gridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
      width: 170,
      sortable: true,
    },
  };
  
  // setup the grid after the page has finished loading
  document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);
  
    fetch('https://run.mocky.io/v3/cd607f3e-e53b-4b89-9cca-6abc2ddeb122')
      .then((response) => response.json())
      .then((data) => gridOptions.api.setRowData(data));
  });;