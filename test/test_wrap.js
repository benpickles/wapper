module("wrap")

test("with same parent", function() {
  var doc = $("<div>").html("<p>lorem ipsum dolor sit amet.</p>")
  var p = doc.find("p")[0]

  var spans = Wapper.wrap({
    startContainer: p.firstChild,
    startOffset: 6,
    endContainer: p.firstChild,
    endOffset: 11
  })

  equals(doc.html(), "<p>lorem <span>ipsum</span> dolor sit amet.</p>")
  assertSameNodes(spans, doc.find("span").get())
})

test("with containing node", function() {
  var doc = $("<div>").html('<p>lorem ipsum <a href="/">dolor</a> sit amet.</p>')
  var p = doc.find("p")[0]

  var spans = Wapper.wrap({
    commonAncestorContainer: p,
    startContainer: p.firstChild,
    startOffset: 6,
    endContainer: p.lastChild,
    endOffset: 4
  })

  equals(doc.html(), '<p>lorem <span>ipsum <a href="/">dolor</a> sit</span> amet.</p>')
  assertSameNodes(spans, doc.find("span").get())
})

test("starting in an inline element", function() {
  var doc = $("<div>").html('<p>lorem <a href="/">ipsum</a> dolor sit amet.</p>')
  var p = doc.find("p")[0]

  var spans = Wapper.wrap({
    commonAncestorContainer: p,
    startContainer: p.childNodes[1].firstChild,
    startOffset: 2,
    endContainer: p.childNodes[2],
    endOffset: 5
  })

  equals(doc.html(), '<p>lorem <a href="/">ip<span>sum</span></a><span> dolo</span>r sit amet.</p>')
  assertSameNodes(spans, doc.find("span").get())
})

test("starting in an inline element, encompassing nested", function() {
  var doc = $("<div>").html('<p>lorem <a href="/">ipsum</a> <a href="/">dolor</a> sit amet.</p>')
  var p = doc.find("p")[0]

  var spans = Wapper.wrap({
    commonAncestorContainer: p,
    startContainer: p.childNodes[1].firstChild,
    startOffset: 2,
    endContainer: p.childNodes[4],
    endOffset: 4
  })

  equals(doc.html(), '<p>lorem <a href="/">ip<span>sum</span></a><span> <a href="/">dolor</a> sit</span> amet.</p>')
  assertSameNodes(spans, doc.find("span").get())
})

test("ending in an inline element", function() {
  var doc = $("<div>").html('<p>lorem ipsum <a href="/">dolor</a> sit amet.</p>')
  var p = doc.find("p")[0]

  var spans = Wapper.wrap({
    commonAncestorContainer: p,
    startContainer: p.firstChild,
    startOffset: 6,
    endContainer: p.childNodes[1].firstChild,
    endOffset: 3
  })

  equals(doc.html(), '<p>lorem <span>ipsum </span><a href="/"><span>dol</span>or</a> sit amet.</p>')
  assertSameNodes(spans, doc.find("span").get())
})

test("ending in an inline element, encompassing nested", function() {
  var doc = $("<div>").html('<p>lorem ipsum <a href="/">dolor</a> <a href="/">sit</a> amet.</p>')
  var p = doc.find("p")[0]

  var spans = Wapper.wrap({
    commonAncestorContainer: p,
    startContainer: p.firstChild,
    startOffset: 6,
    endContainer: p.childNodes[3].firstChild,
    endOffset: 2
  })

  equals(doc.html(), '<p>lorem <span>ipsum <a href="/">dolor</a> </span><a href="/"><span>si</span>t</a> amet.</p>')
  assertSameNodes(spans, doc.find("span").get())
})

test("starting and ending in an inline element", function() {
  var doc = $("<div>").html('<p>lorem <a href="/">ipsum</a> <a href="/">dolor</a> sit amet.</p>')
  var p = doc.find("p")[0]

  var spans = Wapper.wrap({
    commonAncestorContainer: p,
    startContainer: p.childNodes[1].firstChild,
    startOffset: 2,
    endContainer: p.childNodes[3].firstChild,
    endOffset: 3
  })

  equals(doc.html(), '<p>lorem <a href="/">ip<span>sum</span></a><span> </span><a href="/"><span>dol</span>or</a> sit amet.</p>')
  assertSameNodes(spans, doc.find("span").get())
})

test("spanning nodes", function() {
  var doc = $("<div>").html('<p>lorem ipsum <a href="/">dolor</a> </p><p>sit amet.</p>')
  var p1 = doc.find("p:first")[0]
  var p2 = doc.find("p:last")[0]

  var spans = Wapper.wrap({
    commonAncestorContainer: doc[0],
    startContainer: p1.firstChild,
    startOffset: 6,
    endContainer: p2.firstChild,
    endOffset: 3
  })

  equals(doc.html(), '<p>lorem <span>ipsum <a href="/">dolor</a> </span></p><p><span>sit</span> amet.</p>')
  assertSameNodes(spans, doc.find("span").get())
})

test("spanning more nodes", function() {
  var doc = $("<div>")
    .html('<p>lorem ip <strong>sum</strong> </p><p><a href="/">dolor</a> </p><p>blah <em>sit</em> amet.</p>')
    .appendTo("body")
  var p = doc.find("p")
  var p1 = p[0]
  var p2 = p[1]
  var p3 = p[2]

  var spans = Wapper.wrap({
    commonAncestorContainer: doc[0],
    startContainer: p1.childNodes[1].firstChild,
    startOffset: 1,
    endContainer: p3.childNodes[1].firstChild,
    endOffset: 2
  })

  equals(doc.html(), '<p>lorem ip <strong>s<span>um</span></strong><span> </span></p><p><span><a href="/">dolor</a> </span></p><p><span>blah </span><em><span>si</span>t</em> amet.</p>')
  assertSameNodes(spans, doc.find("span").get())

  doc.detach()
})
