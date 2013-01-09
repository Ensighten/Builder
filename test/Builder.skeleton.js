[{
// Builder
  "A Builder": {
    "defined on window": {
      "exists": true
    }
  },
  "A template": {
    "processed by an augmented vanilla Builder": {
      "returns augmented content": true
    }
  }
}, {
// Builder.jquery
  "A template": {
    "rendered by a jQuery Builder": {
      "returns a valid jQuery collection": true,
      "returns the expected elements": true
    }
  }
}, {
// Builder.keys
  "A template": {
    "rendered by a keys Builder": {
      "returns the view": true
    }
  }
}, {
// Builder.require
  "A Builder": {
    "defined by require.js": {
      "exists": true
    }
  }
}, {
// Builder.require.jquery.keys
  "A template with a jQuery plugin (string flavor)": {
    "rendered by a jQuery pluginified Builder": {
      "instantiates the jQuery plugin": true
    }
  },
  "A template with a jQuery plugin (object flavor)": {
    "rendered by a jQuery pluginified Builder": {
      "instantiates the jQuery plugin": true
    }
  }
}]