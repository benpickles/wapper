var Wapper = {
  split: function(range) {
    var startParent = range.startContainer
    var endParent = range.endContainer

    if (startParent == endParent) {
      // Achtung! Zero-length selection.
      if (range.startOffset == range.endOffset) return

      endParent.splitText(range.endOffset)
      startParent.splitText(range.startOffset)
    } else {
      startParent.splitText(range.startOffset)
      endParent.splitText(range.endOffset)
    }
  }
}
