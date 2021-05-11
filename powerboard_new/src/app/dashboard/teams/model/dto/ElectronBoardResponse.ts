import { DailyMeetingResponse } from '../../../../daily-links/model/dto/DailyMeetingResponse';
import { ImageResponse } from '../../../../multimedia/images/model/dto/ImageResponse';
import { VideoResponse } from '../../../../multimedia/videos/model/dto/VideoResponse';
import { TeamLinkResponse } from '../../../../team-links/model/dto/TeamLinkResponse';
import { VisibilityResponse } from '../../../../visibility/model/dto/VisibilityResponse';

export interface ElectronBoardResponse {
  // teamId: string;
  // center: string;
  // teamLogo: string;
  dailyMeetingResponse: DailyMeetingResponse[] | undefined;
  teamLinkResponse: TeamLinkResponse[] | undefined;
  imageResponse: ImageResponse[] | undefined;
  videoResponse: VideoResponse[] | undefined;
  visibleResponse: VisibilityResponse | undefined;
}
