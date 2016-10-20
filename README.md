# exiftool-vendored

Efficient, cross-platform [node](https://nodejs.org/) access to [ExifTool](http://www.sno.phy.queensu.ca/~phil/exiftool/). 

[![npm version](https://badge.fury.io/js/exiftool-vendored.svg)](https://badge.fury.io/js/exiftool-vendored)
[![Build Status](https://travis-ci.org/mceachen/exiftool-vendored.svg?branch=master)](https://travis-ci.org/mceachen/exiftool-vendored)

## Features

1. Uses `-stay_open` mode by default, which can be up to 60x faster than other packages[*](#stay_open)

1. Parsing of 
    - dates (even though EXIF doesn't include [timezone offset data](#dates))
    - latitudes & longitudes

1. Auditable ExifTool source code (the "vendored" code is [verifiable](http://owl.phy.queensu.ca/~phil/exiftool/checksums.txt))

1. Automated updates to ExifTool ([as new versions come out monthly](http://www.sno.phy.queensu.ca/~phil/exiftool/history.html))

1. Tested on node v6+ on Linux, Mac, & Windows.

## Installation

    npm install --save exiftool-vendored

The vendored version of ExifTool relevant for your platform will be installed via [platform-dependent-modules](https://www.npmjs.com/package/platform-dependent-modules).

## Usage

```js
import { exiftool } from "exiftool-vendored"
// ExifTool.read() returns a Promise of metadata
exiftool.read("path/to/file.jpg").then(metadata => {
  console.log(`Make: ${metadata.Make}, Model: ${metadata.Model}`)
})
```

Note that the official [EXIF](http://www.cipa.jp/std/documents/e/DC-008-2012_E.pdf) tag names as well as those that come from ExifTool](http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/index.html) are [PascalCased](https://en.wikipedia.org/wiki/PascalCase), like `AFPointSelected` and `ISO`. ("Fixing" the field names to be camelCase, would result in ungainly `aFPointSelected` and `iSO` atrocities).

## Dates

Generally, EXIF tags encode dates and times with **no timezone offset.** Presumably the time is captured in local time, but this means parsing the same file in different parts of the world results in a different *absolute* timestamp for the same file.

Rather than returning a [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) (which encapsulates a timezone), this library returns classes that encode just the day, the time of day, or both.

In cases where a GPS UTC timestamp is encoded with the image, the timezone offset can be inferred, and will encoded in all related `ExifDate`s. 

```ts
const d /*: ExifDate*/ = metadata.DateTimeOriginal
// if you simply must have a Date
const onlyCorrectIfYouTookThePhotoInTheSameTimezoneOffsetAsItIsLocally: Date = 
  d.toLocalDate()
```




## stay_open

Starting the perl version of ExifTool is expensive, and is *especially* expensive on the Windows version of ExifTool. 

On Windows, a distribution of Perl and the ~1000 files that make up ExifTool are extracted into a temporary directory for **every invocation**. Windows virus scanners that wedge reads on these files until they've been determined to be safe make this approach even more costly.

Using `-stay_open` we can reuse a single instance of ExifTool across all requests, which drops response latency dramatically. 

## Versioning

I wanted to include the ExifTool's version number explicitly in the version number, but npm requires strict compliance with SemVer. Given that ExifTool sometimes includes patch releases, there aren't always enough spots to encode an API version **and* the ExifTool version.

Given those constraints, version numbers follow the following scheme:
```sh
  $API.$UPDATE.$PATCH
```

* Breaking API changes to this package will increment `API`.
* Any bugfix or new release of ExifTool will increment `UPDATE`.
* Metadata changes or trivial bugfixes will increment `PATCH`.

Note that the platform dependent modules **use the ExifTool version**, so you know what version you're getting if you look there, or at this `package.json`.

### v0.1.0

Initial Release. Packages ExifTool v10.30.
