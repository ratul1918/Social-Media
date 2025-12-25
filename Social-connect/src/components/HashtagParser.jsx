import { useMemo } from "react"

export default function HashtagParser({ text }) {
  const parsedText = useMemo(() => {
    if (!text) return null

    const parts = []
    const hashtagRegex = /#(\w+)/g
    const mentionRegex = /@(\w+)/g
    let lastIndex = 0
    let match

    // Find all hashtags and mentions
    const matches = []
    while ((match = hashtagRegex.exec(text)) !== null) {
      matches.push({ type: "hashtag", start: match.index, end: match.index + match[0].length, content: match[1] })
    }
    while ((match = mentionRegex.exec(text)) !== null) {
      matches.push({ type: "mention", start: match.index, end: match.index + match[0].length, content: match[1] })
    }

    // Sort matches by position
    matches.sort((a, b) => a.start - b.start)

    // Build parts array
    matches.forEach((match) => {
      // Add text before match
      if (match.start > lastIndex) {
        parts.push({ type: "text", content: text.substring(lastIndex, match.start) })
      }
      // Add match
      parts.push(match)
      lastIndex = match.end
    })

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({ type: "text", content: text.substring(lastIndex) })
    }

    return parts.length > 0 ? parts : [{ type: "text", content: text }]
  }, [text])

  if (!parsedText) return null

  return (
    <span>
      {parsedText.map((part, idx) => {
        if (part.type === "hashtag") {
          return (
            <span
              key={idx}
              className="text-uiu-blue hover:underline cursor-pointer font-medium"
              onClick={(e) => {
                e.stopPropagation()
                // Navigate to hashtag page or filter
                console.log("Hashtag clicked:", part.content)
              }}
            >
              #{part.content}
            </span>
          )
        } else if (part.type === "mention") {
          return (
            <span
              key={idx}
              className="text-uiu-crimson hover:underline cursor-pointer font-medium"
              onClick={(e) => {
                e.stopPropagation()
                // Navigate to user profile
                console.log("Mention clicked:", part.content)
              }}
            >
              @{part.content}
            </span>
          )
        } else {
          return <span key={idx}>{part.content}</span>
        }
      })}
    </span>
  )
}

