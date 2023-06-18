import { GoogleLogin } from "@react-oauth/google";

export function UserProfile() {
  return (
    <>
      <GoogleLogin onSuccess={console.log} onError={console.error} />
    </>
  );
}
