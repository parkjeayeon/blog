import {pathToRoot} from "../util/path"
import {QuartzComponent, QuartzComponentConstructor, QuartzComponentProps} from "./types"

const ProfileImage: QuartzComponent = ({fileData}: QuartzComponentProps) => {
    const baseDir = pathToRoot(fileData.slug!)
    return (
        <div class="profile">
            <img src={`${baseDir}/static/profile.webp`} alt="Profile"/>
        </div>
    )
}

ProfileImage.css = `
.profile {
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    display: flex;
    transform: translate(-15px);
}

.profile img {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  box-shadow: 0 4px 8px #0000001a;
}
`

export default (() => ProfileImage) satisfies QuartzComponentConstructor
