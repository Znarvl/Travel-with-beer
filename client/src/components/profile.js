import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Card } from "react-bootstrap";


 
import "bootstrap/dist/css/bootstrap.css";

const Profile = (props) => (
  <div class="row justify-content-center align-items-center">
  <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>User Profile</Card.Title>
        Nickname: {props.nickname}
      <br/>Email: {props.email}
      <br/>Cans: {props.cans}
      <br/>Bottles: {props.bottles}
      <br/>Meters: {props.meters}
  </Card.Body>
</Card>
</div>
   );

 
export default function Profiles() {
  const [profiles, setProfile] = useState([]);

  const { user } = useAuth0();
  let email = user

  useEffect(() => {
      async function getProfiles() {
        const response = await fetch(`http://localhost:5000/profile/${email.name}`);
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
        console.log(response)
        const profiles = await response.json();
        setProfile(profiles);
      }
      getProfiles();
      return;
  }, [profiles.length]);

  function profileList() {
      return profiles.map((profile) => {
        return (
          <Profile 
          email={profile.email}
          nickname = {profile.nickname}
          cans = {profile.cans}
          bottles = {profile.bottles}
          meters = {profile.meters}
          key={profile._id}
          />
        );
      });
    }

  return (
    <div>
      <h1>Welcome</h1>
    {profileList()}
    </div>
  );
}