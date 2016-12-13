/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

var fs = require('fs');
var path = require('path');
var through2 = require('through2');
var replaceExt = require('replace-ext');

function cleanDest(outFolder, opts) {
  opts = opts || {};
  opts.cwd = opts.cwd || process.cwd();	

  function cleanFile(file, encoding, callback) {
    var filePath = path.resolve(opts.cwd, outFolder, file.relative);

    if (opts.extension) {
      filePath = replaceExt(filePath, opts.extension);
    }

    fs.unlink(filePath, function() { callback(null, file); });
  }
  var stream = through2.obj(cleanFile);
  stream.resume();
  return stream;
}

module.exports = cleanDest;
