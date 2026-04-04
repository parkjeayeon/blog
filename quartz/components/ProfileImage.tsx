import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ProfileImage: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <div class="profile-image-container">
      <img src={`${baseDir}/static/profile.webp`} alt="Profile" class="profile-image" />
    </div>
  )
}

ProfileImage.css = `
.profile-image-container {
  display: flex;
  justify-content: center;
}

.profile-image {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  object-position: top center;
  border: 2px solid var(--lightgray);
}
`

export default (() => ProfileImage) satisfies QuartzComponentConstructor
