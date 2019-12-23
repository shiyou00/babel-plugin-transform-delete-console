"use strict";

const isArray = function (array) {
  return Object.prototype.toString.call(array) === '[object Array]'
};

module.exports = function() {
  return {
    name: "babel-plugin-delete-console",
    visitor: {
      CallExpression(path, { opts }) {
        const calleePath = path.get("callee");

        if (opts && isArray(opts.exclude)) {
          const hasTarget = opts.exclude.some(type => {
            return calleePath.matchesPattern("console." + type)
          });

          if (hasTarget) return
        }

        if (calleePath.matchesPattern("console", true)) {
          path.remove()
        }
      },
    },
  };
};
