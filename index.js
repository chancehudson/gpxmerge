const fs = require('fs');
const { argv } = process;
const { promisify } = require('@ctheory/promisify');
// Promisify the fs implementation for async/await use
const readFile = promisify(fs.readFile);

// Use an immediately invoked functional expression to get async/await support
(async () => {
  // If we're not being run from the cli exit this function
  if (require.main !== module) return;

  /**
   * Cut the node binary and index filename arguments off, and take
   * the rest as tcx filepaths
   *
   * Also, no hashbang for windows support ❤️ (and to have a constant here)
   **/
  const gpsFilePaths = argv.slice(2);
  if (gpsFilePaths.length === 0) {
    // No files supplied on the command line, print help and exit
    console.group();
    console.log('Usage: gpsmerge <file1.gpx> <file2.gpx> [...fileX.gpx]');
    console.groupEnd();
    process.exit(1);
  }
  try {
    await mergeFiles(gpsFilePaths);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();

async function mergeFiles(gpsFilePaths) {
  // Make sure all paths exist
  for (file of gpsFilePaths) {
    if (!fs.existsSync(file)) throw new Error(`File ${file} doesn't exist.`);
  }

  const files = await Promise.all(
    gpsFilePaths.map(async file => await readFile(file, 'utf8'))
  );
  // An array of strings that are the files
  console.log(files);
}

module.exports = mergeFiles;
