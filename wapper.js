var Wapper = {
  split: function(range) {
    var startParent = range.startContainer
    var endParent = range.endContainer

    if (startParent == endParent) {
      // Achtung! Zero-length selection.
      if (range.startOffset == range.endOffset) return

      endParent.splitText(range.endOffset)
      var middle = startParent.splitText(range.startOffset)
      return [middle]
    } else {
      startParent.splitText(range.startOffset)
      endParent.splitText(range.endOffset)
    }
  }
}
