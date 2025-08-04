import { AvatarContainer } from "./avatar-container";
import { AvatarContent } from "./avatar-content";
import { AvatarDescription } from "./avatar-description";
import { AvatarImage } from "./avatar-image";
import { AvatarTitle } from "./avatar-title";

export {
  AvatarContainer,
  AvatarContent,
  AvatarDescription,
  AvatarImage,
  AvatarTitle,
};

export const Avatar = {
  Container: AvatarContainer,
  Content: AvatarContent,
  Image: AvatarImage,
  Description: AvatarDescription,
  Title: AvatarTitle,
} as const;

export default Avatar;
