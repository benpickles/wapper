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
      } else {
        // More complex scenario where the selection spans multiple elements.

        endParent.splitText(range.endOffset)
        var start = startParent.splitText(range.startOffset)
        var end = endParent

        // Ascend DOM until parent is a child of the common ancestor.
        function rootNode(node) {
          while (node.parentNode.parentNode != commonAncestor) {
            node = node.parentNode
          }
          return node
        }

        var startRoot = rootNode(start)
        var endRoot = rootNode(end)
        var current

        current = startRoot

        for (current; current; current = current.nextSibling) {
          between.push(current)
        }

        var tail = []
        current = endRoot

        for (current; current; current = current.previousSibling) {
          tail.unshift(current)
        }

        current = startRoot.parentNode

        while(current.nextSibling != endRoot.parentNode) {
          between.push(current = current.nextSibling)
        }

        between = between.concat(tail)
      }

      return between
    }
  }
}
