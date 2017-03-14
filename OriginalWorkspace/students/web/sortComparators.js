
/* global Cookies */

let field = {};


function compare(a, b) {
    let aVar, bVar;

    (a[field] === 'string') ? aVar = a[field].toLowerCase(): aVar = a[field];
    (b[field] === 'string') ? bVar = b[field].toLowerCase(): bVar = b[field];

    return ((aVar < bVar) ? -1 : ((aVar > bVar) ? 1 : 0))
}


function sortDatabase(data, specifier, ascending) {
    Cookies.set('sort', specifier);

    field = specifier;

    data.sort(compare);

    if (!ascending) {
        data.reverse();
    }

    return data;
}


// This function will sort the data by the first specifier and the elements
// match then it will sort them by the second specifier
function sortDatabaseMulti(data, specifier1, specifier2, ascending) {
    Cookies.set('sort', specifier1);

    field = specifier1;

    data.sort(function(a, b) {

        field = specifier1;

        switch (compare(a, b)) {
            case -1:
                return -1;
            case 0:
                field = specifier2;
                return compare(a,b);
            case 1:
                return 1;
            default:
                throw "Invalid return type";
        }

    });

    if (!ascending) {
        data.reverse();
    }

    return data;
}