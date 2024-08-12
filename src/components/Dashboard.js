// src/components/Dashboard.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';
const stages = ["Backlog", "To Do", "Ongoing", "Done"];

const Dashboard = () => {
  const tasks = useSelector(state => state.tasks.tasks || []);
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(task => task.stage !== stages.length - 1).length;
  const completedTasks = tasks.filter(task => task.stage === stages.length - 1).length;

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
        }}
      >
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '250px', backgroundColor: '#F9F9F9', boxShadow: 3, position: 'relative' }}>
            <CardContent>
              <Typography variant="h6" component="div" sx={{ position: 'relative', display: 'inline-block', mb: 1 }}>
                Total Tasks
                <span
                  style={{
                    display: 'block',
                    height: '4px',
                    backgroundColor: '#3f51b5', // Blue color for underline
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                  }}
                />
              </Typography>
              <Typography variant="h4" component="div" sx={{justifyContent:"center", alignItems:"center"}}>
                {totalTasks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '250px', backgroundColor: '#F9F9F9', boxShadow: 3, position: 'relative' }}>
            <CardContent>
              <Typography variant="h6" component="div" sx={{ position: 'relative', display: 'inline-block', mb: 1 }}>
                Pending Tasks
                <span
                  style={{
                    display: 'block',
                    height: '4px',
                    backgroundColor: '#ff9800', // Orange color for underline
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                  }}
                />
              </Typography>
              <Typography variant="h4" component="div">
                {pendingTasks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '250px', backgroundColor: '#F9F9F9', boxShadow: 3, position: 'relative' }}>
            <CardContent>
              <Typography variant="h6" component="div" sx={{ position: 'relative', display: 'inline-block', mb: 1 }}>
                Completed Tasks
                <span
                  style={{
                    display: 'block',
                    height: '4px',
                    backgroundColor: '#4caf50', // Green color for underline
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                  }}
                />
              </Typography>
              <Typography variant="h4" component="div">
                {completedTasks}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
