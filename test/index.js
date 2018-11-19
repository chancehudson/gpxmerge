const gpxmerge = require('../');
const xml2js = require('xml2js');
const path = require('path');
const test = require('ava');

const GPX_FILE_1 = path.resolve(__dirname, 'file1.gpx');
const GPX_FILE_2 = path.resolve(__dirname, 'file2.gpx');

test('0 files should fail', async t => {
  try {
    await gpxmerge();
    t.fail();
  } catch (_) {
    t.pass();
  }
});

test('1 file should fail', async t => {
  try {
    await gpxmerge(GPX_FILE_1);
    t.fail();
  } catch (_) {
    t.pass();
  }
});

test('2 files should succeed', async t => {
  await gpxmerge(GPX_FILE_1, GPX_FILE_2);
  t.pass();
});

test('invalid path should fail', async t => {
  try {
    await gpxmerge(GPX_FILE_1, GPX_FILE_2, 'invalid_path.gpx');
    t.fail();
  } catch (_) {
    t.pass();
  }
});
