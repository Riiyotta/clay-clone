import { Link as RRLink } from 'react-router-dom'
import { isExternal } from '../lib'

/** Router link that falls through to a plain <a> for external / mailto hrefs. */
export default function A({ href = '/', children, ...rest }) {
  if (isExternal(href) || href.startsWith('mailto:')) {
    return <a href={href} target="_blank" rel="noreferrer" {...rest}>{children}</a>
  }
  return <RRLink to={href} {...rest}>{children}</RRLink>
}
