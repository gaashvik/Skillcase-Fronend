import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Chip, Grid, Divider, Box } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import api from "../api/axios";

const API_URL = "YOUR_API_ENDPOINT"; // Replace with your actual endpoint

function UserAnalyticsDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch(API_URL)
    //   .then((res) => {
    //     if (!res.ok) throw new Error("Network error");
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setUsers(data);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     setError(err.message);
    //     setLoading(false);
    //   });
      const fetchAnalytics = async ()=>{
      try{
      const res = await api.get(`/admin/analytics `);
        const data = res.data 
      
            if (data && data.length > 0) {
              setUsers(data);
              setLoading(false);
            }
        }
         catch (err) {
            console.error(err);
            setLoading(false);
            setError(err.message);
          }
  }
  fetchAnalytics();
}, []);

  if (loading) return <Typography align="center">Loading…</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box maxWidth={700} mx="auto" my={4}>
      <Typography variant="h4" align="center" mb={3} fontWeight="bold">
        All Users Analytics
      </Typography>
      <Grid container direction="column" gap={4}>
        {users.map((user) => (
          <Card elevation={2} sx={{ borderRadius: 3 }} key={user.user_id}>
            <CardContent>
              <Typography variant="h6">{user.username}</Typography>
              <Typography variant="body2" color="text.secondary">
                Phone: {user["Phone Number"]}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Proficiency: <Chip label={user.current_profeciency_level} color="primary" />
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2">Progress</Typography>
              <Grid container gap={2}>
                {user.jsonb_agg.map((ch) => (
                  <Card variant="outlined" sx={{ borderRadius: 2, mt: 1 }} key={ch.set_id}>
                    <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 1 }}>
                      <span>
                        <strong>{ch.set_name}</strong> (Level: {ch.proficiency_level})
                      </span>
                      {ch.test_status ? (
                        <CheckCircleOutlinedIcon color="success" />
                      ) : (
                        <CancelOutlinedIcon color="error" />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Box>
  );
}

export default UserAnalyticsDashboard;
