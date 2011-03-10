module("wrap")

test("with same parent", function() {
  var doc = $("<div>").html("<p>lorem ipsum dolor sit amet.</p>")
  var p = doc.find("p")[0]

  Wapper.wrap({
    startContainer: p.firstChild,
    startOffset: 6,
    endContainer: p.firstChild,
    endOffset: 11
  })

  equals(doc.html(), "<p>lorem <span>ipsum</span> dolor sit amet.</p>")
})

test("with containing node", function() {
  var doc = $("<div>").html('<p>lorem ipsum <a href="/">dolor</a> sit amet.</p>')
  var p = doc.find("p")[0]

  Wapper.wrap({
    commonAncestorContainer: p,
    startContainer: p.firstChild,
    startOffset: 6,
    endContainer: p.lastChild,
    endOffset: 4
  })

  equals(doc.html(), '<p>lorem <span>ipsum <a href="/">dolor</a> sit</span> amet.</p>')
})

test("spanning nodes", function() {
  var doc = $("<div>").html('<p>lorem ipsum <a href="/">dolor</a> </p><p>sit amet.</p>')
  var p1 = doc.find("p:first")[0]
  var p2 = doc.find("p:last")[0]

  Wapper.wrap({
    commonAncestorContainer: doc[0],
    startContainer: p1.firstChild,
    startOffset: 6,
    endContainer: p2.firstChild,
    endOffset: 3
  })

  equals(doc.html(), '<p>lorem <span>ipsum <a href="/">dolor</a> </span></p><p><span>sit</span> amet.</p>')
})

test("spanning more nodes", function() {
  var doc = $("<div>").html('<p>lorem ip <strong>sum</strong> </p><p><a href="/">dolor</a> </p><p>blah <em>sit</em> amet.</p>')
  var p = doc.find("p")
  var p1 = p[0]
  var p2 = p[1]
  var p3 = p[2]

  Wapper.wrap({
    commonAncestorContainer: doc[0],
    startContainer: p1.firstChild,
    startOffset: 6,
    endContainer: p3.childNodes[1].firstChild,
    endOffset: 2
  })

  equals(doc.html(), '<p>lorem <span>ip <strong>sum</strong> </span></p><p><span><a href="/">dolor</a> </span></p><p><span>blah </span><em><span>si</span>t</em> amet.</p>')
})
