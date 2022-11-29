import { CheckCircle } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';

import { Videos } from '../components';
import { fetchFromApi } from '../utils/fetchFromApi';

const youtubeVideoUrlBase = 'https://www.youtube.com/watch?v=';

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState(null);
  const { videoId } = useParams();

  useEffect(() => {
    const fetchVideoEndpoint = 'videos';
    const fetchVideoParams = { params: { part: 'snippet, statistics', id: videoId } };
    fetchFromApi(fetchVideoEndpoint, fetchVideoParams).then((data) =>
      setVideoDetail(data?.items[0]),
    );

    const fetchRelatedVideosEndpoint = 'search';
    const fetchRelatedVideosParams = {
      params: { part: 'snippet', relatedToVideoId: videoId, type: 'video' },
    };
    fetchFromApi(fetchRelatedVideosEndpoint, fetchRelatedVideosParams).then((data) =>
      setRelatedVideos(data?.items),
    );
  });

  if (!videoDetail?.snippet) return 'Loading...';

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight='95vh'>
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
            <ReactPlayer
              url={`${youtubeVideoUrlBase}${videoId}`}
              className='react-player'
              controls
            />
            <Typography color='#fff' variant='h5' fontWeight='bold' p={2}>
              {title}
            </Typography>
            <Stack
              direction='row'
              justifyContent='space-between'
              sx={{ color: '#fff' }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: 'subtitle1', md: 'h6' }} color='#fff'>
                  {channelTitle} <CheckCircle sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
                </Typography>
              </Link>
              <Stack direction='row' gap='20px' alignItems='center'>
                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent='center' alignItems='center'>
          <Videos videos={relatedVideos} direction='column' />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
