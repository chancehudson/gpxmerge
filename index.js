const fs = require('fs');
const { promisify } = require('@ctheory/promisify');
// Promisify the fs implementation for async/await use
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const xml2js = require('xml2js');
const parseString = promisify(xml2js.parseString);
const idx = require('idx');

// Parse gpx file content
async function mergeGpxFiles(gpxDataFiles) {
  if (gpxDataFiles.length < 2) {
    throw new Error('Must supply at least 2 gpx files');
  }
  const files = await readFiles(gpxDataFiles);
  // If the xml reads as an array flatten the root
  const _firstXml = await parseString(files.shift());
  const firstXml = _firstXml[0] ? _firstXml[0] : _firstXml;

  const parsedFiles = await Promise.all(files.map(file => parseString(file)));

  const _trkpts = parsedFiles.map(_xml => {
    const xml = _xml[0] ? _xml[0] : _xml;
    return idx(xml, _ => _.gpx.trk[0].trkseg[0].trkpt) || [];
  });
  // Flatten the [ [ nested arrays ] ]
  const trkpts = [].concat(..._trkpts);
  try {
    firstXml.gpx.trk[0].trkseg[0].trkpt.push(...trkpts);
  } catch (err) {
    throw new Error('Error parsing first gpx file.');
  }
  const builder = new xml2js.Builder();
  return builder.buildObject(firstXml);
}

// An array of strings that are the files, parsed as utf-8
async function readFiles(gpsFilePaths) {
  // Make sure all paths exist
  for (file of gpsFilePaths) {
    if (!fs.existsSync(file)) throw new Error(`File ${file} doesn't exist.`);
  }
  return await Promise.all(
    gpsFilePaths.map(async file => await readFile(file, 'utf-8'))
  );
}

module.exports = mergeGpxFiles;
