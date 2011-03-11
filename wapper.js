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

        function nextViaParent(node) {
          if (node.nextSibling) {
            return node.nextSibling
          } else {
            return nextViaParent(node.parentNode)
          }
        }

        function previousViaParent(node) {
          if (node.previousSibling) {
            return node.previousSibling
          } else {
            return previousViaParent(node.parentNode)
          }
        }

        // Ascend DOM until parent is a child of the common ancestor.
        function rootNode(node) {
          while (node.parentNode.parentNode != commonAncestor) {
            node = node.parentNode
          }
          return node
        }

        var startRoot = rootNode(start)
        var endRoot = rootNode(end)
        var current = start

        while (current.parentNode != commonAncestor) {
          between.push(current)
          current = nextViaParent(current)
        }

        var tail = []
        current = endParent

        while (current.parentNode != commonAncestor) {
          tail.unshift(current)
          current = previousViaParent(current)
        }

        current = startRoot.parentNode

        while (current.nextSibling != endRoot.parentNode) {
          between.push(current = current.nextSibling)
        }

        between = between.concat(tail)
      }

      return between
    }
  },

  wrap: function(range) {
    var elems = this.split(range)
    var currentParent
    var groups = []

    function createWrapper() {
      return document.createElement("span")
    }

    function display(elem) {
      if (elem.nodeType != 1) return
      var style = window.getComputedStyle(elem, null)
      return style && style.getPropertyValue("display")
    }

    // Group nodes by shared parent.
    for (var i = 0; i < elems.length; i++) {
      var elem = elems[i]

      if (elem.parentNode == currentParent) {
        groups[groups.length - 1].push(elem)
      } else {
        groups.push([elem])
      }

      currentParent = elem.parentNode
    }

    for (var g = 0; g < groups.length; g++) {
      var children = groups[g]

      if (display(children[0]) == "block") {
        // Wrap a block-element's children not the block element itself.
        for (var c = 0; c < children.length; c++) {
          var wrapper = createWrapper()

          while (children[0].childNodes.length) {
            wrapper.appendChild(children[0].firstChild)
          }

          children[0].appendChild(wrapper)
        }
      } else {
        var wrapper = createWrapper()

        // Insert the wrapper before the first element.
        children[0].parentNode.insertBefore(wrapper, children[0])

        // Move the contained elements into the wrapper.
        for (var c = 0; c < children.length; c++) {
          wrapper.appendChild(children[c])
        }
      }
    }
  }
}
