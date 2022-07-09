import './index.css';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React from 'react';

import MediaCard from '../../components/MediaCard/index';
import comicImage from './images/comic.png';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const workList = [
  {
    link: '/comic',
    title: '3D漫画',
    description: '🕷 spider man',
    image: comicImage,
    three: true,
  },
];

const Home = () => {
  return (
    <div className="home" style={{ padding: '24px' }}>
      <Box component="div">
        <h1 className="page_title">3D Example List</h1>
      </Box>
      <Box
        component="div"
        sx={{ width: '100%' }}
        style={{ maxWidth: '1200px', margin: 'auto' }}
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {workList.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Item elevation={0} className="grid_item">
                {item.three ? <i className="three_logo"></i> : ''}
                <MediaCard
                  link={item.link}
                  title={item.title}
                  image={item.image}
                  description={item.description}
                />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
