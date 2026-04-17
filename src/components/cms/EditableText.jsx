import { useContent } from '../../contexts/ContentContext'

export default function EditableText({ field, tag: Tag = 'span', children, style, className, onClick: externalClick, ...rest }) {
  const { content, isEditing, updateContent } = useContent()

  const value = content[field] ?? children

  function handleClick(e) {
    if (isEditing) {
      e.stopPropagation()
      window.__cmsOpenModal?.(field, value, updateContent)
    } else {
      externalClick?.(e)
    }
  }

  return (
    <Tag
      style={{
        ...style,
        ...(isEditing ? {
          outline: '1.5px dashed rgba(196,112,78,0.6)',
          outlineOffset: 3,
          cursor: 'text',
          borderRadius: 2,
        } : {}),
      }}
      className={className}
      onClick={handleClick}
      title={isEditing ? `Edit: ${field}` : undefined}
      {...rest}
    >
      {value}
    </Tag>
  )
}
