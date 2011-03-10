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
      var commonAncestor = range.commonAncestorContainer
      var between = []

      if (commonAncestor == startParent.parentNode) {
        // Common scenario where selection contains a few text and element
        // nodes within a block-level element - a <p> for instance.

        var current = startParent.splitText(range.startOffset)
        var after = endParent.splitText(range.endOffset)

        for (current; current != after; current = current.nextSibling) {
          between.push(current)
        }
      }

      return between
    }
  }
}
