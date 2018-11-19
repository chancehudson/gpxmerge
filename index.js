const fs = require('fs');
const { argv } = process;

/**
 * Cut the node binary and index filename arguments off, and take
 * the rest as tcx filepaths
 *
 * Also, no hashbang for windows support ❤️ (and to have a constant here)
 **/
const gpsFiles = argv.slice(2);
if (gpsFiles.length === 0) {
  console.group();
  console.log('Usage: gpsmerge <file1.gpx> <file2.gpx> [...fileX.gpx]');
  console.groupEnd();
}

console.log(gpsFiles);
