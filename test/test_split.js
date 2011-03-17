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

test("starting in an inline element", function() {
  var doc = $("<div>").html('<p>lorem <a href="/">ipsum</a> dolor sit amet.</p>')
  var p = doc.find("p")[0]

  var elems = Wapper.split({
    commonAncestorContainer: p,
    startContainer: p.childNodes[1].firstChild,
    startOffset: 2,
    endContainer: p.childNodes[2],
    endOffset: 5
  })

  assertSameNodes(elems, [
    p.childNodes[1].lastChild,
    p.childNodes[2]
  ])
  assertChildNodeTypes(p, [3, 1, 3, 3])
  assertChildNodeTypes(p.childNodes[1], [3, 3])
  assertChildNodeText(p, [
    "lorem ",
    "ipsum",
    " dolo",
    "r sit amet."
  ])
})

test("starting in an inline element, encompassing nested", function() {
  var doc = $("<div>").html('<p>lorem <a href="/">ipsum</a> <a href="/">dolor</a> sit amet.</p>')
  var p = doc.find("p")[0]

  var elems = Wapper.split({
    commonAncestorContainer: p,
    startContainer: p.childNodes[1].firstChild,
    startOffset: 2,
    endContainer: p.childNodes[4],
    endOffset: 4
  })

  assertSameNodes(elems, [
    p.childNodes[1].lastChild,
    p.childNodes[2],
    p.childNodes[3],
    p.childNodes[4],
  ])
  assertChildNodeTypes(p, [3, 1, 3, 1, 3, 3])
  assertChildNodeTypes(p.childNodes[1], [3, 3])
  assertChildNodeText(p, [
    "lorem ",
    "ipsum",
    " ",
    "dolor",
    " sit",
    " amet."
  ])
})

test("ending in an inline element", function() {
  var doc = $("<div>").html('<p>lorem ipsum <a href="/">dolor</a> sit amet.</p>')
  var p = doc.find("p")[0]

  var elems = Wapper.split({
    commonAncestorContainer: p,
    startContainer: p.firstChild,
    startOffset: 6,
    endContainer: p.childNodes[1].firstChild,
    endOffset: 3
  })

  assertSameNodes(elems, [
    p.childNodes[1],
    p.childNodes[2].firstChild
  ])
  assertChildNodeTypes(p, [3, 3, 1, 3])
  assertChildNodeTypes(p.childNodes[2], [3, 3])
  assertChildNodeText(p, [
    "lorem ",
    "ipsum ",
    "dolor",
    " sit amet."
  ])
})

test("ending in an inline element, encompassing nested", function() {
  var doc = $("<div>").html('<p>lorem ipsum <a href="/">dolor</a> <a href="/">sit</a> amet.</p>')
  var p = doc.find("p")[0]

  var elems = Wapper.split({
    commonAncestorContainer: p,
    startContainer: p.firstChild,
    startOffset: 6,
    endContainer: p.childNodes[3].firstChild,
    endOffset: 2
  })

  assertSameNodes(elems, [
    p.childNodes[1],
    p.childNodes[2],
    p.childNodes[3],
    p.childNodes[4].firstChild,
  ])
  assertChildNodeTypes(p, [3, 3, 1, 3, 1, 3])
  assertChildNodeTypes(p.childNodes[4], [3, 3])
  assertChildNodeText(p, [
    "lorem ",
    "ipsum ",
    "dolor",
    " ",
    "sit",
    " amet."
  ])
})

test("starting and ending in an inline element", function() {
  var doc = $("<div>").html('<p>lorem <a href="/">ipsum</a> <a href="/">dolor</a> sit amet.</p>')
  var p = doc.find("p")[0]

  var elems = Wapper.split({
    commonAncestorContainer: p,
    startContainer: p.childNodes[1].firstChild,
    startOffset: 2,
    endContainer: p.childNodes[3].firstChild,
    endOffset: 3
  })

  assertSameNodes(elems, [
    p.childNodes[1].lastChild,
    p.childNodes[2],
    p.childNodes[3].firstChild
  ])
  assertChildNodeTypes(p, [3, 1, 3, 1, 3])
  assertChildNodeTypes(p.childNodes[1], [3, 3])
  assertChildNodeTypes(p.childNodes[3], [3, 3])
  assertChildNodeText(p, [
    "lorem ",
    "ipsum",
    " ",
    "dolor",
    " sit amet."
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

test("spanning more nodes", function() {
  var doc = $("<div>").html('<p>lorem ip <strong>sum</strong> </p><p><a href="/">dolor</a> </p><p>blah <em>sit</em> amet.</p>')
  var p = doc.find("p")
  var p1 = p[0]
  var p2 = p[1]
  var p3 = p[2]

  var elems = Wapper.split({
    commonAncestorContainer: doc[0],
    startContainer: p1.childNodes[1].firstChild,
    startOffset: 1,
    endContainer: p3.childNodes[1].firstChild,
    endOffset: 2
  })

  assertSameNodes(elems, [
    p1.childNodes[1].childNodes[1],
    p1.childNodes[2],
    p2,
    p3.firstChild,
    p3.childNodes[1].firstChild
  ])
  assertChildNodeTypes(p1, [3, 1, 3])
  assertChildNodeText(p1, [
    "lorem ip ",
    "sum",
    " "
  ])
  assertChildNodeTypes(p1.childNodes[1], [3, 3])
  assertChildNodeText(p1.childNodes[1], [
    "s",
    "um",
  ])
  assertChildNodeTypes(p2, [1, 3])
  assertChildNodeText(p2, [
    "dolor",
    " "
  ])
  assertChildNodeTypes(p3, [3, 1, 3])
  assertChildNodeText(p3, [
    "blah ",
    "sit",
    " amet."
  ])
  assertChildNodeTypes(p3.childNodes[1], [3, 3])
  assertChildNodeText(p3.childNodes[1], [
    "si",
    "t"
  ])
})
