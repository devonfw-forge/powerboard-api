
import { DailyMeetingResponse } from 'src/app/daily-links/model/dto/DailyMeetingResponse';
import { ImageResponse } from 'src/app/multimedia/images/model/dto/ImageResponse';
import { VideoResponse } from 'src/app/multimedia/videos/model/dto/VideoResponse';
import { TeamLinkResponse } from 'src/app/team-links/model/dto/TeamLinkResponse';
import { DashBoardResponse } from './DashBoardResponse';

export interface PowerboardResponse {
  team_id: string;
  team_name: string;
  center: string;
  logo: string;
  team_code: string;
  privileges:string[];
  dashboard: DashBoardResponse;
  meetingLinks: DailyMeetingResponse[] | undefined;
  teamLinks: TeamLinkResponse[] | undefined;
  images: ImageResponse[] | undefined;
  videos: VideoResponse[] | undefined;
}
