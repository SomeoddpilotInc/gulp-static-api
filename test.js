var assert = require("assert");
var es = require("event-stream");
var File = require("vinyl");
var collections = require("./");

describe("gulp-static-api", function () {
  it("should assert", function (done) {

    var fakeFile = new File({
      contents: es.readArray(["stream", "with", "those", "contents"])
    });

    var collector = collections({
      glob: "tests/fixtures/*.md",
      count: 1,
      sortBy: function (a, b) {
        return (a.attributes.sort > b.attributes.sort) ?
          -1 : (a.attributes.sort < b.attributes.sort) ?
          1 : 0;
      }
    });

    collector.write(fakeFile);

    collector.once("data", function (file) {
      assert(file.isStream());

      done();
    });
  });
});
