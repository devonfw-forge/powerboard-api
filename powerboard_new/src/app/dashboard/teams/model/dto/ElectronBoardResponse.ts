import { DailyMeetingResponse } from '../../../../daily-links/model/dto/DailyMeetingResponse';
import { ImageResponse } from '../../../../multimedia/images/model/dto/ImageResponse';
import { VideoResponse } from '../../../../multimedia/videos/model/dto/VideoResponse';
import { TeamLinkResponse } from '../../../../team-links/model/dto/TeamLinkResponse';
import { VisibilityResponse } from '../../../../visibility/model/dto/VisibilityResponse';

export interface ElectronBoardResponse {
  dailyMeetingResponse: DailyMeetingResponse[];
  teamLinkResponse: TeamLinkResponse[];
  imageResponse: ImageResponse[];
  videoResponse: VideoResponse[];
  visibleResponse: VisibilityResponse;
}
