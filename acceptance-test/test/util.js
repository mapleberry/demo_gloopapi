module.exports = {stripTrailingSlash, isNonBlankString}

function stripTrailingSlash (url) {
  if (url.endsWith('/')) {
    return url.slice(0, url.length - 1)
  }
  return url
}

function isNonBlankString (str) {
  return str != null && typeof str === 'string' && str.trim().length > 0
}
