// Testing the sortDatabase function for all of the different types of sorting
describe("sortDatabase(data, specifier, ascending) - Sort the data contained in a JSON object", function() {
    let students = [{
        "fname": "Lois",
        "lname": "Hanson",
        "startDate": "3/12/93",
        "street": "923 North 1400 East",
        "city": "Williamsburg",
        "state": "ID",
        "zip": 93673,
        "phone": "673-3114",
        "year": 4
    }, {
        "fname": "Alex",
        "lname": "Peterson",
        "startDate": "7/11/94",
        "street": "931 South 300 West",
        "city": "Williamsburg",
        "state": "ID",
        "zip": 93673,
        "phone": "679-2116",
        "year": 3
    }, {
        "fname": "Elizabeth",
        "lname": "Howard",
        "startDate": "3/19/94",
        "street": "1726 East 1330 North",
        "city": "Williamsburg",
        "state": "ID",
        "zip": 93679,
        "phone": "734-3219",
        "year": 3
    }];

    it("Sort the objects by first name in ascending order", function() {
        expect(sortDatabase(students, "fname", true)).toEqual(
            [{
                "fname": "Alex",
                "lname": "Peterson",
                "startDate": "7/11/94",
                "street": "931 South 300 West",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "679-2116",
                "year": 3
            }, {
                "fname": "Elizabeth",
                "lname": "Howard",
                "startDate": "3/19/94",
                "street": "1726 East 1330 North",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93679,
                "phone": "734-3219",
                "year": 3
            }, {
                "fname": "Lois",
                "lname": "Hanson",
                "startDate": "3/12/93",
                "street": "923 North 1400 East",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "673-3114",
                "year": 4
            }]
        );
    });

    it("Sort the objects by first name in descending order", function() {
        expect(sortDatabase(students, "fname", false)).toEqual(
            [{
                "fname": "Lois",
                "lname": "Hanson",
                "startDate": "3/12/93",
                "street": "923 North 1400 East",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "673-3114",
                "year": 4
            }, {
                "fname": "Elizabeth",
                "lname": "Howard",
                "startDate": "3/19/94",
                "street": "1726 East 1330 North",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93679,
                "phone": "734-3219",
                "year": 3
            }, {
                "fname": "Alex",
                "lname": "Peterson",
                "startDate": "7/11/94",
                "street": "931 South 300 West",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "679-2116",
                "year": 3
            }]
        );
    });

    it("Sort the objects by last name in ascending order", function() {
        expect(sortDatabase(students, "lname", true)).toEqual(
            [{
                "fname": "Lois",
                "lname": "Hanson",
                "startDate": "3/12/93",
                "street": "923 North 1400 East",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "673-3114",
                "year": 4
            }, {
                "fname": "Elizabeth",
                "lname": "Howard",
                "startDate": "3/19/94",
                "street": "1726 East 1330 North",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93679,
                "phone": "734-3219",
                "year": 3
            }, {
                "fname": "Alex",
                "lname": "Peterson",
                "startDate": "7/11/94",
                "street": "931 South 300 West",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "679-2116",
                "year": 3
            }]
        );
    });

    it("Sort the objects by last name in descending order", function() {
        expect(sortDatabase(students, "lname", false)).toEqual(
            [{
                "fname": "Alex",
                "lname": "Peterson",
                "startDate": "7/11/94",
                "street": "931 South 300 West",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "679-2116",
                "year": 3
            }, {
                "fname": "Elizabeth",
                "lname": "Howard",
                "startDate": "3/19/94",
                "street": "1726 East 1330 North",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93679,
                "phone": "734-3219",
                "year": 3
            }, {
                "fname": "Lois",
                "lname": "Hanson",
                "startDate": "3/12/93",
                "street": "923 North 1400 East",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "673-3114",
                "year": 4
            }]
        );
    });

    it("Sort the objects by start date in ascending order", function() {
        expect(sortDatabase(students, "startDate", true)).toEqual(
            [{
                "fname": "Lois",
                "lname": "Hanson",
                "startDate": "3/12/93",
                "street": "923 North 1400 East",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "673-3114",
                "year": 4
            }, {
                "fname": "Elizabeth",
                "lname": "Howard",
                "startDate": "3/19/94",
                "street": "1726 East 1330 North",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93679,
                "phone": "734-3219",
                "year": 3
            }, {
                "fname": "Alex",
                "lname": "Peterson",
                "startDate": "7/11/94",
                "street": "931 South 300 West",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "679-2116",
                "year": 3
            }]
        );
    });

    it("Sort the objects by start date in descending order", function() {
        expect(sortDatabase(students, "startDate", false)).toEqual(
            [{
                "fname": "Alex",
                "lname": "Peterson",
                "startDate": "7/11/94",
                "street": "931 South 300 West",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "679-2116",
                "year": 3
            }, {
                "fname": "Elizabeth",
                "lname": "Howard",
                "startDate": "3/19/94",
                "street": "1726 East 1330 North",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93679,
                "phone": "734-3219",
                "year": 3
            }, {
                "fname": "Lois",
                "lname": "Hanson",
                "startDate": "3/12/93",
                "street": "923 North 1400 East",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "673-3114",
                "year": 4
            }]
        );
    });

    it("Sort the objects by street in ascending order", function() {
        expect(sortDatabase(students, "street", true)).toEqual(
            [{
                "fname": "Elizabeth",
                "lname": "Howard",
                "startDate": "3/19/94",
                "street": "1726 East 1330 North",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93679,
                "phone": "734-3219",
                "year": 3
            }, {
                "fname": "Lois",
                "lname": "Hanson",
                "startDate": "3/12/93",
                "street": "923 North 1400 East",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "673-3114",
                "year": 4
            }, {
                "fname": "Alex",
                "lname": "Peterson",
                "startDate": "7/11/94",
                "street": "931 South 300 West",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "679-2116",
                "year": 3
            }]
        );
    });

    it("Sort the objects by street in descending order", function() {
        expect(sortDatabase(students, "street", false)).toEqual(
            [{
                "fname": "Alex",
                "lname": "Peterson",
                "startDate": "7/11/94",
                "street": "931 South 300 West",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "679-2116",
                "year": 3
            }, {
                "fname": "Lois",
                "lname": "Hanson",
                "startDate": "3/12/93",
                "street": "923 North 1400 East",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "673-3114",
                "year": 4
            }, {
                "fname": "Elizabeth",
                "lname": "Howard",
                "startDate": "3/19/94",
                "street": "1726 East 1330 North",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93679,
                "phone": "734-3219",
                "year": 3
            }]
        );
    });

    it("Sort the objects by city in ascending order", function() {
        expect(sortDatabase(students, "city", true)).toEqual(
            [{
                "fname": "Alex",
                "lname": "Peterson",
                "startDate": "7/11/94",
                "street": "931 South 300 West",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "679-2116",
                "year": 3
            }, {
                "fname": "Lois",
                "lname": "Hanson",
                "startDate": "3/12/93",
                "street": "923 North 1400 East",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "673-3114",
                "year": 4
            }, {
                "fname": "Elizabeth",
                "lname": "Howard",
                "startDate": "3/19/94",
                "street": "1726 East 1330 North",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93679,
                "phone": "734-3219",
                "year": 3
            }]
        );
    });

    it("Sort the objects by city in descending order", function() {
        expect(sortDatabase(students, "city", false)).toEqual(
            [{
                "fname": "Elizabeth",
                "lname": "Howard",
                "startDate": "3/19/94",
                "street": "1726 East 1330 North",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93679,
                "phone": "734-3219",
                "year": 3
            }, {
                "fname": "Lois",
                "lname": "Hanson",
                "startDate": "3/12/93",
                "street": "923 North 1400 East",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "673-3114",
                "year": 4
            }, {
                "fname": "Alex",
                "lname": "Peterson",
                "startDate": "7/11/94",
                "street": "931 South 300 West",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "679-2116",
                "year": 3
            }]
        );
    });

    it("Sort the objects by state in ascending order", function() {
        expect(sortDatabase(students, "state", true)).toEqual(
            [{
                "fname": "Elizabeth",
                "lname": "Howard",
                "startDate": "3/19/94",
                "street": "1726 East 1330 North",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93679,
                "phone": "734-3219",
                "year": 3
            }, {
                "fname": "Lois",
                "lname": "Hanson",
                "startDate": "3/12/93",
                "street": "923 North 1400 East",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "673-3114",
                "year": 4
            }, {
                "fname": "Alex",
                "lname": "Peterson",
                "startDate": "7/11/94",
                "street": "931 South 300 West",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "679-2116",
                "year": 3
            }]
        );
    });

    it("Sort the objects by state in descending order", function() {
        expect(sortDatabase(students, "state", false)).toEqual(
            [{
                "fname": "Alex",
                "lname": "Peterson",
                "startDate": "7/11/94",
                "street": "931 South 300 West",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "679-2116",
                "year": 3
            }, {
                "fname": "Lois",
                "lname": "Hanson",
                "startDate": "3/12/93",
                "street": "923 North 1400 East",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "673-3114",
                "year": 4
            }, {
                "fname": "Elizabeth",
                "lname": "Howard",
                "startDate": "3/19/94",
                "street": "1726 East 1330 North",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93679,
                "phone": "734-3219",
                "year": 3
            }]
        );
    });

    it("Sort the objects by phone in ascending order", function() {
        expect(sortDatabase(students, "phone", true)).toEqual(
            [{
                "fname": "Lois",
                "lname": "Hanson",
                "startDate": "3/12/93",
                "street": "923 North 1400 East",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "673-3114",
                "year": 4
            }, {
                "fname": "Alex",
                "lname": "Peterson",
                "startDate": "7/11/94",
                "street": "931 South 300 West",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "679-2116",
                "year": 3
            }, {
                "fname": "Elizabeth",
                "lname": "Howard",
                "startDate": "3/19/94",
                "street": "1726 East 1330 North",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93679,
                "phone": "734-3219",
                "year": 3
            }]
        );
    });

    it("Sort the objects by phone in descending order", function() {
        expect(sortDatabase(students, "phone", false)).toEqual(
            [{
                "fname": "Elizabeth",
                "lname": "Howard",
                "startDate": "3/19/94",
                "street": "1726 East 1330 North",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93679,
                "phone": "734-3219",
                "year": 3
            }, {
                "fname": "Alex",
                "lname": "Peterson",
                "startDate": "7/11/94",
                "street": "931 South 300 West",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "679-2116",
                "year": 3
            }, {
                "fname": "Lois",
                "lname": "Hanson",
                "startDate": "3/12/93",
                "street": "923 North 1400 East",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "673-3114",
                "year": 4
            }]
        );
    });

    it("Sort the objects by year in ascending order", function() {
        expect(sortDatabase(students, "year", true)).toEqual(
            [{
                "fname": "Elizabeth",
                "lname": "Howard",
                "startDate": "3/19/94",
                "street": "1726 East 1330 North",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93679,
                "phone": "734-3219",
                "year": 3
            }, {
                "fname": "Alex",
                "lname": "Peterson",
                "startDate": "7/11/94",
                "street": "931 South 300 West",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "679-2116",
                "year": 3
            }, {
                "fname": "Lois",
                "lname": "Hanson",
                "startDate": "3/12/93",
                "street": "923 North 1400 East",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "673-3114",
                "year": 4
            }]
        );
    });

    it("Sort the objects by year in descending order", function() {
        expect(sortDatabase(students, "year", false)).toEqual(
            [{
                "fname": "Lois",
                "lname": "Hanson",
                "startDate": "3/12/93",
                "street": "923 North 1400 East",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "673-3114",
                "year": 4
            }, {
                "fname": "Alex",
                "lname": "Peterson",
                "startDate": "7/11/94",
                "street": "931 South 300 West",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "679-2116",
                "year": 3
            }, {
                "fname": "Elizabeth",
                "lname": "Howard",
                "startDate": "3/19/94",
                "street": "1726 East 1330 North",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93679,
                "phone": "734-3219",
                "year": 3
            }]
        );
    });
});