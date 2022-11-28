import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { fetchFromApi } from '../utils/fetchFromApi';
import { Videos } from '../components';

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    setVideos([]);

    const fetchEndpoint = 'search';
    const fetchOptions = { params: { part: 'snippet', q: searchTerm } };

    fetchFromApi(fetchEndpoint, fetchOptions).then((data) => setVideos(data.items));
  }, [searchTerm]);

  return (
    <Box padding={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
      <Typography variant='h4' fontWeight='bold' mb={2} sx={{ color: 'white' }}>
        Search results for <span style={{ color: '#f31503' }}>{searchTerm}</span>
      </Typography>

      <Videos videos={videos} />
    </Box>
  );
};

export default SearchFeed;
