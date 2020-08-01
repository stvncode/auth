import * as React from 'react'

interface Props {
  /** If not provided, preventDefault() will be called on click event. */
  href?: string
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  className?: string
}

const onClickLink = (
  href: string | undefined,
  onClick: ((e: React.MouseEvent<HTMLAnchorElement>) => void) | undefined
) => (e: React.MouseEvent<HTMLAnchorElement>): void => {
  if (href === undefined) {
    e.preventDefault()
  }
  if (onClick !== undefined) {
    onClick(e)
  }
}

export const Link: React.FC<Props> = ({ href, children, onClick, className }) => (
  <a children={children} className={className} href={href} onClick={onClickLink(href, onClick)} />
)
