import { Link } from 'react-router-dom'
import { announcement } from '../../data/site'

export default function AnnouncementBar() {
  return (
    <div className="announcement">
      <Link to={announcement.link}>{announcement.text}</Link>
    </div>
  )
}