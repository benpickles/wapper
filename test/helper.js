function assertChildNodeText(parent, texts) {
  equals(parent.childNodes.length, texts.length, "same number of nodes")

  texts.forEach(function(text, i) {
    var child = parent.childNodes[i]

    if (child) {
      var value = child.textContent
      equals(text, value, "textContent correct")
    } else {
      ok(false, "missing node")
    }
  })
}

function assertChildNodeTypes(parent, types) {
  equals(parent.childNodes.length, types.length, "same number of nodes")

  var mapping = {}
  mapping[1] = mapping["element"] = 1
  mapping[3] = mapping["text"] = 3

  types.forEach(function(type, i) {
    var child = parent.childNodes[i]

    if (child) {
      var mapped = mapping[type]
      equals(child.nodeType, mapped, "nodeType " + mapped)
    } else {
      ok(false, "missing node")
    }
  })
}

function assertSameNodes(actual, expected) {
  equals(actual.length, expected.length, "same number of nodes")

  expected.forEach(function(node, i) {
    equals(actual[i], node)
  })
}
