#!/usr/bin/env node

const { argv } = process;
const gpsmerge = require('./');

// Use an immediately invoked functional expression to get async/await support
(async () => {
  /**
   * Cut the node binary and index filename arguments off, and take
   * the rest as tcx filepaths
   **/
  const gpsFilePaths = argv.slice(2);
  if (gpsFilePaths.length === 0) {
    // No files supplied on the command line, print help and exit
    console.group();
    console.log('Usage: gpsmerge <file1.gpx> <file2.gpx> [...fileX.gpx]');
    console.log('Merges trkpt elements in each gpx file, in the order supplied');
    console.groupEnd();
    process.exit(0);
  }
  if (gpsFilePaths.length <= 1) {
    console.log('Must supply a minimum of 2 filepaths');
    process.exit(1);
  }
  try {
    console.log(await gpsmerge(gpsFilePaths));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
