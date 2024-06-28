const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Testing getNum(input)", () => {
    test("Whole number input", (done) => {
      let input = "37L";
      assert.equal(convertHandler.getNum(input), 37);
      done();
    });

    test("Decimal Input", (done) => {
      let input = "24.2gal";
      assert.equal(convertHandler.getNum(input), 24.2);
      done();
    });

    test("Fractional Input", (done) => {
      let input = "1/56Lbs";
      assert.equal(convertHandler.getNum(input), 1 / 56);
      done();
    });

    test("Fractional Input with Decimal", (done) => {
      let input = "1.2/78L";
      assert.equal(convertHandler.getNum(input), 1.2 / 78);
      done();
    });

    test("Invalid Input (double fraction)", (done) => {
      let input = "45/34/3mi";
      assert.equal(convertHandler.getNum(input), undefined);
      done();
    });

    test("No Numerical Input", (done) => {
      let input = "L";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite("Testing getUnit(input)", () => {
    test("For Each Valid Unit Inputs", (done) => {
      let input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG",
      ];
      let output = [
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
      ];
      input.forEach((el, index) => {
        assert.equal(convertHandler.getUnit(el), output[index]);
      });
      done();
    });
    test("Unknown Unit Input", (done) => {
      assert.equal(convertHandler.getUnit("34kilograms"), undefined);
      done();
    });
  });

  suite("Testing getReturnUnit(initUnit)", () => {
    test("For Each Valid Unit Inputs", (done) => {
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let expect = ["L", "gal", "km", "mi", "kg", "lbs"];
      input.forEach((el, i) => {
        assert.equal(convertHandler.getReturnUnit(el), expect[i]);
      });
      done();
    });
  });

  suite("Testing spellOutUnit(unit)", () => {
    test("For Each Valid Unit Inputs", (done) => {
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let expect = [
        "gallons",
        "liters",
        "miles",
        "kilometers",
        "pounds",
        "kilograms",
      ];
      input.forEach(function (el, i) {
        assert.equal(convertHandler.spellOutUnit(el), expect[i]);
      });
      done();
    });
  });

  suite("Testing convert(num, unit)", () => {
    test("Gal to L", (done) => {
      let input = [10, "gal"];
      let expected = 37.8541;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1,
      );
      done();
    });

    test("L to Gal", (done) => {
      let input = [10, "l"];
      let expected = 2.64172;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1,
      );
      done();
    });

    test("Mi to Km", (done) => {
      let input = [5, "mi"];
      let expected = 8.0467;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1,
      );
      done();
    });

    test("Km to Mi", (done) => {
      let input = [2, "km"];
      let expected = 1.24275;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1,
      );
      done();
    });

    test("Lbs to Kg", (done) => {
      let input = [15, "lbs"];
      let expected = 6.80388;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1,
      );
      done();
    });

    test("Kg to Lbs", (done) => {
      let input = [5, "kg"];
      let expected = 11.02312;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1,
      );
      done();
    });
  });
});
