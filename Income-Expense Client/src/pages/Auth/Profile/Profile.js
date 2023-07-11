import { useAuth } from "../../../context/AuthContext";
import { Text, Button } from "@chakra-ui/react";


function Profile({history}) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    logout();
  }
  
  return (
    <div>
      <Text as="h2">Profile</Text>
      <code>{JSON.stringify(user)}</code>

      <br></br>
      <br></br>
      <Button colorScheme="yellow" variant="solid" onClick={(handleLogout)}>Logout</Button>
    </div>
  );
}

export default Profile;
