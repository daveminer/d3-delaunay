import tape from "@observablehq/tape";
import Delaunay from "../src/delaunay.js";

tape("delaunay.voronoi([xmin, ymin, xmax, ymax])", test => {
  let voronoi = Delaunay.from([[0, 0], [1, 0], [0, 1], [1, 1]]).voronoi([-1, -1, 2, 2]);
  test.equal(voronoi.xmin, -1);
  test.equal(voronoi.ymin, -1);
  test.equal(voronoi.xmax, 2);
  test.equal(voronoi.ymax, 2);
  test.deepEqual(voronoi.circumcenters, Float64Array.of(0.5, 0.5, 0.5, 0.5));
  // test.deepEqual(voronoi.cells.map(c => c.triangles), [[0], [1, 0], [0, 1], [1]]);
  // test.deepEqual(voronoi.cells.map(c => c.v0), [[0, -0.5], [0.5, 0], [-0.5, 0], [0, 0.5]]);
  // test.deepEqual(voronoi.cells.map(c => c.vn), [[-0.5, 0], [0, -0.5], [0, 0.5], [0.5, 0]]);
});

tape("delaunay.voronoi(…) returns null cell.triangles for coincident points", test => {
  let voronoi = Delaunay.from([[0, 0], [1, 0], [0, 1], [1, 0]]).voronoi([-1, -1, 2, 2]);
  test.deepEqual(voronoi.circumcenters, Float64Array.of(0.5, 0.5));
  // test.deepEqual(voronoi.cells.map(c => c.triangles), [[0], [0], [0], null]);
  // test.deepEqual(voronoi.cells.map(c => c.v0), [[0, -0.5], [0, 0], [-0.5, 0], null]);
  // test.deepEqual(voronoi.cells.map(c => c.vn), [[-0.5, 0], [0, -0.5], [0, 0], null]);
});

tape("voronoi.find(x, y) returns the index of the cell that contains the specified point", test => {
  let voronoi = Delaunay.from([[0, 0], [1, 0], [0, 1], [1, 1]]).voronoi([-1, -1, 2, 2]);
  test.deepEqual(voronoi.find(0.25, 0.25), 0);
});

// tape("cell.render(context) is a noop for coincident points", test => {
//   let voronoi = Delaunay.from([[0, 0], [1, 0], [0, 1], [1, 0]]).voronoi([-1, -1, 2, 2]);
//   test.equal(voronoi.cells[3].render({}), undefined);
// });

// tape("cell.contains(x, y) is false for coincident points", test => {
//   let voronoi = Delaunay.from([[0, 0], [1, 0], [0, 1], [1, 0]]).voronoi([-1, -1, 2, 2]);
//   test.equal(voronoi.cells[3].contains(1, 0), false);
// });
