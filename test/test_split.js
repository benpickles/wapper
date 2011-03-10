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

  var elems = Wapper.split({
    commonAncestorContainer: p,
    startContainer: p.firstChild,
    startOffset: 6,
    endContainer: p.lastChild,
    endOffset: 4
  })

  assertSameNodes(elems, [
    p.childNodes[1],
    p.childNodes[2],
    p.childNodes[3]
  ])
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

  var elems = Wapper.split({
    commonAncestorContainer: doc[0],
    startContainer: p1.firstChild,
    startOffset: 6,
    endContainer: p2.firstChild,
    endOffset: 3
  })

  assertSameNodes(elems, [
    p1.childNodes[1],
    p1.childNodes[2],
    p1.childNodes[3],
    p2.firstChild
  ])
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
