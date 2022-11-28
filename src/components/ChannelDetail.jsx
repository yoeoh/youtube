import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Videos, ChannelCard } from '../components';
import { fetchFromApi } from '../utils/fetchFromApi';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { channelId } = useParams();

  useEffect(() => {
    const fetchChannelEndpoint = 'channels';
    const fetchChannelOptions = { params: { part: 'snippet', id: channelId } };
    fetchFromApi(fetchChannelEndpoint, fetchChannelOptions).then((data) =>
      setChannelDetail(data?.items[0]),
    );

    const fetchVideosEndpoint = 'search';
    const fetchVideosOptions = { params: { channelId: channelId, part: 'snippet', order: 'date' } };
    fetchFromApi(fetchVideosEndpoint, fetchVideosOptions).then((data) => setVideos(data?.items));
  }, [channelId]);

  console.log(channelDetail);

  return (
    <Box minHeight='95vh'>
      <Box>
        <div
          style={{
            background: 'linear-gradient(343deg, rgba(158,0,139,1) 0%, rgba(68,0,128,1) 100%)',
            zIndex: 10,
            height: '200px',
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop='-93px' />
      </Box>
      <Box sx={{ margin: '0 auto', width: '90vw' }}>
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
