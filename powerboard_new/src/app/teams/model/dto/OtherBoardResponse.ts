import { ImageResponse } from '../../../multimedia/images/model/dto/ImageResponse';
import { VideoResponse } from '../../../multimedia/videos/model/dto/VideoResponse';
import { VisibilityResponse } from '../../../visibility/model/dto/VisibilityResponse';

export interface OtherBoardResponse {
  imageResponse: ImageResponse[] | undefined;
  videoResponse: VideoResponse[] | undefined;
  visibleResponse: VisibilityResponse | undefined;
}
