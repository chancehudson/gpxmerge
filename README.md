# gpxmerge [![Build Status](https://travis-ci.org/JChanceHud/gpxmerge.svg?branch=master)](https://travis-ci.org/JChanceHud/gpxmerge) [![npm](https://img.shields.io/npm/v/gpxmerge.svg)](https://www.npmjs.com/package/gpxmerge)

A tool for merging multiple gpx files. It takes the metadata from the first file and appends trackpoints from all other supplied files.

## Install

Install from npm with the following command:

```sh
npm install -g gpxmerge
```

## Usage

The tool can be called with multiple gpx files, and will output the combined gpx to stdout.

Example use:

```sh
$ gpxmerge ./test/file1.gpx ./test/file2.gpx
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<gpx creator="StravaGPX" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd" version="1.1" xmlns="http://www.topografix.com/GPX/1/1" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3">
  <metadata>
    <time>2018-11-18T14:48:34Z</time>
  </metadata>
  <trk>
    <name>Morning Ride</name>
    <type>1</type>
    <trkseg>
      <trkpt lat="30.2754350" lon="-97.7710770">
        <ele>140.4</ele>
        <time>2018-11-18T14:48:34Z</time>
        <extensions>
          <power>0</power>
          <gpxtpx:TrackPointExtension>
            <gpxtpx:atemp>13</gpxtpx:atemp>
            <gpxtpx:hr>103</gpxtpx:hr>
            <gpxtpx:cad>29</gpxtpx:cad>
          </gpxtpx:TrackPointExtension>
        </extensions>
      </trkpt>
```

Written to file:
```sh
$ gpxmerge ./test/file1.gpx ./test/file2.gpx > merged.gpx
```
