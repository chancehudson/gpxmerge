#!/usr/bin/env node

const { argv } = process;
const gpxmerge = require('./');

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
    console.log('Usage: gpxmerge <file1.gpx> <file2.gpx> [...fileX.gpx]');
    console.log('Merges trkpt elements in each gpx file, in the order supplied');
    console.groupEnd();
    process.exit(0);
  }
  try {
    console.log(await gpxmerge(...gpsFilePaths));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
