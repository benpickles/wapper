module("split")

test("with same parent", function() {
  var doc = $("<div>").html("<p>lorem ipsum dolor sit amet.</p>")
  var p = doc.find("p")[0]

  var elems = Wapper.split({
    startContainer: p.firstChild,
    startOffset: 6,
    endContainer: p.firstChild,
    endOffset: 11
  })

  assertSameNodes(elems, [p.childNodes[1]])
  assertChildNodeTypes(p, [3, 3, 3])
  assertChildNodeText(p, [
    "lorem ",
    "ipsum",
    " dolor sit amet."
  ])
})

test("with containing node", function() {
  var doc = $("<div>").html('<p>lorem ipsum <a href="/">dolor</a> sit amet.</p>')
  var p = doc.find("p")[0]

  Wapper.split({
    startContainer: p.firstChild,
    startOffset: 6,
    endContainer: p.lastChild,
    endOffset: 4
  })

  assertChildNodeTypes(p, [3, 3, 1, 3, 3])
  assertChildNodeText(p, [
    "lorem ",
    "ipsum ",
    "dolor",
    " sit",
    " amet."
  ])
})

test("spanning nodes", function() {
  var doc = $("<div>").html('<p>lorem ipsum <a href="/">dolor</a> </p><p>sit amet.</p>')
  var p1 = doc.find("p:first")[0]
  var p2 = doc.find("p:last")[0]

  Wapper.split({
    startContainer: p1.firstChild,
    startOffset: 6,
    endContainer: p2.firstChild,
    endOffset: 3
  })

  assertChildNodeTypes(p1, [3, 3, 1, 3])
  assertChildNodeText(p1, [
    "lorem ",
    "ipsum ",
    "dolor",
    " "
  ])
  assertChildNodeTypes(p2, [3, 3])
  assertChildNodeText(p2, [
    "sit",
    " amet."
  ])
})
