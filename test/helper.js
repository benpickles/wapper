function assertChildNodeText(parent, texts) {
  equals(parent.childNodes.length, texts.length, "same number of nodes")

  texts.forEach(function(text, i) {
    var child = parent.childNodes[i]
    var value = child.textContent
    equals(text, value, "textContent/innerText correct")
  })
}

function assertChildNodeTypes(parent, types) {
  equals(parent.childNodes.length, types.length, "same number of nodes")

  var mapping = {}
  mapping[1] = mapping["element"] = 1
  mapping[3] = mapping["text"] = 3

  types.forEach(function(type, i) {
    var child = parent.childNodes[i]
    var mapped = mapping[type]
    equals(child.nodeType, mapped, "nodeType " + mapped)
  })
}

function assertSameNodes(actual, expected) {
  equals(actual.length, expected.length, "same number of nodes")

  expected.forEach(function(node, i) {
    equals(actual[i], node)
  })
}
